import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

import Layout from "../components/layout"
// import Seo from "../components/seo"

const PageTemplate = ({ data: { page } }) => {

    return (
        <Layout title={page.title}>
                <header>
                        <h1 className="main-heading" itemProp="headline">{parse(page.title)}</h1>
                </header>
                <article className="default-page">
                        {parse(page.content)}
                </article>
        </Layout>
    )
}

export default PageTemplate

export const pageQuery = graphql`
query PageById(
  $id: String!
) {
  page: wpPage(id: { eq: $id }) {
      content
      title
  }
}
`
