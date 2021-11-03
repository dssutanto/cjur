import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"

import Layout from "../components/layout"
import ArticleCard from "../components/articlecard"

const HomePage = ({ data: { current, special, top, posts } }) => {
  var currentIssue = current.nodes[0]

  currentIssue.issue.releasedDate = new Date(
    currentIssue.issue.released.substring(0, 4),
    currentIssue.issue.released.substring(4, 6)
  ).toLocaleString('default', { month: 'long' })

  const currentArticles = posts.nodes.filter((article) =>
    article.articleMetadata.articleData.issue.issue.status === "Current" ? true : false
  )

  const latestArticles = []
  for (let i = 0; i <= 5; i++) {
    latestArticles.push(posts.nodes[i])
  }

  const specialIssue = special.nodes[0];
  specialIssue.releasedDate = new Date(
    specialIssue.specialIssue.published.substring(0, 4),
    specialIssue.specialIssue.published.substring(4, 6)
  ).toLocaleString('default', { month: 'long' })

  // const currentLeader = currentArticles.find((article) =>
  //   article.articleMetadata.articleData.issue.issue.leadArticle.id === currentIssue.issue.leadArticle.id
  // && console.log("Leader of this article's issue" + article.articleMetadata.articleData.issue.issue.leadArticle.title)
  // )
  // currentArticles.splice(indexOf(currentArticles, currentLeader), 1)
  // console.log(currentLeader.title)

  // backIssues.map((issue) =>
  //   issue.issue.releaseDate = new Date(
  //     issue.issue.released.substring(0, 4),
  //     issue.issue.released.substring(4, 6)
  //   ).toLocaleString('default', { month: 'long', year: 'numeric' })
  // )

  // specials.map((issue) =>
  //   issue.specialIssue.publishedDate = new Date(
  //     issue.specialIssue.published.substring(0, 4),
  //     issue.specialIssue.published.substring(4, 6)
  //   ).toLocaleString('default', { month: 'long', year: 'numeric' })
  // )

  return (
    <Layout title="Home" style={{ padding: "0" }}>
      <div className="issue-header" style={{ backgroundImage: `url(${currentIssue.issue.heroBanner.staticFile.publicURL})` }}>
        <h1>Our {currentIssue.issue.releasedDate} issue out now</h1>
        <div className="hero-buttons">
          <a href={currentIssue.uri}>
            <button className="dark" style={{
              width: "var(--spacing-32)",
              margin: "var(--spacing-2)",
              fontSize: "var(--fontSize-3)"
            }}>Read</button>
          </a>
          <a href={currentIssue.issue.pdfLink.staticFile.publicURL}>
            <button className="dark" style={{
              width: "var(--spacing-32)",
              margin: "var(--spacing-2)",
              fontSize: "var(--fontSize-3)"
            }}>Download</button>
          </a>
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
          <h2>Latest articles</h2>
          {latestArticles.map((post) => {
            return (
              <ArticleCard
                key={post.uri}
                uri={post.uri}
                title={post.title}
                authorData={post.articleMetadata.authorData}
                pdf={post.articleMetadata.articleData.pdfLink.staticFile.publicURL}
                citation={post.articleMetadata.articleData.citation}
                date={post.articleMetadata.articleData.publicationDate}
                authorsOnly={true}
              />
            )
          })}
        </section>
        <div className="index-section">
          <h2>Current Issue: <span className="current-issue-title"><a href={currentIssue.uri}>{currentIssue.issue.releasedDate}: {parse(currentIssue.title)}</a></span></h2>
          <div className="issue-big">
            <div className="issue-big-cover"><img src={currentIssue.issue.cover.staticFile.publicURL} alt="" className="cover issue" /></div>
            <div className="latest-articles">
              {currentArticles.map(article => {
                return (
                  <ArticleCard
                    key={article.uri}
                    uri={article.uri}
                    title={parse(article.title)}
                    authorData={article.articleMetadata.authorData}
                    pdf={article.articleMetadata.articleData.pdfLink.staticFile.publicURL}
                    abstract={parse(article.articleMetadata.articleData.abstract)}
                    citation={parse(article.articleMetadata.articleData.citation)}
                    date={article.articleMetadata.articleData.publicationDate}
                    authorsOnly={true}
                  />
                )
              })}
            </div>
          </div>
        </div>
        <div className="index-section">
          <h2>Special Edition: <span className="current-issue-title"><a href={specialIssue.specialIssue.pdfLink.staticFile.publicURL}>{specialIssue.releasedDate}: {parse(specialIssue.title)}</a></span></h2>
          <div className="issue-big">
            <div className="issue-big-cover"><img src={specialIssue.specialIssue.cover.staticFile.publicURL} alt="" className="cover special" /></div>
            <div className="latest-articles" style={{ fontFamily: 'var(--fontFamily-sans)', fontWeight: '300' }}>
              {specialIssue.specialIssue.description}
            </div>
          </div>
        </div>
      </article>
    </Layout >
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
        title
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
    special: allWpPage(
      filter: { specialIssue: { isSpecialIssue: { eq: true } } }
    ) {
      nodes {
        specialIssue {
          description
          published
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
        }
        title
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
            issue {
              ... on WpPage {
                issue {
                  status
                }
              }
            }
            publicationDate
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
    allFile {
      nodes {
        publicURL
      }
    }
  }
`
