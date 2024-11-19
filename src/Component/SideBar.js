import React from "react";
import { Link } from "react-router-dom";

export default function SideBar(){
    return <>
    <div className="sidebar">
        <div className="logo">
            <div className="logo-img">
                <img className="img" src="https://as1.ftcdn.net/v2/jpg/08/22/28/66/1000_F_822286634_JqfHuMV7aEWpjIP3x23GPwzz2Blcd5Wg.jpg" />
                <span>Super Admin</span>
            </div>
        </div>
        <div className="content">
            <ul className="menu">
                <li className="menu-item">
                    <Link className="Link" to={'/dashboard'}>
                   <span><i class="fa fa-home" aria-hidden="true"></i></span> Home
                   </Link>
                </li>  
                <li className="menu-item">
                    <Link className="Link" to={'/employee-list'}>
                <span><i class="fa-solid fa-user-tie"></i></span>
                    Employee List
                    </Link>
                </li>                
                <li className="menu-item">
                    <Link className="Link" to={'/client-list'}>
                <span><i class="fa-solid fa-users-rectangle"></i></span>
                    Client Details
                    </Link>
                </li>
                <li className="menu-item">
                    <Link className="Link" to={'/template-admins'}>
                <span><i class="fa-solid fa-user-pen"></i></span>
                    Template Admin
                    </Link>
                </li>
                <li className="menu-item">
                <Link className="Link" to={'/hosted-list'}>
                <span><i class="fa-solid fa-globe"></i></span>
                    Hosted Sites
                    </Link>
                </li> 
                 <li className="menu-item">
                 <Link className="Link" to={'/approvals'}>
                <span><i class="fa-solid fa-folder"></i></span>
                    Template Approvals
                    </Link>
                </li>
            </ul>
        </div>
    </div>
    
   
   
    
    </>
}
