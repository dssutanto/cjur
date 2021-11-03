import React from "react"
import { Link, graphql } from "gatsby"
// import parse from "html-react-parser"

import Layout from "../components/layout"
import ArticleCard from "../components/articlecard"

const HomePage = ({ data: { current, top, posts } }) => {
  var currentIssue = current.nodes[0]
  currentIssue.issue.releasedDate = new Date(
    currentIssue.issue.released.substring(0, 4),
    currentIssue.issue.released.substring(4, 6)
  ).toLocaleString('default', { month: 'long'})
  return (
    <Layout style={{ padding: "0" }}>
      <div className="issue-header" style={{ backgroundImage: `url(${currentIssue.issue.heroBanner.staticFile.publicURL})` }}>
        <h1>Our {currentIssue.issue.releasedDate} issue out now</h1>
        <div className="hero-buttons">
          <button href={currentIssue.uri} className="dark" style={{ fontSize:"var(--fontSize-2)"}}>Read</button>
          <button href={currentIssue.issue.pdfLink.staticFile.publicURL} className="dark" style={{ fontSize:"var(--fontSize-2)"}}>Download PDF</button>
        </div>
      </div>
      <article className="home-body">
        <section className="index-menu">
          <a href={top.nodes[0].uri} className="index-link">
            <div className="index-card">
              {top.nodes[0].title}
            </div>
          </a>
          {!!top.nodes[1] && (
            <a href={top.nodes[1].uri} className="index-link">
              <div className="index-card">
                {top.nodes[1].title}
              </div>
            </a>
          )}
          <Link to="/browse" className="index-link">
            <div className="index-card">
              Browse
            </div>
          </Link>
        </section>
        <section className="index-section">
          <h2>Latest article</h2>
          <ArticleCard
            uri={posts.nodes[0].uri}
            title={posts.nodes[0].title}
            authorData={posts.nodes[0].articleMetadata.authorData}
            pdf={posts.nodes[0].articleMetadata.articleData.pdfLink.staticFile.publicURL}
            citation={posts.nodes[0].articleMetadata.articleData.citation}
            abstract={posts.nodes[0].articleMetadata.articleData.abstract}
          />
        </section>
      </article>
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query frontPageQuery {
    current: allWpPage(
      filter: { issue: { status: { eq: "Current" } } }
    ) {
      nodes {
        uri
        issue {
          released
          cover {
            staticFile {
              publicURL
            }
          }
          pdfLink {
            staticFile {
              publicURL
            }
          }
          heroBanner {
            staticFile {
              publicURL
            }
          }
        }
      }
    }
    top: allWpPage(
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
    posts: allWpPost(
      sort: { fields: [date], order: DESC }
    ) {
      nodes {
        title
        content
        uri
        articleMetadata {
          articleData {
            abstract
            pdfLink {
              staticFile {
                publicURL
              }
            }
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
        }
      }
    }
  }
`
