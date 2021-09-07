import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import ArticleCard from "../components/articlecard"
import { indexOf } from "lodash"

const BrowseIssues = ({
  data: { allWpPage, allWpPost },
}) => {

  const issues = []
  allWpPage.nodes.filter((page) =>
    !!page.issue.isIssuePage ? true : false
  ).map((page) =>
    issues.push(page)
  )

  const specials = []
  allWpPage.nodes.filter((page) =>
    !!page.specialIssue.isSpecialIssue ? true : false
  ).map((page) =>
    specials.push(page)
  )

  const currentArticles = allWpPost.nodes.filter((article) =>
    article.articleMetadata.articleData.issue.issue.status === "Current" ? true : false
  )
  const forthcomingArticles = allWpPost.nodes.filter((article) =>
    article.articleMetadata.articleData.issue.issue.status === "Forthcoming" ? true : false
  )

  const currentIssue = issues.filter((page) =>
    page.issue.status === "Current" ? true : false
  ).shift()
  const forthcomingIssue = issues.filter((page) =>
    page.issue.status === "Forthcoming" ? true : false
  ).shift()
  const backIssues = issues.filter((page) =>
    page.issue.status === "Back issue" ? true : false
  )

  console.log("Current issue leader: " + currentIssue.issue.leadArticle.title)
  const currentLeader = currentArticles.find((article) =>
    article.articleMetadata.articleData.issue.issue.leadArticle.id === currentIssue.issue.leadArticle.id &&
    console.log("Leader of this article's issue" + article.articleMetadata.articleData.issue.issue.leadArticle.title)
  )
  currentArticles.splice(indexOf(currentArticles, currentLeader), 1)
  // console.log(currentLeader.title)

  const currentIssueReleased = new Date(
    currentIssue.issue.released.substring(0, 4),
    currentIssue.issue.released.substring(4, 6)
  ).toLocaleString('default', { month: 'long', year: 'numeric' })

  backIssues.map((issue) =>
    issue.issue.releaseDate = new Date(
      issue.issue.released.substring(0, 4),
      issue.issue.released.substring(4, 6)
    ).toLocaleString('default', { month: 'long', year: 'numeric' })
  )

  specials.map((issue) =>
    issue.specialIssue.publishedDate = new Date(
      issue.specialIssue.published.substring(0, 4),
      issue.specialIssue.published.substring(4, 6)
    ).toLocaleString('default', { month: 'long', year: 'numeric' })
  )

  var settings = {
    dots: true,
    accessibility: true,
    arrows: true,
    nextArrow:
      <button className="slick-arrow">
        <span>&rarr;</span>
        <span>Next</span>
      </button>,
    prevArrow:
      <button className="slick-arrow">
        <span>&larr;</span>
        <span>Prev</span>
      </button>,
    infinite: false,
    rows: 2,
    slidesPerRow: 3,
    responsive: [
      {
        breakpoint: 1365,
        settings: {
          dots: true,
          accessibility: true,
          arrows: false,
          infinite: false,
          rows: 1,
          slidesPerRow: 2,
          slidesToScroll: 1,
          swipe: true,
          touchThreshold: 3,
          swipeToSlide: true
        }
      }
    ]
  }

  var settingsSpecial = {
    // centerMode: true,
    dots: true,
    accessibility: true,
    arrows: true,
    nextArrow:
      <button className="slick-arrow">
        <span>&rarr;</span>
        <span>Next</span>
      </button>,
    prevArrow:
      <button className="slick-arrow">
        <span>&larr;</span>
        <span>Prev</span>
      </button>,
    infinite: false,
    slidesPerRow: 2,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          dots: true,
          accessibility: true,
          arrows: false,
          infinite: false,
          rows: 1,
          slidesPerRow: 1,
          slidesToScroll: 1,
          swipe: true,
          touchThreshold: 3,
          swipeToSlide: true
        }
      }
    ]
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
      <div className="browse-section">
        <div className="browse-section-wrapper">
          {/* <h2>Current Issue: <span className="current-issue-title">{currentIssue.issue.released.toLocaleString('default', { month: 'long' }) + " " + currentIssue.issue.released.toLocaleString('default', { year: 'numerical' })}: <a href={currentIssue.uri}>{parse(currentIssue.title)}</a></span></h2> */}
          <h2>Current Issue: <span className="current-issue-title"><a href={currentIssue.uri}>{currentIssueReleased}: {parse(currentIssue.title)}</a></span></h2>
          <div className="issue-big">
            <div className="issue-big-cover"><img src={currentIssue.issue.cover.mediaItemUrl} alt="" className="cover" /></div>
            <div className="latest-articles">
              {/* <ArticleCard
                key={currentLeader.uri}
                uri={currentLeader.uri}
                title={parse(currentLeader.title)}
                authorData={currentLeader.articleMetadata.authorData}
                pdf={currentLeader.articleMetadata.articleData.pdf.mediaItemUrl}
                // abstract={parse(currentLeader.articleMetadata.articleData.abstract)}
                citation={parse(currentLeader.articleMetadata.articleData.citation)}
              /> */}
            </div>
            <div className="latest-articles">
              {currentArticles.map(article => {
                return (
                  <ArticleCard
                    key={article.uri}
                    uri={article.uri}
                    title={parse(article.title)}
                    authorData={article.articleMetadata.authorData}
                    pdf={article.articleMetadata.articleData.pdf.mediaItemUrl}
                    abstract={parse(article.articleMetadata.articleData.abstract)}
                    citation={parse(article.articleMetadata.articleData.citation)}
                    authorsOnly={true}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="browse-section">
        <div className="browse-section-wrapper">
          <h2>Back Issues</h2>
        </div>
      </div>
      <div className="browse-section backgrounded">
        <div className="browse-section-wrapper">
          <Slider {...settings}>
            {backIssues.map(issue => (
              <div key={issue.uri} className="issue-block">
                <a href={issue.uri} className="issue-display">
                  <div className="image-wrapper">
                    <img src={issue.issue.cover.mediaItemUrl} alt="" className="cover" />
                  </div>
                  <section>
                    <h3>{parse(issue.title)}</h3>
                    <h5>{issue.issue.releaseDate}</h5>
                  </section>
                </a>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {!!forthcomingIssue && (
        <div className="browse-section">
          <div className="browse-section-wrapper">
            <h2>Forthcoming Issue</h2>
            <div className="latest-articles">
              {forthcomingArticles.map(article => {
                return (
                  <ArticleCard
                    key={article.uri}
                    uri={article.uri}
                    title={parse(article.title)}
                    authorData={article.articleMetadata.authorData}
                    pdf={article.articleMetadata.articleData.pdf.mediaItemUrl}
                    abstract={parse(article.articleMetadata.articleData.abstract)}
                    citation={parse(article.articleMetadata.articleData.citation)}
                    authorsOnly={true}
                  />
                )
              })}
            </div>
          </div>
        </div>
      )}
      <div className="browse-section">
        <div className="browse-section-wrapper">
          <h2>Special Editions</h2>
        </div>
      </div>
      <div className="browse-section backgrounded">
        <div className="browse-section-wrapper">
          <Slider {...settingsSpecial}>
            {specials.map(issue => (
              <div key={issue.title} className="issue-block">
                <a href={issue.specialIssue.pdf.mediaItemUrl} className="issue-display">
                  <div className="image-wrapper">
                    <img src={issue.specialIssue.cover.mediaItemUrl} alt="" className="cover" />
                  </div>
                  <section>
                    <h3>{parse(issue.title)}</h3>
                    <h5>{issue.specialIssue.publishedDate}</h5>
                  </section>
                </a>
              </div>
            ))}
          </Slider>
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
            mediaItemUrl
          }
        }
        specialIssue {
          isSpecialIssue
          description
          cover {
            mediaItemUrl
          }
          pdf {
            mediaItemUrl
          }
          published
        }
        title
      }
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
              pdf {
                mediaItemUrl
              }
              issue {
                ... on WpPage {
                  link
                  id
                  issue {
                    status
                    leadArticle {
                      ... on WpPost {
                        id
                        title
                      }
                    }
                  }
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
