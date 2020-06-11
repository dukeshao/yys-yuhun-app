import React from "react";
import { useHistory } from "react-router-dom";

import "./footer.scss";
function Footer() {
    let history = useHistory();
    function goto(path) {
        if (history.location.pathname === path) {
            return false;
        }
        history.push(path);
    }
    return (
        <div className="footer">
            <ul>
                <li onClick={() => { setTimeout(() => { goto('/home') }, 200) }}>
                    <div></div>
                </li>
                <li>
                    <div></div>
                </li>
                <li>
                    <div></div>
                </li>
                <li>
                    <div></div>
                </li>
            </ul>
        </div>
    )
}

export default Footer;