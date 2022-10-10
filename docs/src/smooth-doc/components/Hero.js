import React from 'react'
import styled, { up, css, x } from '@xstyled/styled-components'
import { ScreenContainer } from './ScreenContainer'

export const HeroTitle = styled.h1Box`
  font-size: 38;
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: -1.12px;
  margin: 0 0 2;

  ${up(
    'md',
    css`
      padding-top: 4;
      font-size: 48;
    `,
  )}

  ${up(
    'xl',
    css`
      font-size: 60;
    `,
  )}
`

export const HeroTeaser = styled.pBox`
  font-size: 18;
  margin: 3 0;

  ${up(
    'md',
    css`
      font-size: 20;
    `,
  )}

  ${up(
    'xl',
    css`
      font-size: 24;
    `,
  )}
`

const InnerHero = styled(ScreenContainer)`
  background-repeat: no-repeat;
  background-position: top -5% center;
  background-size: 100% auto;
  padding-top: 65%;
  text-align: center;

  ${up(
    'md',
    css`
      padding-top: 0;
      margin-top: 5;
      background-position: center right;
      background-size: 45% auto;
      min-height: 200;
      text-align: left;
    `,
  )}

  ${up(
    'xl',
    css`
      margin-top: 6;
    `,
  )}
`

export const Hero = React.forwardRef(
  ({ backgroundImageURL, ...props }, ref) => {
    return (
      <InnerHero
        ref={ref}
        backgroundImage={`url(${backgroundImageURL})`}
        {...props}
      />
    )
  },
)

export const HeroBody = React.forwardRef((props, ref) => {
  return <x.div ref={ref} w={{ md: 0.5 }} {...props} />
})

export const HeroSection = styled.sectionBox`
  overflow: hidden;
  padding-top: 2;
  padding-bottom: 7;
  background: linear-gradient(#ffc800, #ffec00);
  clip-path: ellipse(147% 100% at 77.16% 0%);
  margin-bottom: 6;
`

export const HeroActionList = React.forwardRef((props, ref) => {
  return (
    <x.div
      ref={ref}
      row
      m={-2}
      justifyContent={{ xs: 'center', md: 'initial' }}
      {...props}
    />
  )
})

export const HeroAction = React.forwardRef((props, ref) => {
  return <x.div ref={ref} col="auto" p={2} {...props} />
})
