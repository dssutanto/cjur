import React from "react"
import Sidebar from "./sidebar"

const ResponsiveMenu = ({ showMenu, setShowMenu, coverUrl, title, citation, date, pdfUrl, ref, figs }) => {
    return (
        <>
        {
            showMenu ?
        <div className="fig-modal">
            <div className="fig-modal-container">
                <div className="fig-modal-img-container">
                    <img src={coverUrl} alt="" />
                </div>
                <div className="fig-modal-caption">
                    <span className="fig-modal-caption-title">{title}</span>
                    <p className="fig-modal-caption-text">{citation}</p>
                    <button onClick={() => setShowMenu(prev=>!prev)}>Close</button>
                </div>
            </div>
        </div>
        :
            template === article ? 
            <div>
                <Sidebar>

                </Sidebar>
            </div>
            :
            <div>

            </div>
        }
        </>
    )
}

export default ResponsiveMenu
