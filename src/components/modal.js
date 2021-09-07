// import React from "react"

const Modal = ({ children, showModal }) => {
    if (showModal) {
        return children
    } else {
        return null
    }
}

export default Modal
