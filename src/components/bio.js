import React from "react"
import parse from "html-react-parser"
import { useStaticQuery, graphql } from "gatsby"

const Bio = ({ editor }) => {
  return (
    <div className="editor">
      <div className="img-cropper"><img src={editor.headshot.mediaItemUrl} alt="headshot" className="headshot" /></div>
      <div className="editor-details">
        <span className="editor-name">{editor.givenName + ' ' + editor.surname}</span>
        {editor.title.map(title => {
          return (
            <span className="editor-title">{parse(title)}</span>
          )
        })}
        <span className="editor-spec">{editor.specialization}</span>
      </div>
    </div>
  )
}

export default Bio
