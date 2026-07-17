import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Tag, Typography } from 'antd'

import { stringToColor } from '@/components/tools/stringToColor'

import { GoBack } from '@/components/assets/button'

import Image from '@/components/assets/image'

import '../../index.css'

// Local interface
export interface IReference {
  code: string
  author: string
  date: string
  label: string
  journal?: string
  url?: string
}

/**
 * Props
 */
export interface IProps {
  title: string
  date: string
  image: string
  keywords: string[]
  author: {
    name: string
    url: string
  }
  version: string
  children: React.ReactElement | React.ReactElement[] | string
  references?: IReference[]
}

/**
 * Ref
 * @param props Props
 * @returns Ref
 */
export const Ref: React.FunctionComponent<{ code: string }> = ({ code }) => {
  return (
    <Link href={'#' + code}>
      <i>[{code}]</i>
    </Link>
  )
}

/**
 * PostLayout
 * @param props Props
 * @returns PostLayout
 */
const PostLayout: React.FunctionComponent<IProps> = ({
  title,
  date,
  image,
  keywords,
  author,
  version,
  children,
  references
}) => {
  // Data
  const router = useRouter()

  /**
   * On go back
   */
  const onGoBack = useCallback(() => {
    router.push('/blog')
  }, [router])

  /**
   * Render
   */
  return (
    <div className="blogPostLayout">
      <div>
        <GoBack onClick={onGoBack} />
      </div>
      <div className="blogPostTitle">
        <div>
          <Typography.Title level={2}>{title}</Typography.Title>
          <Typography.Text>
            {new Date(date).toLocaleDateString()}
          </Typography.Text>
          <br />
          <a href={author.url} target="_blank" rel="noreferrer">
            <Typography.Text>{author.name}</Typography.Text>
          </a>
          <div className="blogPostTitleTags">
            {keywords.map((keyword) => (
              <Tag color={stringToColor(keyword)} key={keyword}>
                {keyword}
              </Tag>
            ))}
          </div>
          <Typography.Text className="textLight">
            Tanatloc version {version}
          </Typography.Text>
        </div>
        <div>
          <Image src={image} width={200} height={200} alt={title} />
        </div>
      </div>

      <div className="blogPostContent">{children}</div>

      {references?.length ? (
        <section>
          <Typography.Title level={4}>References</Typography.Title>
          {references.map((reference) => (
            <div key={reference.code} id={reference.code}>
              <i>[{reference.code}]</i> - {reference.author} ({reference.date})
              - {reference.label}
              {reference.journal ? (
                <>
                  <br />
                  {reference.journal}
                </>
              ) : null}
              {reference.url ? (
                <>
                  {reference.journal ? '. ' : <br />}
                  <Link href={reference.url} target="_blank">
                    {reference.url}
                  </Link>
                </>
              ) : null}
            </div>
          ))}
        </section>
      ) : null}
    </div>
  )
}

export default PostLayout
