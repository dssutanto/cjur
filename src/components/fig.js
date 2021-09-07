import React, { useState } from "react"
import Modal from "./modal"
import parse from "html-react-parser"

const Fig = ({ figure, type }) => {

    const [showModal, setShowModal] = useState(false)
    const openModal = () => setShowModal(prev => !prev)

    return (
        <div className="fig-container">
            <figure>
                {type === "table" ?
                    <a href={"#" + figure.title} onClick={openModal} className="show-table">
                        {/* <img src={domtoimage.toPng(domTable)} alt={table.title} /> */}
                        Show table
                    </a>
                    :
                    <a href={"#" + figure.altText} onClick={openModal}>
                        <img src={figure.mediaItemUrl} alt={figure.altText} />
                    </a>
                }
                <figcaption>
                    <strong className="figcaption-leader">
                        {type === "table" ?
                            parse(figure.title)
                            :
                            parse(figure.altText)
                        }
                    </strong> &nbsp;
                    {parse(figure.caption)}
                </figcaption>
            </figure>
            <Modal showModal={showModal}>
                <div className="fig-modal">
                    <div className="fig-modal-container">
                        <div className="fig-modal-img-container">
                            {type === "table" ?
                                parse(figure.table)
                                /* <img src={domtoimage.toPng(domTable)} alt={table.title} /> */
                                :
                                <img src={figure.mediaItemUrl} alt={figure.altText} />
                            }
                        </div>
                        <div className="fig-modal-caption">
                            <div className="fig-modal-caption-wrapper">
                                <span className="fig-modal-caption-title">
                                    {type === "table" ?
                                        parse(figure.title)
                                        :
                                        parse(figure.altText)
                                    }
                                </span>
                                <br />
                                <section className="fig-modal-caption-text">{parse(figure.caption)}</section>
                            </div>
                            <button onClick={() => setShowModal(prev => !prev)}>Close</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Fig