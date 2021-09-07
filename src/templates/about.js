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
    editors.ed9.isChief ? chiefs.push(editors.ed9) : otherEditors.push(editors.ed9)
    editors.ed10.isChief ? chiefs.push(editors.ed10) : otherEditors.push(editors.ed10)
    editors.ed11.isChief ? chiefs.push(editors.ed11) : otherEditors.push(editors.ed11)
    editors.ed12.isChief ? chiefs.push(editors.ed12) : otherEditors.push(editors.ed12)
    editors.ed13.isChief ? chiefs.push(editors.ed13) : otherEditors.push(editors.ed13)
    editors.ed14.isChief ? chiefs.push(editors.ed14) : otherEditors.push(editors.ed14)
    editors.ed15.isChief ? chiefs.push(editors.ed15) : otherEditors.push(editors.ed15)
    editors.ed16.isChief ? chiefs.push(editors.ed16) : otherEditors.push(editors.ed16)
    editors.ed17.isChief ? chiefs.push(editors.ed17) : otherEditors.push(editors.ed17)
    editors.ed18.isChief ? chiefs.push(editors.ed18) : otherEditors.push(editors.ed18)
    editors.ed19.isChief ? chiefs.push(editors.ed19) : otherEditors.push(editors.ed19)
    editors.ed20.isChief ? chiefs.push(editors.ed20) : otherEditors.push(editors.ed20)

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
                    mediaItemUrl
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed2 {
                headshot {
                    mediaItemUrl
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed3 {
                headshot {
                    mediaItemUrl
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed4 {
                headshot {
                    mediaItemUrl
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed5 {
                headshot {
                    mediaItemUrl
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed6 {
                headshot {
                    mediaItemUrl
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed7 {
                headshot {
                    mediaItemUrl
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed8 {
                headshot {
                    mediaItemUrl
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed9 {
                headshot {
                    mediaItemUrl
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed10 {
                headshot {
                    mediaItemUrl
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed11 {
                headshot {
                    mediaItemUrl
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed12 {
                headshot {
                    mediaItemUrl
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed13 {
                headshot {
                    mediaItemUrl
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed14 {
                headshot {
                    mediaItemUrl
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed15 {
                headshot {
                    mediaItemUrl
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed16 {
                headshot {
                    mediaItemUrl
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed17 {
                headshot {
                    mediaItemUrl
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed18 {
                headshot {
                    mediaItemUrl
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed19 {
                headshot {
                    mediaItemUrl
                }
                givenName
                surname
                university
                title
                isChief
            }
            ed20 {
                headshot {
                    mediaItemUrl
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
