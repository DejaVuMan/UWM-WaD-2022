import React from "react";
import { useDispatch, useSelector} from "react-redux";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {logoutUser} from "../services/index";
import {
    faCalendar,
    faPlusSquare,
    faSignInAlt,
    faSignOutAlt,
    faTasks,
    faUserPlus,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../assets/css/Style.css';
const NavigationBar = () => {

    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutUser())
    }

    const guestLinks = (
        <>
            <div className={"mr-auto"}></div>
            <Nav className={"navbar-right"}>
                <Link to={"login"} className="nav-link" style={{color: "white"}}><FontAwesomeIcon icon={faSignInAlt}/> Zaloguj się!</Link>
            </Nav>
        </>
    );

    const userLinks = (
        <>
            <Nav className={"mr-auto"}>
                <Link to={"/add"} style={{color: "white"}} className="nav-link"><FontAwesomeIcon icon={faPlusSquare}/> Dodaj Psa</Link>
                <Link to={"list"} style={{color: "white"}} className="nav-link"><FontAwesomeIcon icon={faTasks}/> Lista Psów</Link>
                <Link to={"users"} style={{color: "white"}} className="nav-link"><FontAwesomeIcon icon={faUsers}/> Lista Właścicielów</Link>
            </Nav>
            <Nav className={"navbar-right"}>
                <Link to={"register"} style={{color: "white"}} className="nav-link"><FontAwesomeIcon icon={faUserPlus}/> Zarejestruj użytkownika!</Link>
                <Link to={"logout"} style={{color: "white"}} className="nav-link" onClick={logout}><FontAwesomeIcon icon={faSignOutAlt}/> Wyloguj się!</Link>
            </Nav>
        </>
    );

    return (
        <div>
            <Navbar bg="info" style={{opacity:"0.8"}} variant="dark">
                <Link to={auth.isLoggedIn ? "home" : ""} className="navbar-brand text-white">
                    <FontAwesomeIcon icon={faCalendar}/> Walk-A-Dog
                </Link>
                {auth.isLoggedIn ? userLinks : guestLinks}
            </Navbar>
        </div>
    );
}

export default NavigationBar;
