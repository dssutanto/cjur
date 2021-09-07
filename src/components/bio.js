import React from "react"
import parse from "html-react-parser"
// import { useStaticQuery, graphql } from "gatsby"

const Bio = ({ editor }) => {
  return (
    <div className="editor">
      <div className="img-cropper"><img src={editor.headshot.mediaItemUrl} alt="headshot" className="headshot" /></div>
      <div className="editor-details">
        <span className="editor-name">{parse(editor.givenName) + ' ' + parse(editor.surname)}</span>
        <span className="editor-title">{editor.title.join(", ")} | {editor.university}</span>
      </div>
    </div>
  )
}

export default Bio
