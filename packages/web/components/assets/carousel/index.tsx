import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Button, Carousel as AntCarousel } from 'antd'
import { CarouselRef } from 'antd/es/carousel'
import {
  LeftOutlined,
  RightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined
} from '@ant-design/icons'

import './index.css'

/**
 * Props
 */
export interface IProps {
  items: {
    key: string
    src: string
    caption?: string
    alt?: string
  }[]
}

/**
 * Carousel
 * @param props Props
 * @returns Carousel
 */
const Carousel: React.FunctionComponent<IProps> = ({ items }) => {
  // Ref
  const carouselRef = useRef<CarouselRef>(null)

  // State
  const [zoom, setZoom] = useState<boolean>()
  const [displayCount, setDisplayCount] = useState<boolean>()

  useEffect(() => {
    if (displayCount) setTimeout(() => setDisplayCount(false), 2_000)
  }, [displayCount])

  /**
   * Next
   */
  const next = useCallback(() => {
    if (!carouselRef.current) return

    carouselRef.current.next()
    setDisplayCount(true)
  }, [])

  /**
   * Previous
   */
  const previous = useCallback(() => {
    if (!carouselRef.current) return

    carouselRef.current.prev()
    setDisplayCount(true)
  }, [])

  /**
   * Zoom in
   */
  const zoomIn = useCallback(() => {
    setZoom(true)
  }, [])

  /**
   * Zoom out
   */
  const zoomOut = useCallback(() => {
    setZoom(false)
  }, [])

  /**
   * Render
   */
  return (
    <div className="carouselContainer">
      <div className={zoom ? 'fullCarousel' : 'carousel'}>
        <AntCarousel ref={carouselRef} effect="fade" dots={false}>
          {items.map((item, index) => (
            <div key={item.key} className="carouselOneImage">
              <div
                className={
                  displayCount
                    ? 'carouselDisplayCount'
                    : 'carouselNoDisplayCount'
                }
              >
                {index + 1} / {items.length}
              </div>
              <figure className="carouselFigure">
                <Image
                  src={item.src}
                  alt={item.alt ?? item.caption}
                  width={1500}
                  height={1500}
                />
                {item.caption && <figcaption>{item.caption}</figcaption>}
              </figure>
            </div>
          ))}
        </AntCarousel>
        {zoom ? (
          <Button
            className="carouselZoom"
            icon={<ZoomOutOutlined />}
            onClick={zoomOut}
            type="link"
          />
        ) : (
          <Button
            className="carouselZoom"
            icon={<ZoomInOutlined />}
            onClick={zoomIn}
            type="link"
          />
        )}
        {items.length > 1 ? (
          <>
            <Button
              className="carouselPrevious"
              icon={<LeftOutlined />}
              onClick={previous}
              type="link"
            />
            <Button
              className="carouselNext"
              icon={<RightOutlined />}
              onClick={next}
              type="link"
            />
          </>
        ) : null}
      </div>
    </div>
  )
}

export default Carousel
