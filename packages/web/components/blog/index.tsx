'use client'

import { ChangeEvent, Suspense, useCallback, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Button,
  Card,
  Empty,
  Input,
  Layout,
  Select,
  Tag,
  Tooltip,
  Typography
} from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'

import type { SelectProps } from 'antd'

import { createQueryString } from '@/components/tools/createQueryString'
import { stringToColor } from '@/components/tools/stringToColor'

import Header from '@/components/assets/header'
import Footer from '@/components/assets/footer'
import Image from '@/components/assets/image'

import Posts from './posts'

import './index.css'

/**
 * Post card interface
 */
export interface IPostCardProps {
  postKey: string
  title: string
  date: string
  image: string
  description: string
  keywords: string[]
  author: { name: string; url: string }
}

type TagRender = NonNullable<SelectProps['tagRender']>

/**
 * PostCard
 * @param props Props
 * @returns PostCard
 */
const PostCard: React.FunctionComponent<IPostCardProps> = ({
  postKey,
  title,
  date,
  image,
  description,
  keywords,
  author
}) => {
  // Data
  const router = useRouter()
  const searchParams = useSearchParams()

  /**
   * On click
   */
  const onClick = useCallback((): void => {
    router.push(
      '/blog?' +
        createQueryString(searchParams, [{ name: 'post', value: postKey }])
    )
  }, [router, searchParams, postKey])

  /**
   * Renderer
   */
  return (
    <Card
      className="blogPostCard"
      classNames={{
        cover: 'blogPostCardCover',
        body: 'blogPostCardBody',
        extra: 'blogPostCardExtra'
      }}
      title={
        <Typography.Title level={5} ellipsis>
          {title}
        </Typography.Title>
      }
      hoverable
      onClick={onClick}
      cover={<Image src={image} width={300} height={300} alt={title} />}
      extra={
        <>
          <Typography.Text>{author.name}</Typography.Text>
          <br />
          <Typography.Text className="textLight">
            {new Date(date).toLocaleDateString()}
          </Typography.Text>
        </>
      }
      actions={[
        <div key="tags" className="blogPostCardTags">
          {keywords.map((keyword) => (
            <Tag color={stringToColor(keyword)} key={keyword}>
              {keyword}
            </Tag>
          ))}
        </div>
      ]}
    >
      {description}
    </Card>
  )
}

/**
 * Blog
 * @returns Blog
 */
const Blog: React.FunctionComponent = () => {
  // State
  const [sort, setSort] = useState<number>(1)
  const [tags, setTags] = useState<string[]>([])
  const [search, setSearch] = useState<string>()

  // Data
  const searchParams = useSearchParams()
  const post = searchParams.get('post')

  // Post render
  const postRender = useMemo(() => {
    if (post) {
      const Post = Posts.find((p) => p.key === post)
      if (Post) return Post.default({}) as React.ReactNode
    } else return
  }, [post])

  /**
   * On search
   * @param e Event
   */
  const onSearch = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setSearch(value)
  }, [])

  /**
   * On sort down
   */
  const onSortDown = useCallback(() => {
    setSort(1)
  }, [])

  /**
   * On sort up
   */
  const onSortUp = useCallback(() => {
    setSort(-1)
  }, [])

  /**
   * Tag render
   * @param props Props
   * @returns Render
   */
  const tagRender = useCallback<TagRender>((props) => {
    const { label, value, closable, onClose } = props
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault()
      event.stopPropagation()
    }
    return (
      <Tag
        color={stringToColor(value)}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    )
  }, [])

  /**
   * On tags change
   * @param values Values
   */
  const onTagsChange = useCallback((values: string[]): void => {
    setTags(values)
  }, [])

  // Tags
  const postsTags = useMemo(() => {
    const keywords: string[] = Posts.flatMap((Post) => Post.keywords)
    const uniqueKeywords = keywords.filter((keyword, index) => {
      return keywords.indexOf(keyword) === index
    })

    return uniqueKeywords.map((keyword) => ({
      label: keyword,
      value: keyword
    }))
  }, [])

  // Posts
  Posts.sort(
    (a, b) => sort * (new Date(a.date).getTime() - new Date(b.date).getTime())
  )
  const postsList = Posts.map((Post) => {
    if (search && !Post.title.toLowerCase().includes(search.toLowerCase()))
      return
    if (
      tags.length &&
      !Post.keywords.filter((keywords) => tags.includes(keywords)).length
    )
      return
    return (
      <PostCard
        key={Post.key}
        postKey={Post.key}
        title={Post.title}
        date={Post.date}
        image={Post.image}
        description={Post.description}
        keywords={Post.keywords}
        author={Post.author}
      />
    )
  }).filter(Boolean)

  /**
   * Render
   */
  return (
    <Layout className="layout">
      <Header type="blog" />
      {postRender ? (
        <Layout.Content className="padding50 blogContent">
          {postRender}
        </Layout.Content>
      ) : (
        <Layout.Content className="padding50 blogContent">
          <div className="blogContentTools">
            <div>
              Sort by date:
              <Tooltip title="Older to newer">
                <Button icon={<ArrowDownOutlined />} onClick={onSortUp} />
              </Tooltip>
              <Tooltip title="Newer to older">
                <Button icon={<ArrowUpOutlined />} onClick={onSortDown} />
              </Tooltip>
            </div>
            <Select
              options={postsTags}
              style={{ width: '100%' }}
              value={tags}
              tagRender={tagRender}
              mode="tags"
              placeholder="Select tags..."
              maxTagCount="responsive"
              onChange={onTagsChange}
            />
            <Input placeholder="Search" value={search} onChange={onSearch} />
          </div>
          <div className="blogPosts">
            {postsList.length ? postsList : <Empty />}
          </div>
        </Layout.Content>
      )}
      <Footer type="blog" />
    </Layout>
  )
}

const BlogWithSearchParams = () => (
  <Suspense>
    <Blog />
  </Suspense>
)

export default BlogWithSearchParams
