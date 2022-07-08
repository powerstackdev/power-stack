import React from 'react'
import styled, { down, css } from '@xstyled/styled-components'
import { IconContext } from "react-icons"
import { AppHeader } from './AppHeader'
import { Head } from './Head'
import { Article } from "./Article";
import { Nav, NavList, NavListItem, NavLink } from './Nav'
import { ScreenContainer } from './ScreenContainer'

const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`

const Main = styled.main`
  background-color: background;
  flex: 1;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
export const OuterFooter = styled.footer`
  background-color: white;
  border-top-style: solid;
  border-top-width: base;
  border-top-color: layout-border;
  padding: 3 0;
  height: 70;

  ${down(
  'sm',
  css`
      overflow-x: auto;
    `,
)}
`


export function PageLayout({ children, title }) {
  return (
    <>
      <Head title={title} />
      <Container>
        <StickyHeader>
          <AppHeader />
        </StickyHeader>
        <Main id="main">
          <Article>{children}</Article>
        </Main>
        <OuterFooter>
          <ScreenContainer>
            <Nav>
              <NavList>
                <NavListItem>
                  <NavLink to={'/code-of-conduct'}>
                    Code of conduct
                  </NavLink>
                </NavListItem>
              </NavList>
            </Nav>
          </ScreenContainer>
        </OuterFooter>
      </Container>
    </>
  )
}