import React from "react"
import { graphql } from "gatsby"
// import Image from "gatsby-image"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Sidebar from "../components/sidebar"
import Fig from "../components/fig"
import 'katex/dist/katex.min.css'
import TeX from '@matejmazur/react-katex'
import Attribution from "../components/attribution"

const BlogPostTemplate = ({ data: { post } }) => {

  // const pdfDate = new Date(2019, 12, 31)
  const issueReleased = new Date(
    parseInt(post.articleMetadata.articleData.issue.issue.released.substring(0, 4)),
    parseInt(post.articleMetadata.articleData.issue.issue.released.substring(4, 6)))

  const pubDate = new Date(
    parseInt(post.articleMetadata.articleData.publicationDate.substring(0, 4)),
    parseInt(post.articleMetadata.articleData.publicationDate.substring(4, 6)),
    parseInt(post.articleMetadata.articleData.publicationDate.substring(6, 8)))

  // const cover = await import(post.articleMetadata.articleData.pdf.mediaItemUrl)
  // if (!!post.articleMetadata.articleData.pdf.mediaItemUrl)

    

  const graphics = post.articleMetadata.graphics

  var figures = []
  // var figures2 = []
  // if (!!graphics.fig1) var fig1 = await import(graphics.fig1).then(figures2.push({ title: fig1.altText, figure: fig1.mediaItemUrl, caption: fig1.caption }))
  // if (!!graphics.fig2) const fig2 = await import(graphics.fig2).then(figures2.push({ title: fig2.altText, figure: fig2.mediaItemUrl, caption: fig2.caption }))
  // if (!!graphics.fig3) const fig3 = await import(graphics.fig3).then(figures2.push({ title: fig3.altText, figure: fig3.mediaItemUrl, caption: fig3.caption }))
  // if (!!graphics.fig4) const fig4 = await import(graphics.fig4).then(figures2.push({ title: fig4.altText, figure: fig4.mediaItemUrl, caption: fig4.caption }))
  // if (!!graphics.fig5) const fig5 = await import(graphics.fig5).then(figures2.push({ title: fig5.altText, figure: fig5.mediaItemUrl, caption: fig5.caption }))
  // if (!!graphics.fig6) const fig6 = await import(graphics.fig6).then(figures2.push({ title: fig6.altText, figure: fig6.mediaItemUrl, caption: fig6.caption }))
  // if (!!graphics.fig7) const fig7 = await import(graphics.fig7).then(figures2.push({ title: fig7.altText, figure: fig7.mediaItemUrl, caption: fig7.caption }))
  // if (!!graphics.fig8) const fig8 = await import(graphics.fig8).then(figures2.push({ title: fig8.altText, figure: fig8.mediaItemUrl, caption: fig8.caption }))
  // if (!!graphics.fig9) const fig9 = await import(graphics.fig9).then(figures2.push({ title: fig9.altText, figure: fig9.mediaItemUrl, caption: fig9.caption }))
  // if (!!graphics.fig10) const fig10 = await import(graphics.fig10).then(figures2.push({ title: fig10.altText, figure: fig10.mediaItemUrl, caption: fig10.caption }))

  if (!!graphics.fig1) figures.push(graphics.fig1)
  if (!!graphics.fig2) figures.push(graphics.fig2)
  if (!!graphics.fig3) figures.push(graphics.fig3)
  if (!!graphics.fig4) figures.push(graphics.fig4)
  if (!!graphics.fig5) figures.push(graphics.fig5)
  if (!!graphics.fig6) figures.push(graphics.fig6)
  if (!!graphics.fig7) figures.push(graphics.fig7)
  if (!!graphics.fig8) figures.push(graphics.fig8)
  if (!!graphics.fig9) figures.push(graphics.fig9)
  if (!!graphics.fig10) figures.push(graphics.fig10)

  // var parser = new DOMParser();
  // var domTable = parser.parseFromString(table.table, 'text/html').body.firstElementChild

  var tables = []
  // var tables2 = []
  // if (!!graphics.table1.table) const table1 = await import(graphics.table1).then(tables2.push({ title: table1.title, table: table1.table, caption: table1.caption }))
  // if (!!graphics.table2.table) const table2 = await import(graphics.table2).then(tables2.push({ title: table2.title, table: table2.table, caption: table2.caption }))
  // if (!!graphics.table3.table) const table3 = await import(graphics.table3).then(tables2.push({ title: table3.title, table: table3.table, caption: table3.caption }))
  // if (!!graphics.table4.table) const table4 = await import(graphics.table4).then(tables2.push({ title: table4.title, table: table4.table, caption: table4.caption }))
  // if (!!graphics.table5.table) const table5 = await import(graphics.table5).then(tables2.push({ title: table5.title, table: table5.table, caption: table5.caption }))

  if (!!graphics.table1.table) tables.push(graphics.table1)
  if (!!graphics.table2.table) tables.push(graphics.table2)
  if (!!graphics.table3.table) tables.push(graphics.table3)
  if (!!graphics.table4.table) tables.push(graphics.table4)
  if (!!graphics.table5.table) tables.push(graphics.table5)

  // tables.forEach(table => console.log(table.caption))

  const sidebarContentInfo =
    <section label="Info">
      <h3>About</h3>
      <section className="vol-info">
        <img
          src={post.articleMetadata.articleData.issue.issue.cover.mediaItemUrl}
          alt="cover"
          className="cover"
        />
        <p className="sidebar-issue-info">
          <span className="vol-header"><a href={post.articleMetadata.articleData.issue.uri}>{parse(post.articleMetadata.articleData.issue.title)}</a></span>
          <span className="m-header">{issueReleased.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
          {!!post.articleMetadata.articleData.pdf.mediaItemUrl && (
            <button href={post.articleMetadata.articleData.pdf.mediaItemUrl} className="dark">Download PDF</button>
          )}
        </p>
      </section>
      <p className="info-section">
        <span className="m-header">Published online</span><br />
        {pubDate.toLocaleString('default', { dateStyle: 'long' })}
      </p>
      <p className="info-section">
        <span className="m-header">Citation</span><br />
        {parse(post.articleMetadata.articleData.citation)}
      </p>
      <p className="info-section">
        <span className="m-header">Copyright</span><br />
        © The Authors. This open-access article is licensed under a <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International Licence</a>.
      </p>
    </section>

  const sidebarContentRef =
    <section label="Ref.">
      <h3>References</h3>
      <section className="refs">
        {parse(post.articleMetadata.articleData.references)}
      </section>
    </section>

  const sidebarContentFig =
    <section label="Fig.">
      <h3 className="figs">Figures</h3>
      {figures.length > 0 ?
        figures.map(fig =>
          <Fig
            key={fig.title}
            figure={fig}
            type="figure"
          />
        )
        :
        <p><em>No figures were found for this article.</em></p>
      }
      {tables.length > 0 ?
        <section>
          <h3 className="figs">Tables</h3>
          {tables.map(table =>
            <Fig
              key={table.title}
              figure={table}
              type="table"
            />
          )}
        </section>
        :
        <p><em>No tables were found for this article.</em></p>
      }
    </section>

  return (
    <Layout template="article" title={post.title}>
      <Seo title={post.title} description={post.articleMetadata.articleData.abstract} />

      <header className="article-header">
        <h1 className="main-heading" itemProp="headline">{parse(post.title)}</h1>
        <Attribution authorData={post.articleMetadata.authorData} />
        <div className="provisional" style={{ display: "none" }}>
          <span className="article-card-button" id="pubDate">{pubDate.toLocaleString('default', { dateStyle: 'long' })}</span>
          {!!post.articleMetadata.articleData.pdf.mediaItemUrl && (<button className="article-card-button" href={post.articleMetadata.articleData.pdf.mediaItemUrl}>Download</button>)}
          <button className="article-card-button copy-cite" onClick={() => {
            navigator.clipboard.writeText(parse(post.articleMetadata.articleData.citation))
          }}>Copy citation</button>
        </div>
      </header>
      <article
        className="blog-post"
      // itemScope
      // itemType="http://schema.org/Article"
      >
        <div className="sidebar-wrapper">
          <Sidebar>
            {sidebarContentInfo}
            {sidebarContentRef}
            {sidebarContentFig}
          </Sidebar>
        </div>

        {!!post.content && (
          <section
            className="articleBody"
            itemProp="articleBody"
          >
            <p>
              <span className="p-leader">Abstract</span>&nbsp;&nbsp;
              {parse(post.articleMetadata.articleData.abstract)}
            </p>
            <hr />
            {parse(post.content
              , {
                replace: (domNode) => {
                  if (domNode.name === "pre") {
                    return (
                      <TeX block>{parse(domNode.children[0].data, domNode)}</TeX>
                    )
                  }
                }
              }
            )}
            {!!post.articleMetadata.articleData.acknowledgement && (
              <p className="acknowledgement">
                {parse(post.articleMetadata.articleData.acknowledgement)}
              </p>
            )}
            <section className="provisional refs article-resp" style={{ display: "none" }}>
              <h2>References</h2>
              {parse(post.articleMetadata.articleData.references)}
            </section>
            <section label="Fig.">
              {figures.length > 0 ?
                <section className="provisional article-resp" style={{ display: "none" }}>
                  <h2 className="figs" >Figures</h2>
                  {figures.map(fig =>
                    <Fig
                      key={fig.title}
                      figure={fig}
                      type="figure"
                    />
                  )}
                </section>
                :
                null
              }
              {tables.length > 0 ?
                <section className="provisional article-resp" style={{ display: "none" }}>
                  <h2 className="figs">Tables</h2>
                  {tables.map(table =>
                    <Fig
                      key={table.title}
                      figure={table}
                      type="table"
                    />
                  )}
                </section>
                :
                null
              }
            </section>
          </section>
        )}

      </article>
    </Layout>
  )
}
export default BlogPostTemplate

export const pageQuery = graphql`
      query BlogPostById(
        # these variables are passed in via createPage.pageContext in gatsby-node.js
        $id: String!
      ) {
        # selecting the current post by id
        post: wpPost(id: {eq: $id }) {
          title
          content
          articleMetadata {
            articleData {
              abstract
              publicationDate
              acknowledgement
              issue {
                ...on WpPage {
                  title
                  uri
                  issue {
                    cover {
                      mediaItemUrl
                    }
                    status
                    released
                  }
                }
              }
              pageStart
              pageEnd
              pdf {
                mediaItemUrl
              }
              references
              citation
            }
            authorData {
              author1 {
                affiliation
                givenName
                surname
                surnameFirst
              }
              author2 {
                affiliation
                givenName
                surname
                surnameFirst
              }
              author3 {
                affiliation
                givenName
                surname
                surnameFirst
              }
              author4 {
                affiliation
                givenName
                surname
                surnameFirst
              }
              author5 {
                affiliation
                givenName
                surname
                surnameFirst
              }
              author6 {
                affiliation
                givenName
                surname
                surnameFirst
              }
              author7 {
                affiliation
                givenName
                surname
                surnameFirst
              }
              author8 {
                affiliation
                givenName
                surname
                surnameFirst
              }
              author9 {
                affiliation
                givenName
                surname
                surnameFirst
              }
              author10 {
                affiliation
                givenName
                surname
                surnameFirst
              }
            }
            graphics {
              fig1 {
                altText
                caption
                mediaItemUrl
                title
              }
              fig2 {
                altText
                caption
                mediaItemUrl
                title
              }
              fig3 {
                altText
                caption
                mediaItemUrl
                title
              }
              fig4 {
                altText
                caption
                mediaItemUrl
                title
              }
              fig5 {
                altText
                caption
                mediaItemUrl
                title
              }
              fig6 {
                altText
                caption
                mediaItemUrl
                title
              }
              fig7 {
                altText
                caption
                mediaItemUrl
                title
              }
              fig8 {
                altText
                caption
                mediaItemUrl
                title
              }
              fig9 {
                altText
                caption
                mediaItemUrl
                title
              }
              fig10 {
                altText
                caption
                mediaItemUrl
                title
              }
              table1 {
                caption
                table
                title
              }
              table2 {
                caption
                table
                title
              }
              table3 {
                caption
                table
                title
              }
              table4 {
                caption
                table
                title
              }
              table5 {
                caption
                table
                title
              }
            }
          }
        }
      }
    `
