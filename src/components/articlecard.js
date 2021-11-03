import React, { useState } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import Attribution from "../components/attribution"

const ArticleCard = ({ uri, title, authorData, pdf, abstract, citation, date, authorsOnly }) => {

    var pubDate = null
    !!date && (pubDate = new Date(
        parseInt(date.substring(0, 4)),
        parseInt(date.substring(4, 6)),
        parseInt(date.substring(6, 8)))
    )

    const [showModal, setShowModal] = useState(false)
    const openModal = () => setShowModal(prev => !prev)

    const [popup, showPopup] = useState(false)
    const openPopup = () => showPopup(prev => !prev)

    return (
        <div key={title} className="article-card">
            <h3>
                {!!uri ?
                    <a href={"/article" + uri}>{title}</a>
                    :
                    !!pdf ?
                        <a href={pdf} target="_blank" rel="noreferrer">{title}</a>
                        :
                        title
                }
            </h3>
            {authorData ?
                <Attribution authorData={authorData} authorsOnly={authorsOnly} />
                :
                <div className="authors">CJUR Editorial Board</div>
            }
            <br />
            <div>
                {!!date && (
                    <span className="article-card-button" id="pubDate">{pubDate.toLocaleString('default', { dateStyle: 'long' })}</span>
                )}
                {!!pdf && !!citation && (
                    <span className="article-options">
                        {
                            !!date ?
                                <a className="article-card-button" href={pdf} target="_blank" rel="noreferrer">Download</a>
                                :
                                <a className="article-card-button" href={pdf} target="_blank" rel="noreferrer" style={{ paddingLeft: "0" }}>Download</a>
                        }
                        <button className="article-card-button copy-cite" onClick={() => {
                            navigator.clipboard.writeText(renderToStaticMarkup(citation).replace("<i>", "").replace("</i>", ""))
                            openPopup()
                            setTimeout(() => {
                                openPopup()
                            }, 1500)
                        }}>Copy citation
                            {popup ?
                                <div
                                    style={{
                                        position: "fixed",
                                        padding: "var(--spacing-4)",
                                        backgroundColor: "#74846ccc",
                                        verticalAlign: "top",
                                        color: "white",
                                        top: "25%",
                                        left: "50%",
                                        transform: "translateX(-50%)"
                                    }}
                                >
                                    Copied!
                                </div>
                                :
                                null
                            }
                        </button>
                    </span>
                )}
            </div>
            {!!abstract && (
                showModal ?
                    <div className="abstract-modal-button">
                        <div className="abstract-modal">{abstract}</div>
                        <button className="article-card-button open-abstract-modal" onClick={() => openModal()}>Hide abstract</button>
                    </div>
                    :
                    <div className="abstract-modal-button">
                        <button className="article-card-button open-abstract-modal" onClick={() => openModal()}>Show abstract</button>
                    </div>
            )}
        </div>
    )
}

export default ArticleCard
