import React from 'react'
import parse from "html-react-parser"

const PaginatedSpecials = ({ specials }) => {
    return (
        <div className="display-case">
            {specials.map(special => (
                <a href={special.mediaItemUrl}>
                    <div className="issue-display">
                        <div className="image-wrapper">
                            {/* <img src={special.specialIssue.cover.mediaItemUrl} alt="" /> */}
                        </div>
                        <section>
                            <h3>{parse(special.caption)}</h3>
                            <h4>{parse(special.specialIssue.date)}</h4>
                        </section>
                    </div>
                </a>
            ))}
        </div>
    )
}

export default PaginatedSpecials
