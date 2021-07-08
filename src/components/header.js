import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"
import whiteLogo from "../../content/assets/CJUR-head-text-white.png"

const Header = () => {
  const { allWpPage } = useStaticQuery(graphql`
    query HeaderQuery {
      allWpPage(
        filter: { issue: { isIssuePage: { ne: true } } }
      ) {
        nodes {
          uri
          title
        }
      }
    }
  `)

  const pages = allWpPage.nodes

  return (
    <header className="global-header">
      <Link className="header-link-home" to="/">
        <img src={whiteLogo} alt="" className="header-logo" />
      </Link>
      <div class="menu-items">
        <div className="menu-label">
          <Link to="/browse">Browse</Link>
        </div>
        {
          pages.map(page => {
            return (
              <div className="menu-label"><a href={page.uri}>{parse(page.title)}</a></div>
            )
          })}
      </div>
    </header>
  )
}

export default Header
