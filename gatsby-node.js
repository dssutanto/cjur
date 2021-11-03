const path = require(`path`)
const chunk = require(`lodash/chunk`)

// This is a simple debugging tool
// dd() will prettily dump to the terminal and kill the process
// const { dd } = require(`dumper.js`)

// exports.createResolvers = ({ actions, cache, createNodeId, createResolvers, getNode, store, reporter }) => {
//   const { createNode, touchNode } = actions;

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async gatsbyUtilities => {
  const posts = await getPosts(gatsbyUtilities)
  const pages = await getPages(gatsbyUtilities)

  if (!posts.length || !pages.length) {
    return
  }

  await createIndividualBlogPostPages({ posts, gatsbyUtilities })
  await createPages({ pages, gatsbyUtilities })
  await createBlogPostArchive({ posts, gatsbyUtilities })
}

/**
 * This function creates all the individual blog pages in this site *IMPORTANT*  MUST PRECEDE createPages()
 */
const createIndividualBlogPostPages = async ({ posts, gatsbyUtilities }) =>
  Promise.all(
    posts.map(({ post }) =>
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: `/article${post.uri}`,

        // use the blog post template as the page component
        component: path.resolve(`./src/templates/blog-post.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: post.id,

          // We also use the next and previous id's to query them and add links!
          // previousPostId: previous ? previous.id : null,
          // nextPostId: next ? next.id : null,
        },
      })
    )
  )

const createPages = async ({ pages, gatsbyUtilities }) =>
  Promise.all(
    pages.filter(({ page }) =>
      !page.specialIssue.isSpecialIssue ? true : false
    ).map(({ page }) => {
      if (!!page.issue.isIssuePage) {
        gatsbyUtilities.actions.createPage({
          path: `${page.uri}`,
          component: path.resolve(`./src/templates/issue.js`),
          context: {
            id: page.id,
          },
        })
      }
      else if (!!page.editorialBoard.ed1.givenName && !!page.editorialBoard.ed1.surname && !!page.editorialBoard.ed1.headshot.staticFile.publicURL) {
        gatsbyUtilities.actions.createPage({
          path: `${page.uri}`,
          component: path.resolve(`./src/templates/about.js`),
          context: {
            id: page.id,
          },
        })
      }
      else {
        gatsbyUtilities.actions.createPage({
          path: `${page.uri}`,
          component: path.resolve(`./src/templates/page-template.js`),
          context: {
            id: page.id,
          },
        })
      }
    })
  )

async function createBlogPostArchive({ posts, gatsbyUtilities }) {
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const { postsPerPage } = graphqlResult.data.wp.readingSettings
  const postsChunkedIntoArchivePages = chunk(posts, postsPerPage)
  const totalPages = postsChunkedIntoArchivePages.length

  return Promise.all(
    postsChunkedIntoArchivePages.map(async (_posts, index) => {
      const pageNumber = index + 1

      const getPagePath = page => {
        if (page > 0 && page <= totalPages) {
          // Since our homepage is our blog page
          // we want the first page to be "/" and any additional pages
          // to be numbered. "/blog/2" for example
          return page === 1 ? `/blog-post-archive` : `/blog-post-archive/${page}`
        }

        return null
      }

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
        path: getPagePath(pageNumber),

        // use the blog post archive template as the page component
        component: path.resolve(`./src/templates/blog-post-archive.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          offset: index * postsPerPage,

          // We need to tell the template how many posts to display too
          postsPerPage,

          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
        },
      })
    })
  )
}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
async function getPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    query WpPosts {
      allWpPost(sort: { fields: [date], order: DESC }) {
        edges {
          post: node {
            id
            uri
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPost.edges
}

async function getPages({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPages {
      allWpPage(
        sort: { fields: [date], order: DESC }
      ) {
        edges {
          page: node {
            id
            uri
            issue {
              isIssuePage
            }
            specialIssue {
              isSpecialIssue
            }
            editorialBoard {
              ed1 {
                headshot {
                  staticFile {
                    publicURL
                  }
                }
                givenName
                surname
              }
            }
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your pages`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPage.edges
}
