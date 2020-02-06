import React, {useState, useEffect, useRef} from 'react'
import styles from './Header.css';
import {NavLink, Redirect} from 'react-router-dom';


const Header = React.memo(
  (props) => {

    const profileLink = props.userId ? `/profile/${props.userId}` : `/login`;

    const logOut = async () => {
      await props.logout();
      props.history.push("/login");
    };

    return (
      <header className="header">
        <NavLink to={profileLink}><div className="siteLogo">NEK</div></NavLink>
        { props.isAuth ? <div onClick={logOut} className="exitButton">Log Out</div> :
          <div onClick={() => props.history.push("/login")} onMouseDown={(e)=>e.preventDefault()} className="exitButton">Log In</div>
        }
      </header>
    )
  }
);

export default Header


