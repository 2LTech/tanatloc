/** @module Components.Assets.Mathjax */
'use client'

import React, { ReactNode, useEffect, useMemo, useRef } from 'react'
import parse from 'html-react-parser'

import { mathjaxRefresh } from '@/lib/mathjax'

// Mathjax tags
const mathjaxBegin = String.raw`\(`
const mathjaxEnd = String.raw`\)`

// Interfaces
export interface IPropsInline {
  text?: string
}

export interface IPropsFormula {
  text?: string
}

export interface IPropsHtml {
  html?: string
}

/**
 * Back Inline
 * @param props Props
 * @returns Inline
 */
const BackInline: React.FunctionComponent<IPropsInline> = ({ text }) => {
  // Content
  let content = text ?? ''
  if (text && !text.includes(mathjaxBegin) && !text.includes(mathjaxEnd))
    content = mathjaxBegin + text + mathjaxEnd

  /**
   * Render
   */
  return <div style={{ display: 'inline-block' }}>{content}</div>
}

/**
 * Inline
 * @param props Props
 * @returns Inline
 */
const Inline: React.FunctionComponent<IPropsInline> = ({ text }) => {
  // Ref
  const element = useRef<HTMLDivElement>(null)

  // Content
  const content = useMemo(() => {
    let mathjaxText: string
    if (!text) mathjaxText = ''
    else if (text.includes(mathjaxBegin) && text.includes(mathjaxEnd))
      mathjaxText = text
    else mathjaxText = mathjaxBegin + text + mathjaxEnd

    mathjaxRefresh()

    return mathjaxText
  }, [text])

  // Update MathJax
  useEffect(() => {
    const div = element.current
    if (!div) return

    mathjaxRefresh([div])
  }, [content])

  /**
   * Render
   */
  return (
    <div ref={element} style={{ display: 'inline-block' }}>
      {content}
    </div>
  )
}

/**
 * Back Formula
 * @param props Props
 * @returns BackFormula
 */
const BackFormula: React.FunctionComponent<IPropsFormula> = ({ text }) => {
  // Content
  let content = text ?? ''
  if (text && !text.includes('$$')) content = '$$' + text + '$$'

  /**
   * Render
   */
  return <div>{content}</div>
}

/**
 * Formula
 * @param props Props
 * @returns Formula
 */
const Formula: React.FunctionComponent<IPropsFormula> = ({ text }) => {
  // Ref
  const element = useRef<HTMLDivElement>(null)

  // Content
  const content = useMemo(() => {
    let mathjaxText: string
    if (!text) mathjaxText = ''
    else if (text.includes('$$')) mathjaxText = text
    else mathjaxText = '$$' + text + '$$'

    mathjaxRefresh()

    return mathjaxText
  }, [text])

  // Update MathJax
  useEffect(() => {
    const div = element.current
    if (!div) return

    mathjaxRefresh([div])
  }, [content])

  /**
   * Render
   */
  return <div ref={element}>{content}</div>
}

/**
 * Html
 * @param props Props
 * @returns Html
 */
const Html: React.FunctionComponent<IPropsHtml> = ({ html }) => {
  // Ref
  const element = useRef<HTMLDivElement>(null)

  // Update text
  const content = useMemo(() => {
    let mathjaxText: ReactNode

    if (html) mathjaxText = parse(html)
    else mathjaxText = ''

    mathjaxRefresh()

    return mathjaxText
  }, [html])

  // Update MathJax
  useEffect(() => {
    const div = element.current
    /* istanbul ignore next */
    if (!div) return

    mathjaxRefresh([div])
  }, [content])

  /**
   * Render
   */
  return <div ref={element}>{content}</div>
}

const MathJax = { BackInline, Inline, BackFormula, Formula, Html }
export default MathJax
