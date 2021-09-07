import React from "react"
import Header from "./header.js"
import Footer from "./footer.js"

const Layout = ({ children, template, title }) => {
  return (
    <div className="global-layout">
      {/* <Headroom> */}
        <Header template = {template} title = {title} />
      {/* </Headroom> */}
      
      <main className="global-wrapper">{children}</main>

      <Footer />
    </div>
  )
}

export default Layout
