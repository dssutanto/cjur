import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"
import whiteText from "../../content/assets/CJUR-head-text-white.png"
import whiteLogo from "../../content/assets/CJUR-white.png"
import greenText from "../../content/assets/CJUR-head-text-moss.png"
import greenLogo from "../../content/assets/CJUR-moss.png"
import { IoIosMenu, IoMdClose } from "react-icons/io"
const green = {
  color: "#74846c"
}

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
          <div className="menu-label">
            <Link to="/">Home</Link>
          </div>
          {
            title === "Browse" ?
              <div className="menu-label">
                <Link to="/browse" style={green}>Browse</Link>
              </div>
              :
              <div className="menu-label">
                <Link to="/browse">Browse</Link>
              </div>
          }
          {
            pages.map(page => {
              if (title === parse(page.title)) {
                return (
                  <div className="menu-label" key={page.uri}>
                    <a href={page.uri} style={green}>
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
            })
          }
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
        <img
          src={active ? greenText : whiteText}
          alt="home"
          className="header-logo"
          id="header-logo-text"
        />
      </Link>
      {
        showHamburger ?
        <button className="open-hamburger provisional" onClick={() => setShowHamburger(false)} style={{ display: "none" }}><IoMdClose /></button>
        :
        <button className="open-hamburger provisional" onClick={() => setShowHamburger(true)} style={{ display: "none" }}><IoIosMenu /></button>
      }
      <div className="menu-items">
        {title === "Browse" ?
          <div className="menu-label">
            <Link to="/browse" style={green}>Browse</Link>
          </div>
          :
          <div className="menu-label">
            <Link to="/browse">Browse</Link>
          </div>}
        {pages.map(page => {
          if (title === parse(page.title)) {
            return (
              <div className="menu-label" key={page.uri}>
                <a href={page.uri} style={green}>
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
