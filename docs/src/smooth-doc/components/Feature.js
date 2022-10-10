/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import styled, { th, x } from '@xstyled/styled-components'
import { IconContext } from 'react-icons'
import { ScreenContainer } from './ScreenContainer'

const InnerFeature = styled.box`
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #EAECF0;
  box-shadow: 0px 1px 3px rgb(16 24 40 / 10%), 0px 1px 2px rgb(16 24 40 / 6%);
  padding: 1.6rem;
  text-align: center;
`

export const Feature = React.forwardRef((props, ref) => (
  <InnerFeature
    ref={ref}
    {...props}
  />
))

export const FeatureTitle = styled.h2`
  margin: 3 0;
  font-size: 18;
  font-weight: bold;
  text-align: center;
`

export const FeatureText = styled.p`
  color: on-background-light;
  font-size: 18;
  text-align: center;
  margin: 4 0;
`

const InnerFeatureImage = styled.img`
  margin-top: 3;
`

export const FeatureImage = React.forwardRef((props, ref) => (
  <InnerFeatureImage ref={ref} width={48} height={48} {...props} />
))

export const FeatureList = React.forwardRef((props, ref) => (
  <IconContext.Provider value={{ className: "feature-image", size: "3em" }}>
    <ScreenContainer ref={ref} row my={-4} px={3} display="grid" gridTemplateColumns={{ xs: 1, md: 4 }} gap={5} {...props} />
  </IconContext.Provider>
))

export const FeatureSection = React.forwardRef((props, ref) => (
  <x.section
    ref={ref}
    py={4}
    borderColor="layout-border"
    {...props}
  />
))
