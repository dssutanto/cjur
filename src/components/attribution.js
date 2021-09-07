import React from "react"
import { indexOf } from "lodash"
import parse from "html-react-parser"

const Attribution = ({ authorData, authorsOnly }) => {

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

    var affiliations = []
    authors.forEach((author) => {
        if (author.surnameFirst) author.fullName = author.surname + " " + author.givenName
        else author.fullName = author.givenName + " " + author.surname
        if (typeof (author.affiliation) === "string") author.affiliation = author.affiliation.split(/\r\n/)
        author.affiliation.forEach((affiliation) => {
            if (affiliations.indexOf(affiliation) === -1) affiliations.push(affiliation)
        })
    })

    return (
        authorsOnly ?
        <div>
            <div className="authors">
            {authors.map((author) =>
                    parse(author.fullName)
                ).join(", ")}
            </div>
        </div>
        :
        <div>
            <div className="authors">
                {authors.map((author) =>
                    parse(author.fullName) + " " + author.affiliation.map((affiliation) =>
                        parseInt(indexOf(affiliations, affiliation) + 1)
                    ).join(" ")
                ).join(", ")}
            </div>
            <div className="affiliations">
                {affiliations.map((affiliation) => parseInt(indexOf(affiliations, affiliation) + 1) + " " + affiliation).join(", ")}
            </div>
        </div>
    )
}

export default Attribution
