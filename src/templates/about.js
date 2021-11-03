import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"

import Layout from "../components/layout"
// import Seo from "../components/seo"
import Bio from "../components/bio"

const AboutPage = ({ data: { page } }) => {
    const editors = page.editorialBoard
    const chiefs = []
    const otherEditors = []

    editors.ed1.isChief ? chiefs.push(editors.ed1) : otherEditors.push(editors.ed1)
    editors.ed2.isChief ? chiefs.push(editors.ed2) : otherEditors.push(editors.ed2)
    editors.ed3.isChief ? chiefs.push(editors.ed3) : otherEditors.push(editors.ed3)
    editors.ed4.isChief ? chiefs.push(editors.ed4) : otherEditors.push(editors.ed4)
    editors.ed5.isChief ? chiefs.push(editors.ed5) : otherEditors.push(editors.ed5)
    editors.ed6.isChief ? chiefs.push(editors.ed6) : otherEditors.push(editors.ed6)
    editors.ed7.isChief ? chiefs.push(editors.ed7) : otherEditors.push(editors.ed7)
    editors.ed8.isChief ? chiefs.push(editors.ed8) : otherEditors.push(editors.ed8)

    // Sort both arrays alphabetically by surname

    return (
        <Layout title="About us">
            <header>
                <h1 className="main-heading" itemProp="headline">{parse(page.title)}</h1>
            </header>
            <article className="default-page">
                    {parse(page.content)}
                {chiefs.length > 0 ?
                    <div className="editorial-board">
                        {chiefs.filter((chief) => !!chief.surname && !!chief.givenName && !!chief.university && !!chief.title ? true : false).map(chief => {
                            return (
                                <Bio editor={chief} key={chief.givenName + chief.surname}/>
                            )
                        })}
                    </div>
                    :
                    null
                }
                <div className="editorial-board">
                    {otherEditors.filter((editor) => !!editor.surname && !!editor.givenName && !!editor.university && !!editor.title ? true : false).map(editor => {
                        return (
                            <Bio editor={editor} key={editor.givenName + editor.surname} />
                        )
                    })}
                </div>
            </article>
        </Layout>
    )
}

export default AboutPage

export const aboutQuery = graphql`
query AboutPage(
    $id: String!
  ) {
    page: wpPage(id: { eq: $id }) {
        id
        title
        content
        editorialBoard {
            ed1 {
                headshot {
                    staticFile {
                      publicURL
                    }
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed2 {
                headshot {
                    staticFile {
                      publicURL
                    }
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed3 {
                headshot {
                    staticFile {
                      publicURL
                    }
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed4 {
                headshot {
                    staticFile {
                      publicURL
                    }
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed5 {
                headshot {
                    staticFile {
                      publicURL
                    }
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed6 {
                headshot {
                    staticFile {
                      publicURL
                    }
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed7 {
                headshot {
                    staticFile {
                      publicURL
                    }
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed8 {
                headshot {
                    staticFile {
                      publicURL
                    }
                }
                givenName
                surname
                university
                title
                isChief
            }
        }
    }
}
`
