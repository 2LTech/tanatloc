'use client'

import Link from 'next/link'
import {
  Avatar,
  Button,
  Checkbox,
  Layout,
  Space,
  Steps,
  Typography
} from 'antd'
import { SettingOutlined } from '@ant-design/icons'

import Header from '@/components/assets/header'
import Footer from '@/components/assets/footer'
import Side from '@/components/assets/side'
import Image from '@/components/assets/image'
import Releases from '@/components/assets/releases'

import './index.css'

// Local interfaces
export interface IPluginDisplayBase {
  key: string
  title: string
  subTitle: string
}

export interface IPluginDisplayImg extends IPluginDisplayBase {
  img: string
}

export interface IPluginDisplayIcon extends IPluginDisplayBase {
  icon: React.ReactElement
}

export type IPluginDisplay = IPluginDisplayImg | IPluginDisplayIcon

const pluginsDisplay: IPluginDisplay[] = [
  {
    key: 'rescale',
    img: '/img/home/logo-rescale.svg',
    title: 'Rescale',
    subTitle: 'Paid feature'
  },
  {
    key: 'ancl',
    img: '/img/home/logo-ancl.jpg',
    title: 'ANCL Sharetask',
    subTitle: 'Paid feature'
  },
  {
    key: 'slurm',
    img: '/img/home/logo-slurm.svg',
    title: 'Slurm',
    subTitle: 'On request'
  },
  {
    key: 'qarnot',
    img: '/img/home/logo-qarnot.svg',
    title: 'Qarnot HPC',
    subTitle: 'On request'
  },
  {
    key: 'own',
    title: 'Your own plugin',
    subTitle: 'Paid feature',
    icon: <SettingOutlined />
  }
]

/**
 * Index
 * @returns Index
 */
const Index: React.FunctionComponent = () => {
  /**
   * Render
   */
  return (
    <Layout id="index" className="layout">
      <Header type="home" />

      <Layout.Content className="homeContent">
        <Space
          orientation="vertical"
          size={90}
          className="homeFirstSection fullWidth padding50"
        >
          <Side
            left={
              <Space orientation="vertical" size={20}>
                <Typography.Title style={{ marginBottom: 0 }}>
                  Solve your toughest numerical simulation problems
                </Typography.Title>
                <Typography.Text>
                  Tanatloc is a multi-physics FEA software for engineers and
                  researchers.
                </Typography.Text>

                <Typography.Text>
                  Use the provided models for the most common problems, make
                  your own, or partner with our experts to build one tailored to
                  your needs.
                </Typography.Text>
              </Space>
            }
            right={
              <Image
                src="/img/home/capture1.png"
                alt="Tanatloc Boundary Conditions Selector"
                className="imageShadow"
                width={1920}
                height={1080}
              />
            }
            leftClassName="padding50TB"
          />

          <Side
            id="features"
            left={
              <Typography.Title level={2}>
                The most common multi-physics models at your fingertips
              </Typography.Title>
            }
            right={
              <>
                <div>
                  <Checkbox checked />
                  Linear elasticity
                </div>
                <div>
                  <Checkbox checked />
                  Linear elasticity over time
                </div>
                <div>
                  <Checkbox checked />
                  Poisson
                </div>
                <div>
                  <Checkbox checked />
                  Stokes
                </div>
                <div>
                  <Checkbox checked />
                  Navier-Stokes over time
                </div>
                <div>
                  <Checkbox checked />
                  Thermal diffusion
                </div>
                <div>
                  <Checkbox checked />
                  Modal analysis
                </div>
                <div>
                  <Checkbox checked />
                  ...
                </div>
              </>
            }
            sideClassName="backgroundPrimary"
            rightClassName="homeModels padding50"
            leftClassName="padding50"
          />

          <div>
            <Typography.Title level={2}>
              Solve your numerical problems locally or in the cloud, using
              dedicated plugins
            </Typography.Title>
            <div className="homePlugins">
              {pluginsDisplay.map((plugin) => (
                <div key={plugin.key}>
                  <Avatar
                    size={64}
                    shape="square"
                    src={(plugin as IPluginDisplayImg).img}
                    icon={(plugin as IPluginDisplayIcon).icon}
                  />
                  <Typography.Title level={4}>{plugin.title}</Typography.Title>
                  <Typography.Text className="textLight">
                    {plugin.subTitle}
                  </Typography.Text>
                </div>
              ))}
            </div>
          </div>

          <div className="homeElectron">
            <Typography.Title level={2}>
              Tanatloc is an FEA software based on FreeFEM, an extremely
              powerful and versatile open-source PDE solver. It runs locally
              using an electron build.
            </Typography.Title>
            <div className="padding50TB">
              <Image
                src="/img/home/capture2.png"
                alt="tanatloc"
                className="imageShadow textAlignCenter"
                width={1920}
                height={1080}
                style={{ marginTop: '40px' }}
              />
            </div>
          </div>

          <Side
            id="caseStudy"
            left={
              <Space orientation="vertical" size={20}>
                <div>
                  <Typography.Title level={2}>Case Study</Typography.Title>
                  <Typography.Title
                    level={3}
                    className={'textLight'}
                    style={{ marginBottom: 0 }}
                  >
                    DENSO
                  </Typography.Title>
                </div>

                <Typography.Text>
                  DENSO is a leading Japanese automotive and Fortune 500
                  company.
                </Typography.Text>

                <Typography.Text>
                  Hiroshi Ogawa, at DENSO’s Heat Exchanger R&D Division,
                  implemented a custom FreeFEM model on TANATLOC with the help
                  of Professor Atsushi Suzuki from Osaka University.
                </Typography.Text>

                <Typography.Text>
                  DENSO’s Solder Filling model was added to TANATLOC, and the
                  calculations are deployed seamlessly on the cloud or on
                  on-premise server via the ANCL Sharetask plug-in.
                </Typography.Text>
              </Space>
            }
            right={
              <Image
                src="/img/home/denso.jpg"
                alt="tanatloc"
                width={1275}
                height={1644}
                className="padding50"
              />
            }
            sideClassName="homeCaseStudy"
            leftClassName="homeCaseStudyLeft fullWidth padding50"
          />

          <div>
            <Typography.Title level={2}>Get started</Typography.Title>
            <Typography.Text>
              Complete description in the{' '}
              <Link href="/doc" target="_blank">
                documentation
              </Link>
            </Typography.Text>
            <br />
            <br />
            <Steps
              current={-1}
              orientation="vertical"
              className="homeSteps"
              items={[
                {
                  title: 'Install Docker Desktop',
                  content: (
                    <>
                      <Typography>
                        Follow the Docker installation instruction at{' '}
                        <Link
                          href="https://docs.docker.com/get-docker/"
                          target="_blank"
                        >
                          docs.docker.com/get-docker
                        </Link>{' '}
                        and reboot your computer.
                      </Typography>
                      <Typography>
                        Start Docker Desktop and make sure everything is
                        working.
                      </Typography>
                    </>
                  ),
                  status: 'process'
                },
                {
                  title: 'Download the latest app',
                  content: (
                    <>
                      <Typography>
                        Download the latest app for Linux, MacOS or Windows.
                      </Typography>
                      <Releases />
                    </>
                  ),
                  status: 'process'
                }
              ]}
            />
          </div>

          <Side
            left={
              <Space orientation="vertical" size={20}>
                <Typography.Text>
                  TANATLOC is now developed and maintained by 2LTech, a France
                  based company. We will always keep it free and open for
                  everybody, and continue to provide technical support.
                </Typography.Text>

                <Link href="https://2ltech.fr/" target="_blank">
                  <Button type="primary">Discover</Button>
                </Link>
              </Space>
            }
            right={
              <Image
                src="/img/home/TanatlocBy2LTech.png"
                width={2831}
                height={700}
                alt="airthium"
              />
            }
            sideClassName="homeNewAbout"
            leftClassName="padding50"
            rightClassName="padding50"
            id="aboutUs"
          />
          <Side
            left={
              <Image
                src="/img/home/TanatlocByAirthium.png"
                width={422}
                height={157}
                alt="airthium"
              />
            }
            right={
              <Space orientation="vertical" size={20}>
                <Typography.Text>
                  TANATLOC was previously maintained by Airthium, a US/France
                  based deeptech startup. We build a very robust and highly
                  efficient electric heat engine to decarbonise the planet.
                </Typography.Text>

                <Link href="https://airthium.com/" target="_blank">
                  <Button type="primary">Discover the project</Button>
                </Link>
              </Space>
            }
            sideClassName="homeAbout"
            leftClassName="padding50"
            rightClassName="padding50"
            id="aboutUs"
          />
        </Space>
      </Layout.Content>
      <Footer type="home" />
    </Layout>
  )
}

export default Index
