import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"
import whiteText from "../../content/assets/CJUR-head-text-white.png"
import whiteLogo from "../../content/assets/CJUR-white.png"
import greenText from "../../content/assets/CJUR-head-text-moss.png"
import greenLogo from "../../content/assets/CJUR-moss.png"
import { IoIosMenu } from "react-icons/io"
const green =  "#74846cdd"

const Header = ({ template, title }) => {
  const { allWpPage } = useStaticQuery(graphql`
    query HeaderQuery {
      allWpPage(
        filter: {
          issue: {
            isIssuePage: {
              ne: true
            }
          }
          specialIssue: {
            isSpecialIssue: {
              ne: true
            }
          }
        }
      ) {
        nodes {
          uri
          title
        }
      }
    }
  `)


  const pages = allWpPage.nodes

  const [active, setActive] = useState(false)
  const [showHamburger, setShowHamburger] = useState(false)
  return (
    <header className="global-header">
      {showHamburger ?
        <div className="hamburger-menu provisional" style={{ display: "none" }}>
          {
            title === "Home" ?
              <Link to="/">
                <div className="menu-label" style={{ backgroundColor: green}}>
                  Home
                </div>
              </Link>
              :
              <Link to="/">
                <div className="menu-label">
                  Home
                </div>
              </Link>
          }
          {
            title === "Browse" ?
              <Link to="/browse">
                <div className="menu-label" style={{ backgroundColor: green}}>
                  Browse
                </div>
              </Link>
              :
              <Link to="/browse">
                <div className="menu-label">
                  Browse
                </div>
              </Link>
          }
          {
            pages.map(page => {
              if (title === parse(page.title)) {
                return (
                  <a href={page.uri}>
                    <div className="menu-label" key={page.uri} style={{ backgroundColor: green}}>
                      {parse(page.title)}
                    </div>
                  </a>
                )
              } else {
                return (
                  <a href={page.uri}>
                    <div className="menu-label" key={page.uri}>
                      {parse(page.title)}
                    </div>
                  </a>
                )
              }
            })
          }
          <div aria-hidden="true" className="menu-label" key="back" onClick={() => setShowHamburger(false)} onKeyDown={() => setShowHamburger(false)}>Back</div>
        </div>
        :
        null
      }
      <Link
        onMouseOver={() => setActive(true)}
        onMouseOut={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className="header-link-home"
        to="/"
      >
        <img
          src={active ? greenLogo : whiteLogo}
          alt="home"
          className="header-logo"
          id="header-logo-main"
        />
        {/* {
          template==="article" && document.documentElement.scrollTop >= 25 ?
          <span
          className="header-logo"
          id="header-logo-text"
          style={{
            fontFamily: "var(--fontFamily-serif)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontWeight: "normal",
            maxWidth: "18rem"
          }}>Article: {title}</span>
          : */}
          <img
            src={active ? greenText : whiteText}
            alt="home"
            className="header-logo"
            id="header-logo-text"
          />
        {/* } */}
      </Link>
      <button className="open-hamburger provisional" onClick={() => setShowHamburger(true)} style={{ display: "none" }}><IoIosMenu aria-label="close-menu" /></button>
      <div className="menu-items">
        {title === "Browse" ?
          <div className="menu-label">
            <Link to="/browse" style={{ color: green}}>Browse</Link>
          </div>
          :
          <div className="menu-label">
            <Link to="/browse">Browse</Link>
          </div>}
        {pages.map(page => {
          if (title === parse(page.title)) {
            return (
              <div className="menu-label" key={page.uri}>
                <a href={page.uri} style={{ color: green}}>
                  {parse(page.title)}
                </a>
              </div>
            )
          } else {
            return (
              <div className="menu-label" key={page.uri}>
                <a href={page.uri}>
                  {parse(page.title)}
                </a>
              </div>
            )
          }
        })}
      </div>
    </header>
  )
}

export default Header
