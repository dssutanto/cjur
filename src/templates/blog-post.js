import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
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

const BlogPostTemplate = ({ data: { post } }) => {
  // const featuredImage = {
  //   fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
  //   alt: post.featuredImage?.node?.alt || ``,
  // }

  const graphics = post.articleMetadata.graphics
  const captions = post.articleMetadata.captions

  return (
    <Layout>
      <Seo title={post.title} description={post.articleMetadata.articleData.abstract} />

      <header className="article-header">
        <h1 className="main-heading" itemProp="headline">{parse(post.title)}</h1>
        <span className="authors">{parse(post.articleMetadata.authorData.authors)}</span><br />
        <span className="affiliations">{parse(post.articleMetadata.authorData.affiliations)}</span>
      </header>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <div className="sidebar-wrapper">
          <Sidebar>
            <section label="Info">
              <h3>About</h3>
              <section className="vol-info">
                <img
                  src={post.articleMetadata.articleData.issue.issue.cover.mediaItemUrl}
                  alt="cover"
                  className="cover"
                />
                <p>
                  <span className="vol-header"><a href={post.articleMetadata.articleData.issue.uri}>{parse(post.articleMetadata.articleData.issue.title)}</a></span><br />
                  <span className="m-header">{parse(post.articleMetadata.articleData.issue.issue.released)}</span>
                </p>
              </section>
              {/* <h4>{parse(post.title)}</h4> */}
              {!!post.articleMetadata.articleData.pdf.mediaItemUrl && (
                <form action={post.articleMetadata.articleData.pdf.mediaItemUrl} target="_blank">
                  <input type="submit" value="Download PDF" className="dark" />
                </form>
              )}
              <p>
                <span class="m-header">Published online</span><br />
                {parse(post.articleMetadata.articleData.publicationDate)}
              </p>
              <p>
                <span class="m-header">Citation</span><br />
                {parse(post.articleMetadata.articleData.citation)}
              </p>
              <p>
                <span class="m-header">Copyright</span><br />
                © The Authors. This open-access article is licensed under a Creative Commons Attribution 4.0 International Licence.
              </p>
            </section>
            <section label="Ref.">
              <h3>References</h3>
              {parse(post.articleMetadata.articleData.references)}
            </section>
            <section label="Fig.">
              <h3>Figures</h3>
              {!!post.articleMetadata.graphics.fig1 && !!post.articleMetadata.captions.fig1 ? (
                <figure>
                  <img src={post.articleMetadata.graphics.fig1.mediaItemUrl} alt="Figure 1" />
                  <figcaption><span class="m-header">Fig.1</span>&nbsp;{post.articleMetadata.captions.fig1}</figcaption>
                </figure>
              ) : (
                <p>No figures were found for this article.</p>
              )}
              {!!post.articleMetadata.graphics.fig2 && !!post.articleMetadata.captions.fig2 && (
                <figure>
                  <img src={post.articleMetadata.graphics.fig1.mediaItemUrl} alt="Figure 2" />
                  <figcaption><span class="m-header">Fig.2</span>&nbsp;{post.articleMetadata.captions.fig2}</figcaption>
                </figure>
              )}
              {!!post.articleMetadata.graphics.fig3 && !!post.articleMetadata.captions.fig3 && (
                <figure>
                  <img src={post.articleMetadata.graphics.fig2.mediaItemUrl} alt="Figure 3" />
                  <figcaption><span class="m-header">Fig.3</span>&nbsp;{post.articleMetadata.captions.fig3}</figcaption>
                </figure>
              )}
              {!!post.articleMetadata.graphics.fig4 && !!post.articleMetadata.captions.fig4 && (
                <figure>
                  <img src={post.articleMetadata.graphics.fig3.mediaItemUrl} alt="Figure 4" />
                  <figcaption><span class="m-header">Fig.4</span>&nbsp;{post.articleMetadata.captions.fig4}</figcaption>
                </figure>
              )}
              {!!post.articleMetadata.graphics.fig5 && !!post.articleMetadata.captions.fig5 && (
                <figure><img src={post.articleMetadata.graphics.fig4.mediaItemUrl} alt="Figure 5" />
                  <figcaption><span class="m-header">Fig.5</span>&nbsp;{post.articleMetadata.captions.fig5}</figcaption>
                </figure>
              )}
              {!!post.articleMetadata.graphics.fig6 && !!post.articleMetadata.captions.fig6 && (
                <figure><img src={post.articleMetadata.graphics.fig5.mediaItemUrl} alt="Figure 6" />
                  <figcaption><span class="m-header">Fig.6</span>&nbsp;{post.articleMetadata.captions.fig6}</figcaption>
                </figure>
              )}
              {!!post.articleMetadata.graphics.fig7 && !!post.articleMetadata.captions.fig7 && (
                <figure><img src={post.articleMetadata.graphics.fig6.mediaItemUrl} alt="Figure 7" />
                  <figcaption><span class="m-header">Fig.7</span>&nbsp;{post.articleMetadata.captions.fig7}</figcaption>
                </figure>
              )}
              {!!post.articleMetadata.graphics.fig8 && !!post.articleMetadata.captions.fig8 && (
                <figure><img src={post.articleMetadata.graphics.fig7.mediaItemUrl} alt="Figure 8" />
                  <figcaption><span class="m-header">Fig.8</span>&nbsp;{post.articleMetadata.captions.fig8}</figcaption>
                </figure>
              )}
              {!!post.articleMetadata.graphics.fig9 && !!post.articleMetadata.captions.fig9 && (
                <figure><img src={post.articleMetadata.graphics.fig8.mediaItemUrl} alt="Figure 9" />
                  <figcaption><span class="m-header">Fig.9</span>&nbsp;{post.articleMetadata.captions.fig9}</figcaption>
                </figure>
              )}
              {!!post.articleMetadata.graphics.fig10 && !!post.articleMetadata.captions.fig10 && (
                <figure><img src={post.articleMetadata.graphics.fig9.mediaItemUrl} alt="Figure 10" />
                  <figcaption><span class="m-header">Fig.10</span>&nbsp;{post.articleMetadata.captions.fig10}</figcaption>
                </figure>
              )}
              <h3>Tables</h3>
              {!!post.articleMetadata.graphics.table1 && !!post.articleMetadata.captions.table1 ? (
                <figure><img src={post.articleMetadata.graphics.table1.mediaItemUrl} alt="Table 1" />
                  <figcaption><span class="m-header">Table 1</span>&nbsp;{post.articleMetadata.captions.table1}</figcaption>
                </figure>
              ) : (
                <p>No tables were found for this article.</p>
              )}
              {!!post.articleMetadata.graphics.table2 && !!post.articleMetadata.captions.table2 && (
                <figure><img src={post.articleMetadata.graphics.table2.mediaItemUrl} alt="Table 2" />
                  <figcaption><span class="m-header">Table 2</span>&nbsp;{post.articleMetadata.captions.table2}</figcaption>
                </figure>
              )}
              {!!post.articleMetadata.graphics.table3 && !!post.articleMetadata.captions.table3 && (
                <figure><img src={post.articleMetadata.graphics.table3.mediaItemUrl} alt="Table 3" />
                  <figcaption><span class="m-header">Table 3</span>&nbsp;{post.articleMetadata.captions.table3}</figcaption>
                </figure>
              )}
              {!!post.articleMetadata.graphics.table4 && !!post.articleMetadata.captions.table4 && (
                <figure><img src={post.articleMetadata.graphics.table4.mediaItemUrl} alt="Table 4" />
                  <figcaption><span class="m-header">Table 4</span>&nbsp;{post.articleMetadata.captions.table4}</figcaption>
                </figure>
              )}
              {!!post.articleMetadata.graphics.table5 && !!post.articleMetadata.captions.table5 && (
                <figure><img src={post.articleMetadata.graphics.table5.mediaItemUrl} alt="Table 5" />
                  <figcaption><span class="m-header">Table 5</span>&nbsp;{post.articleMetadata.captions.table5}</figcaption>
                </figure>
              )}
              <h3>Equations</h3>
              {!!post.articleMetadata.graphics.eq1 && !!post.articleMetadata.captions.eq1 ? (
                <figure><img src={post.articleMetadata.graphics.eq1.mediaItemUrl} alt="Equation 1" />
                  <figcaption><span class="m-header">Eq.1</span>&nbsp;{post.articleMetadata.captions.eq1}</figcaption>
                </figure>
              ) : (
                <p>No equations were found for this article.</p>
              )}
              {!!post.articleMetadata.graphics.eq2 && !!post.articleMetadata.captions.eq2 && (
                <figure><img src={post.articleMetadata.graphics.eq2.mediaItemUrl} alt="Equation 2" />
                  <figcaption><span class="m-header">Eq.2</span>&nbsp;{post.articleMetadata.captions.eq2}</figcaption>
                </figure>
              )}
              {!!post.articleMetadata.graphics.eq3 && !!post.articleMetadata.captions.eq3 && (
                <figure><img src={post.articleMetadata.graphics.eq3.mediaItemUrl} alt="Equation 3" />
                  <figcaption><span class="m-header">Eq.3</span>&nbsp;{post.articleMetadata.captions.eq3}</figcaption>
                </figure>
              )}
              {!!post.articleMetadata.graphics.eq4 && !!post.articleMetadata.captions.eq4 && (
                <figure><img src={post.articleMetadata.graphics.eq4.mediaItemUrl} alt="Equation 4" />
                  <figcaption><span class="m-header">Eq.4</span>&nbsp;{post.articleMetadata.captions.feq4ig1}</figcaption>
                </figure>
              )}
              {!!post.articleMetadata.graphics.eq5 && !!post.articleMetadata.captions.eq5 && (
                <figure><img src={post.articleMetadata.graphics.eq5.mediaItemUrl} alt="Equation 5" />
                  <figcaption><span class="m-header">Eq.5</span>&nbsp;{post.articleMetadata.captions.eq5}</figcaption>
                </figure>
              )}
            </section>
          </Sidebar>
        </div>

        {!!post.content && (
          <section itemProp="articleBody">
            <p>
              <span className="p-leader">Abstract</span>&nbsp;&nbsp;
              {parse(post.articleMetadata.articleData.abstract)}
            </p>
            <hr />
            {parse(post.content)}
            {!!post.articleMetadata.articleData.acknowledgement && (
              <p className="acknowledgement">
                {parse(post.articleMetadata.articleData.acknowledgement)}
              </p>
            )}
            <span className="provisional">
              {parse(post.articleMetadata.articleData.references)}
            </span>
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
    post: wpPost(id: { eq: $id }) {
      articleMetadata {
        articleData {
          abstract
          acknowledgement
          citation
          issue {
            ... on WpPage {
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
          pdf {
            mediaItemUrl
          }
          publicationDate
          references
        }
        authorData {
          affiliations
          authors
        }
        graphics {
          fig1 {
            mediaItemUrl
          }
          fig2 {
            mediaItemUrl
          }
          fig3 {
            mediaItemUrl
          }
          fig4 {
            mediaItemUrl
          }
          fig5 {
            mediaItemUrl
          }
          fig6 {
            mediaItemUrl
          }
          fig7 {
            mediaItemUrl
          }
          fig8 {
            mediaItemUrl
          }
          fig9 {
            mediaItemUrl
          }
          fig10 {
            mediaItemUrl
          }
          table1 {
            mediaItemUrl
          }
          table2 {
            mediaItemUrl
          }
          table3 {
            mediaItemUrl
          }
          table4 {
            mediaItemUrl
          }
          table5 {
            mediaItemUrl
          }
          eq1 {
            mediaItemUrl
          }
          eq2 {
            mediaItemUrl
          }
          eq3 {
            mediaItemUrl
          }
          eq4 {
            mediaItemUrl
          }
          eq5 {
            mediaItemUrl
          }
        }
        captions {
          fig1
          fig2
          fig3
          fig4
          fig5
          fig6
          fig7
          fig8
          fig9
          fig10
          table1
          table2
          table3
          table4
          table5
          eq1
          eq2
          eq3
          eq4
          eq5
        }
      }
      content
      title
    }
  }
`
