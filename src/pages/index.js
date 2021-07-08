import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"

import Layout from "../components/layout"

const HomePage = ({ data: { pages, posts } }) => {
  var currentIssue = pages.nodes[0]
  return (
    <Layout style={{ padding: "0" }}>
      <header className="issue-header" style={{ backgroundImage: `url(${currentIssue.issue.heroBanner.mediaItemUrl})` }}>
        <a href={currentIssue.uri}>
          <h4>Our {currentIssue.issue.released} issue out now</h4>
        </a>
        <form action={currentIssue.issue.pdf.mediaItemUrl} target="_blank">
          <input type="submit" value="Download PDF" className="dark" />
        </form>
      </header>
      <div className="index-menu">
        <a href={posts.nodes[0].uri} className="index-link">
          <div className="index-card">
              Latest article
          </div>
        </a>
        <Link to="/browse" className="index-link">
          <div className="index-card">
              Browse
          </div>
        </Link>
      </div>
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query frontPageQuery {
    pages: allWpPage(
      filter: { issue: { status: { eq: "Current" } } }
    ) {
      nodes {
        uri
        issue {
          released
          cover {
            mediaItemUrl
          }
          pdf {
            mediaItemUrl
          }
          heroBanner {
            mediaItemUrl
          }
        }
      }
    }
    posts: allWpPost(
      sort: { fields: [date], order: DESC }
    ) {
      nodes {
        title
        content
        uri
      }
    }
  }
`
