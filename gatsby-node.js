const path = require(`path`)

// This is a simple debugging tool
// dd() will prettily dump to the terminal and kill the process
const { dd } = require(`dumper.js`)

process.on('unhandledRejection', (error, p) => {
  console.log('=== UNHANDLED REJECTION ===');
  console.dir(error.stack);
});

exports.createPages = async gatsbyUtilities => {
  const posts = await getPosts(gatsbyUtilities)
  const pages = await getPages(gatsbyUtilities)

  if (!posts.length || !pages.length) {
    return
  }

  await createIndividualBlogPostPages({ posts, gatsbyUtilities })
  await createIssuePages({ pages, gatsbyUtilities })
}

const createIndividualBlogPostPages = async ({ posts, gatsbyUtilities }) =>
  Promise.all(
    console.log("Running createIndividualBlogPostPages()"),
    posts.map(({ post }) =>
      // console.log("Creating an article post"),
      gatsbyUtilities.actions.createPage({
        path: `/article${post.uri}`,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          id: post.id,
        },
      })
    )
  ).catch(err => {
    console.log("Error in createIndividualBlogPostPages(): " + err)
  })

const createIssuePages = async ({ pages, gatsbyUtilities }) =>
  Promise.all(
    // console.log("Running createIssuePages()"),
    pages.filter(({ page }) =>
      !page.specialIssue.isSpecialIssue ? true : false
    ).map(({ page }) => {
      if (!!page.issue.isIssuePage) {
        // console.log("Creating an issue page"),
          gatsbyUtilities.actions.createPage({
            path: `${page.uri}`,
            component: path.resolve(`./src/templates/issue.js`),
            context: {
              id: page.id,
            },
          })
      }
      else if (!!page.editorialBoard.ed1.givenName && !!page.editorialBoard.ed1.surname && !!page.editorialBoard.ed1.headshot) {
        // console.log("Creating an about page"),
          gatsbyUtilities.actions.createPage({
            path: `${page.uri}`,
            component: path.resolve(`./src/templates/about.js`),
            context: {
              id: page.id,
            },
          })
      }
      else {
        // console.log("Creating a standard page"),
          gatsbyUtilities.actions.createPage({
            path: `${page.uri}`,
            component: path.resolve(`./src/templates/page-template.js`),
            context: {
              id: page.id,
            },
          })
      }
    })
  ).catch(err => {
    console.log("Error in createIssuePages(): " + err)
  })


// const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

// exports.downloadMediaFiles = ({
//   nodes,
//   getCache,
//   createNode,
//   createNodeId,
//   _auth,
// }) => {
//   nodes.map(async node => {
//     let fileNode
//     if (node.__type === `wordpress__wp_media`) {
//       try {
//         fileNode = await createRemoteFileNode({
//           url: node.source_url,
//           parentNodeId: node.id,
//           getCache,
//           createNode,
//           createNodeId,
//           auth: _auth,
//         })
//       } catch (e) { }
//     }

//     if (fileNode) {
//       node.localFile___NODE = fileNode.id
//     }
//   })
// }


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
  const graphqlResult = await graphql(`
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
