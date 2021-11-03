import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BrowseIssues = ({
  data: { allWpPage },
}) => {

  const issues = []
  allWpPage.nodes.filter((page) =>
    !!page.issue.isIssuePage ? true : false || !!page.specialIssue.isSpecialIssue ? true : false
  ).map((page) =>
    issues.push(page)
  )

  function pubDate(issue) {
    var date;
    if (!!issue.issue.isIssuePage) {
      date = new Date(
        issue.issue.released.substring(0, 4),
        issue.issue.released.substring(4, 6)
      ).toLocaleString('default', { month: 'long', year: 'numeric' })
    } else {
      date = new Date(
        issue.specialIssue.published.substring(0, 4),
        issue.specialIssue.published.substring(4, 6)
      ).toLocaleString('default', { month: 'long', year: 'numeric' })
    }
    return date;
  }

  function getKey(issue) {
    let key;
    if (!!issue.issue.isIssuePage) {
      key = issue.uri
    } else {
      key = issue.specialIssue.pdfLink.staticFile.publicURL
    }
    return key;
  }

  return (
    <Layout title="Browse">
      <Seo title="All pages" />
      <header>
        <h1 className="main-heading" itemProp="headline">Browse</h1>
      </header>
      <article className="default-page">
        <p>All of our articles, issues, and special editions in one place.</p>
      </article>
      {/* <article className="browse-body"> */}
      {/* <div className="browse-section"> */}
      {/* <div className="browse-section-wrapper">
          <h2>Issues</h2>
        </div> */}
      {/* </div> */}
      <div className="browse-section">
        <div className="browse-section-wrapper">
          {issues.map(issue => (
            <div key={getKey(issue)} className="issue-block">
              <a href={getKey(issue)} className="issue-display">
                <div className="image-wrapper">
                  <img src={issue.issue.cover.staticFile.publicURL} alt="" className="cover" />
                </div>
                <section>
                  <h3>{parse(issue.title)}</h3>
                  <h5>{pubDate(issue)}</h5>
                </section>
              </a>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default BrowseIssues

export const pageQuery = graphql`
  query allIssues {
    allWpPage(
      sort: { fields: [date], order: DESC }
    ) {
      nodes {
        id
        uri
        issue {
          isIssuePage
          status
          released
          leadArticle {
            ... on WpPost {
              id
              title
            }
          }
          cover {
            staticFile {
              publicURL
            }
          }
        }
        specialIssue {
          isSpecialIssue
          description
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
          published
        }
        title
      }
    }
  }
`
