import React from "react"
// import styles from "./tabs.module.css"
import { useState } from "react"

const Sidebar = ({ children }) => {

    const [activeTab, setActiveTab] = useState(children[0].props.label);

    const handleClick = (e, newActive) => {
        e.preventDefault();
        setActiveTab(newActive);
    }

    return (
        <div className="tabs-component">
            <ul className="tabs">
                {children.map((tab) => {
                    return (
                        <li
                            key={tab.props.label}
                            className={tab.props.label === activeTab ? "active" : ""}
                        >
                            <a
                                href={"#" + tab.props.label}
                                onClick={(e) => { handleClick(e, tab.props.label) }}
                            >
                                {tab.props.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
            {children.map((content) => {
                if (content.props.label === activeTab)
                    return (
                        <div
                            key={content.props.label}
                            className="metadata"
                        >
                            {content.props.children}
                        </div>
                    );
                }
            )}
        </div>
    )
}

export default Sidebar
