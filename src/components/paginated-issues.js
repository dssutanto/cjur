import React from 'react'
import parse from "html-react-parser"

const PaginatedIssues = ({ issues }) => {
    return (
        <div className="display-case">
            {issues.map(issue => (
                <a href={issue.uri}>
                    <div className="issue-display">
                        <div className="image-wrapper">
                            <img src={issue.issue.cover.mediaItemUrl} alt="" className="cover" />
                        </div>
                        <section>
                            <h4>{parse(issue.title)}</h4>
                            <h5>{parse(issue.issue.released)}</h5>
                        </section>
                    </div>
                </a>
            ))}
        </div>
    )
}

export default PaginatedIssues
