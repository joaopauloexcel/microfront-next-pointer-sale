'use client'

import NextLink, { LinkProps } from 'next/link'
import { forwardRef } from 'react'
import { AnchorHTMLAttributes } from 'react'

type NextLinkAdapterProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps & {
    href: string
  }

export const NextLinkAdapter = forwardRef<HTMLAnchorElement, NextLinkAdapterProps>(function NextLinkAdapter(props, ref) {
  const { href, ...rest } = props

  return <NextLink ref={ref} href={href} {...rest} />
})
