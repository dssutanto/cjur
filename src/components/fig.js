import React/*, { useState }*/ from "react"
// import Modal from "./modal"
import parse from "html-react-parser"

const Fig = ({ figure }) => {

    // const [showModal, setShowModal] = useState(false)
    // const openModal = () => setShowModal(prev => !prev)

    return (
        <div className="fig-container">
            <figure>
                <div>
                    {parse(figure.table)}
                </div>
                <figcaption>
                    <strong className="figcaption-leader">
                        {parse(figure.title)}
                    </strong> &nbsp;
                    {parse(figure.caption)}
                </figcaption>
            </figure>
            {/* <Modal showModal={showModal}>
                <div className="fig-modal">
                    <div className="fig-modal-container">
                        <div className="fig-modal-img-container">
                            {parse(figure.table)}
                        </div>
                        <div className="fig-modal-caption">
                            <div className="fig-modal-caption-wrapper">
                                <span className="fig-modal-caption-title">
                                    parse(figure.title)
                                </span>
                                <br />
                                <section className="fig-modal-caption-text">{parse(figure.caption)}</section>
                            </div>
                            <button onClick={() => setShowModal(prev => !prev)}>Close</button>
                        </div>
                    </div>
                </div>
            </Modal> */}
        </div>
    )
}

export default Fig