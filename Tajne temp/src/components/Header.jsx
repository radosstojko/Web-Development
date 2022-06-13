import React from "react"
import { Link } from "react-router-dom";
import img from "../icons-menu.png"
import imgPero from "../pero.png"

function Header(){
    return(
        <header className="fixed-top d-flex align-items-center">
            <div className="container d-flex justify-content-start align-items-center">
                <button className="btn btn-outline-dark" id="sidebarCollapse"> <img src={img} /> </button>               
                <h1>Tajne</h1>
            </div>
            <div className="post">
            <Link to="/submit">
                <button className="btn btn-outline-dark"> <img src={imgPero} /> </button>
            </Link>
            </div>
        </header>
    );
}

export default Header;