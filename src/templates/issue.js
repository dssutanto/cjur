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

// import Bio from "../components/bio"
import Layout from "../components/layout"
// import Seo from "../components/seo"
import ArticleCard from "../components/articlecard"

const IssueTemplate = ({ data: { page, allWpPost } }) => {
    const posts = allWpPost.nodes

    if (typeof (page.issue.chiefEditor) === "string") page.issue.chiefEditor = page.issue.chiefEditor.split(/\r\n/)
    if (typeof (page.issue.editors) === "string") page.issue.editors = page.issue.editors.split(/\r\n/)
    if (typeof (page.issue.copyeditors) === "string") page.issue.copyeditors = page.issue.copyeditors.split(/\r\n/)
    if (typeof (page.issue.designers) === "string") page.issue.designers = page.issue.designers.split(/\r\n/)
    if (typeof (page.issue.advisers) === "string") page.issue.advisers = page.issue.advisers.split(/\r\n/)

    const released = new Date(
        page.issue.released.substring(0, 4),
        page.issue.released.substring(4, 6)
    )

    return (
        <Layout template="issue" title={parse(page.title)}>
            <div className="issue-header" style={{ backgroundImage: `url(${page.issue.heroBanner.mediaItemUrl})` }}>
                <div className="issue-title">
                    <span className="pub-date">{released.toLocaleString('default', {month: 'long', year: 'numeric'})}</span>
                    {/* <br /> */}
                    <h1 itemProp="headline">{parse(page.title)}</h1>
                </div>
            </div>
            <article
                className="issue-catalogue"
                itemScope
            >
                <div className="issue-big">
                    <div>
                        {!!page.issue.frontMatter.mediaItemUrl && (
                            <div className="latest-articles">
                                <h2>Front matter</h2>
                                <ArticleCard
                                    title="Front matter"
                                    pdf={page.issue.frontMatter.mediaItemUrl}
                                />
                            </div>
                        )}
                        <div className="latest-articles">
                            <h2>Articles</h2>
                            {posts.filter((post) =>
                                post.articleMetadata.articleData.issue.id === page.id ? true : false
                            ).map(post => {
                                return (
                                    <ArticleCard
                                        key={post.uri}
                                        uri={post.uri}
                                        title={parse(post.title)}
                                        authorData={post.articleMetadata.authorData}
                                        pdf={post.articleMetadata.articleData.pdf.mediaItemUrl}
                                        abstract={parse(post.articleMetadata.articleData.abstract)}
                                        citation={parse(post.articleMetadata.articleData.citation)}
                                        date={post.articleMetadata.articleData.publicationDate}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div className="issue-team">
                        <section>
                            {
                                page.issue.chiefEditor.length > 1 ?
                                    <h2>Editors-in-Chief</h2>
                                    :
                                    <h2>Editor-in-Chief</h2>
                            }
                            {page.issue.chiefEditor.map((chief) => <li key={chief}>{chief}</li>)}
                        </section>
                        <section>
                            {
                                page.issue.editors.length > 1 ?
                                    <h2>Editors</h2>
                                    :
                                    <h2>Editor</h2>
                            }
                            {page.issue.editors.map((editor) => <li key={editor}>{editor}</li>)}
                        </section>
                        {!!page.issue.copyeditors ?
                            <section>
                                {
                                    page.issue.copyeditors.length > 1 ?
                                        <h2>Subeditors</h2>
                                        :
                                        <h2>Subeditor</h2>
                                }
                                {page.issue.copyeditors.map((sub) => <li key={sub}>{sub}</li>)}
                            </section>
                            :
                            null
                        }
                        {!!page.issue.designers ?
                            <section>
                                {
                                    page.issue.designers.length > 1 ?
                                        <h2>Designers</h2>
                                        :
                                        <h2>Designer</h2>
                                }
                                {page.issue.designers.map((designer) => <li key={designer}>{designer}</li>)}
                            </section>
                            :
                            null
                        }
                        {!!page.issue.advisers ?
                            <section>
                                {
                                    page.issue.advisers.length > 1 ?
                                        <h2>Advisers</h2>
                                        :
                                        <h2>Adviser</h2>
                                }
                                {page.issue.advisers.map((adviser) => <li key={adviser}>{adviser}</li>)}
                            </section>
                            :
                            null
                        }
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
            released
            cover {
              mediaItemUrl
            }
            heroBanner {
                mediaItemUrl
            }
            frontMatter {
                mediaItemUrl
            }
            nextIssue {
                ... on WpPage {
                    uri
                    title
                    issue {
                        released
                    }
                }
            }
            previousIssue {
                ... on WpPage {
                    uri
                    title
                    issue {
                        released
                    }
                }
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
              citation
              publicationDate
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
          }
        }
      }
  }
`
