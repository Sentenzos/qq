import React, {useEffect} from 'react'
import {NavLink} from "react-router-dom"
import {connect} from "react-redux";
import profileImg from "../../assets/navImg/profile.png";
import usersImg from "../../assets/navImg/users.png";
import dialogsImg from "../../assets/navImg/dialogs.png";
import newsImg from "../../assets/navImg/news.png";
import "./Navbar.css"
import {resetPaginatorPortion, setPageNumber} from "../../redux/reducers/usersReducer";
import {compose} from "redux";
import {withRouter} from 'react-router-dom';
import {setError} from "../../redux/reducers/appReducer";


const Navbar = (props) => {

  const profileLink = props.userId ? `/profile/${props.userId}` : `/login`;
  const dialogsLength = props.dialogs.length;

  const resetSearchMode = () => {
    if(props.mode === "search") {
      props.resetPaginatorPortion();
      props.setPageNumber(1);
    }
  };

  const warning = () => {
    if (dialogsLength) return;
    props.setError(true, "У Вас нет начатых чатов.");
  };


  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-list__item navbar-list__item-profile">
          <NavLink className="navbar-list__item-link" to={profileLink}>
            <img className="navbar-list__item-profile-img" src={profileImg}/>
            <span className="navbar-list__item-profile-word">Profile</span>
          </NavLink>
        </li>
        <li className="navbar-list__item navbar-list__item-dialogs" onClick={warning}>
          <NavLink className="navbar-list__item-link" to={dialogsLength ? "/dialogs" : profileLink}>
            <img className="navbar-list__item-dialogs-img" src={dialogsImg}/>
            <span className="navbar-list__item-dialogs-word">Dialogs</span>
          </NavLink>
        </li>
        <li className="navbar-list__item navbar-list__item-users" onMouseDown={resetSearchMode}>
          <NavLink className="navbar-list__item-link" to={`/users/all/${props.pageNumber}`}>
            <img className="navbar-list__item-users-img" src={usersImg}/>
            <span className="navbar-list__item-users-word">Users</span>
          </NavLink>
        </li>
        <li className="navbar-list__item navbar-list__item-news">
          <NavLink className="navbar-list__item-link" to={"/news"}>
            <img className="navbar-list__item-news-img" src={newsImg}/>
            <span className="navbar-list__item-news-word">News</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
};

const mapSTP = (state) => ({
  userId: state.auth.id,
  pageNumber: state.usersPage.pageNumber,
  mode: state.usersPage.displayMode,
  dialogs: state.dialogsPage.dialogs,
});

export default compose(
  connect(mapSTP, {
    resetPaginatorPortion,
    setPageNumber,
    setError
  })
)(Navbar);

