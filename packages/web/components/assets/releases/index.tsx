import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Button, Spin, Typography } from 'antd'

import './index.css'

// Local interface
export interface IRelease {
  version: string
  appImage: string
  dmg: string
  exe: string
}

// Releases URL
const releasesURL =
  'https://api.github.com/repos/Airthium/tanatloc-electron/releases'

/**
 * Get releases
 */
const getReleases = async (): Promise<IRelease> => {
  const releaseResponse = await fetch(releasesURL)
  const releases = await releaseResponse.json()
  if (!releaseResponse.ok) throw new Error(String(releases.message))
  const latestRelease = releases.find(
    (r: { name: string[] }) =>
      !r.name.includes('-beta') && !r.name.includes('-alpha')
  )
  const assetsResponse = await fetch(latestRelease.assets_url)
  const assets = await assetsResponse.json()
  const appImage = assets.find((a: { name: string[] }) =>
    a.name.includes('.AppImage')
  )?.browser_download_url
  const dmg = assets.find((a: { name: string[] }) =>
    a.name.includes('.dmg')
  )?.browser_download_url
  const exe = assets.find((a: { name: string[] }) =>
    a.name.includes('.exe')
  )?.browser_download_url

  return {
    version: latestRelease.name,
    appImage,
    dmg,
    exe
  }
}

const Releases = () => {
  const [data, setData] = useState<IRelease>()
  const [error, setError] = useState<string>()

  // Release
  useEffect(() => {
    getReleases()
      .then((res) => setData(res))
      .catch((err) =>
        setError(err instanceof Error ? err.message : String(err))
      )
  }, [])

  /**
   * On Windows download
   */
  const onWindowsDownload = useCallback((): void => {
    window.open(data?.exe)
  }, [data])

  /**
   * On MacOS download
   */
  const onMacOSDownload = useCallback((): void => {
    window.open(data?.dmg)
  }, [data])

  /**
   * On Linux download
   */
  const onLinuxDownload = useCallback((): void => {
    window.open(data?.appImage)
  }, [data])

  // Version
  const version = useMemo(() => {
    if (!data?.version) return null
    return data.version
  }, [data])

  // Windows button
  const WindowsButton = useMemo(() => {
    if (!data?.exe) return null
    return (
      <Button type="primary" onClick={onWindowsDownload}>
        <Image src="/img/home/windows.svg" width={58} height={58} alt="" />
        Windows
      </Button>
    )
  }, [data, onWindowsDownload])

  const MacOSButton = useMemo(() => {
    if (!data?.dmg) return null
    return (
      <Button type="primary" onClick={onMacOSDownload}>
        <Image src="/img/home/MacOS.svg" width={400} height={400} alt="" />
        MacOS
      </Button>
    )
  }, [data, onMacOSDownload])

  const LinuxButton = useMemo(() => {
    if (!data?.appImage) return null
    return (
      <Button type="primary" onClick={onLinuxDownload}>
        <Image src="/img/home/Linux.svg" width={200} height={240} alt="" />
        Linux
      </Button>
    )
  }, [data, onLinuxDownload])

  /**
   * Return
   */
  if (!error && !data) return <Spin description="Loading releases..." />
  return error ? (
    <Typography.Text type="danger">
      An error occurs while fetching releases data:{' '}
      <Typography.Text code type="danger">
        {error}
      </Typography.Text>
    </Typography.Text>
  ) : (
    <div className="releases">
      <div className="releasesButtons">
        {WindowsButton}
        {MacOSButton}
        {LinuxButton}
      </div>
      <Typography.Text className="textLight">
        Version: {version}
      </Typography.Text>
    </div>
  )
}

export default Releases
