import React, { useState } from "react"
import { Link } from "react-router-dom";

function SideBar(props){
    const [activeArray, setActiveArray] = useState(["active","","","","",""])

    function setActive(target) {
        let arr = ["","","","","",""];
        arr[target] = "active";
        setActiveArray(arr);

    }

    return(
        <nav id="sidebar">

            <div id="dismiss">
                <i className="fas fa-arrow-left"></i>
            </div>

            <div className="sidebar-header">
            </div>

            <ul className="list-unstyled components rout-links" onClick={()=>(
                document.documentElement.scrollTop = 0
            )}>            
                <li className={`nav-item nav-link ${activeArray[0]}`} onClick={()=>{
                    setActive(0);
                    return props.onClick("/backend/random")
                }}>
                    <Link to="/">Random</Link>
                </li>

                <li className={`nav-item nav-link ${activeArray[1]}`} onClick={()=>{
                    setActive(1);
                    return props.onClick("/backend/novo")
                }}>
                    <Link to="/">Najnovije</Link>
                </li>

                <li className={`nav-item nav-link ${activeArray[2]}`} onClick={()=>{
                    setActive(2);
                    return props.onClick("/backend/odobravanja")
                }}>
                    <Link to="/">Odovravanja</Link>
                </li>

                <li className={`nav-item nav-link ${activeArray[3]}`} onClick={()=>{
                    setActive(3);
                    return props.onClick("/backend/osude")
                }}>
                    <Link to="/">Osude</Link>
                </li>
            </ul>
            <ul className="list-unstyled components rout-links">
                <li className={`nav-item nav-link ${activeArray[4]}`} onClick={()=>{
                    setActive(4);
                }}>
                    <Link to="/login">Login</Link>
                </li>
                <li className={`nav-item nav-link ${activeArray[5]}`} onClick={()=>{
                    setActive(5);
                }}>
                    <Link to="/register">Register</Link>
                </li>
            </ul>
    </nav>
    );
}

export default SideBar;