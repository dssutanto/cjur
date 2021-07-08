import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"
import whiteLogo from "../../content/assets/CJUR-head-text-white.png"

const Footer = () => {
  const { wpUser } = useStaticQuery(graphql`
    query footerQuery {
      wpUser(id: {eq: "dXNlcjox"}) {
        email
      }
    }
  `)

  // const cjurMail = wpUser.email
  // console.log(cjurMail)

  return (
    <footer className="global-footer">
      <Link to="/"><img src={whiteLogo} alt="" className="footer-logo" /></Link>
      <h3><i>A student-led publication that aims to highlight research by undergraduate students of all disciplines</i></h3> {/* Tagline here */}
      Copyright © Canadian Journal of Undergraduate Research {new Date().getFullYear()} | Developed by
      {` `}
      <a href="https://sutanto.dev/">Derrick Sutanto</a>
    </footer>
  )
}

export default Footer
