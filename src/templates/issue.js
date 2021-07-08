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

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const IssueTemplate = ({ data: { page, allWpPost } }) => {
    const posts = allWpPost.nodes

    return (
        <Layout>
            <header className="issue-header" style={{ backgroundImage: `url(${page.issue.heroBanner.mediaItemUrl})` }}>
                <h1 className="main-heading" itemProp="headline">{parse(page.title)}</h1>
                <span className="pub-date">{parse(page.issue.released)}</span>
            </header>
            <article
                className="issue-catalogue"
                itemScope
            >
                <div class="issue-big">
                    <div class="latest-articles">
                        {posts.filter((post) =>
                            post.articleMetadata.articleData.issue.id === page.id ? true : false
                        ).map(post => {
                            return (
                                <div key={post.uri} className="article-card">
                                    <h5><a href={"/article" + post.uri}>{parse(post.title)}</a></h5>
                                    <p>{parse(post.articleMetadata.authorData.authors)}
                                        <br />
                                        {parse(post.articleMetadata.authorData.affiliations)}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="issue-team">
                        <section>
                            {!page.issue.chiefPlural ? (
                                <h2>Editor-in-chief</h2>
                            ) : (
                                <h2>Editors-in-chief</h2>
                            )}
                            {parse(page.issue.chiefEditor)}
                        </section>
                        <section>
                            <h2>Editors</h2>
                            {parse(page.issue.editors)}
                        </section>
                        {!!page.issue.copyeditors && (
                            <section>
                                {!page.issue.copyeditorPlural ? (
                                    <h2>Subeditor</h2>
                                ) : (
                                    <h2>Subeditors</h2>
                                )}
                                {parse(page.issue.copyeditors)}
                            </section>
                        )}
                        {!!page.issue.designers && (
                            <section>
                                {!page.issue.designerPlural ? (
                                    <h2>Designer</h2>
                                ) : (
                                    <h2>Designers</h2>
                                )}
                                {parse(page.issue.designers)}
                            </section>
                        )}
                        {!!page.issue.advisers && (
                            <section>
                                {!page.issue.adviserPlural ? (
                                    <h2>Adviser</h2>
                                ) : (
                                    <h2>Advisers</h2>
                                )}
                                {parse(page.issue.advisers)}
                            </section>
                        )}
                    </div>
                </div>
            </article>
        </Layout>
    )
}

export default IssueTemplate

export const issueQuery = graphql`
  query IssueById(
    $id: String!
  ) {
    page: wpPage(id: { eq: $id }) {
        id
        issue {
            chiefEditor
            copyeditors
            advisers
            designers
            editors
            chiefPlural
            copyeditorPlural
            adviserPlural
            designerPlural
            released
            cover {
              mediaItemUrl
            }
            heroBanner {
                mediaItemUrl
            }
        }
        title
    }
    allWpPost(
        sort: { fields: [date], order: ASC }
    ) {
        nodes {
          uri
          title
          articleMetadata {
            articleData {
              abstract
              pdf {
                mediaItemUrl
              }
              issue {
                ... on WpPage {
                  link
                  id
                }
              }
            }
            authorData {
              authors
              affiliations
            }
          }
        }
      }
  }
`
