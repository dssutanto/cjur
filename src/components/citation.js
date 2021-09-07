import React from "react"
import { indexOf } from "lodash"
import parse from "html-react-parser"

const Citation = ({ authorData, issuePage, title, pageStart, pageEnd }) => {

    var authors = []
    if (!!authorData.author1.givenName && !!authorData.author1.surname) authors.push(authorData.author1)
    if (!!authorData.author2.givenName && !!authorData.author2.surname) authors.push(authorData.author2)
    if (!!authorData.author3.givenName && !!authorData.author3.surname) authors.push(authorData.author3)
    if (!!authorData.author4.givenName && !!authorData.author4.surname) authors.push(authorData.author4)
    if (!!authorData.author5.givenName && !!authorData.author5.surname) authors.push(authorData.author5)
    if (!!authorData.author6.givenName && !!authorData.author6.surname) authors.push(authorData.author6)
    if (!!authorData.author7.givenName && !!authorData.author7.surname) authors.push(authorData.author7)
    if (!!authorData.author8.givenName && !!authorData.author8.surname) authors.push(authorData.author8)
    if (!!authorData.author9.givenName && !!authorData.author9.surname) authors.push(authorData.author9)
    if (!!authorData.author10.givenName && !!authorData.author10.surname) authors.push(authorData.author10)

    var citation = null

    if (authors.length <= 3 ) {
        citation = authors.map((author) =>
            author.surname + ", " + author.givenName.substring(0, 1) + "."
        ).join(", ") + issuePage.issue.released.substring(0, 4) + title + "CJUR" + issuePage.issue.volumeNo + "(" + issuePage.issue.issueNo + ")" + pageStart + "-" + pageEnd + "."
    } else {
        citation = authors[0].surname + ", " + authors[0].givenName.substring(0, 1) + ". et al. " + issuePage.issue.released.substring(0, 4) + title + "CJUR" + volume + "(" + issue + ")" + pageStart + "-" + pageEnd + "."
    }

    return (
        citation
    )
}

export default Citation
