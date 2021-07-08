import React from "react"
import Header from "./header.js"
import Footer from "./footer.js"
import Headroom from "react-headroom"

const Layout = ({ children }) => {
  return (
    <div>
      <Headroom>
        <Header />
      </Headroom>
      
      <main className="global-wrapper">{children}</main>

      <Footer />
    </div>
  )
}

export default Layout
