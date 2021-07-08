import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PaginatedIssues from "../components/paginated-issues"
import PaginatedSpecials from "../components/paginated-specials"
import Pagination from "../components/pagination"

const BrowseIssues = ({
  data: { allWpPage, allWpMediaItem, allWpPost },
}) => {
  const articles = allWpPost.nodes

  const currentIssue = allWpPage.nodes.filter((page) =>
    page.issue.status === "Current" ? true : false
  )
  const forthcomingIssue = allWpPage.nodes.filter((page) =>
    page.issue.status === "Forthcoming" ? true : false
  )
  const backIssues = allWpPage.nodes.filter((page) =>
    page.issue.status === "Back issue" ? true : false
  )
  const specialIssues = allWpMediaItem.nodes

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(6)

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentBackIssues = backIssues.slice(indexOfFirstPost, indexOfLastPost)
  const currentSpecialIssues = specialIssues.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <Layout>
      <Seo title="All pages" />
      <section>
        <h2>Current Issue</h2>
        <div class="issue-big">
          <div><img src={currentIssue[0].issue.cover.mediaItemUrl} alt="" className="cover" /></div>
          <div class="latest-articles">
          <h3><a href={currentIssue[0].uri}>{parse(currentIssue[0].title)}</a></h3>
            {articles.filter((article) =>
              article.articleMetadata.articleData.issue.id === currentIssue[0].id ? true : false
            ).map(article => {
              return (
                <div key={article.uri}>
                  <h5><a href={"/article" + article.uri}>{parse(article.title)}</a></h5>
                  <p>{parse(article.articleMetadata.authorData.authors)}
                  <br />
                  {parse(article.articleMetadata.authorData.affiliations)}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section>
        <h2>Back Issues</h2>
        <PaginatedIssues issues={currentBackIssues} />
        <Pagination postsPerPage={postsPerPage} totalPosts={backIssues.length} paginate={paginate} />
      </section>
      {!!forthcomingIssue[0] && (
        <section>
          <h2>Forthcoming Issue</h2>
          <ul>
            {articles.filter((article) =>
              article.articleMetadata.articleData.issue.id === forthcomingIssue[0].id ? true : false
            ).map(article => {
              return (
                <li key={article.uri}><a href={"/article" + article.uri}>{parse(article.title)}</a></li>
              )
            })}
          </ul>
        </section>
      )}
      {/* <section>
        <h2>Special Editions</h2>
        {console.log(currentSpecialIssues)}
        <PaginatedSpecials specials={currentSpecialIssues} />
        <Pagination postsPerPage={postsPerPage} totalPosts={specialIssues.length} paginate={paginate} />
      </section> */}
    </Layout>
  )
}

export default BrowseIssues

export const pageQuery = graphql`
  query allIssues {
    allWpPage(
      sort: { fields: [date], order: DESC },
      filter: { issue: { isIssuePage: { eq: true } } }
    ) {
      nodes {
        id
        uri
        issue {
          status
          released
          cover {
            mediaItemUrl
          }
        }
        title
      }
    }
    allWpMediaItem(
      filter: { specialIssue: { isSpecialIssue: { eq: true } } }
    ) {
      nodes {
        specialIssue {
          cover {
            mediaItemUrl
          }
          date
          isSpecialIssue
        }
        mediaItemUrl
        caption
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
