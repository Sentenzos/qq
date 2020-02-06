import React, {useEffect, useRef, useState} from "react";
import cn from "classnames";
import {NavLink} from "react-router-dom";
import getDate from "../../../common/JS/getDate";
import scrollTo from "../../../common/JS/scrollTo";


const Contact = React.memo(
  (props) => {

    const {
      photos: {small}, userName,
      newMessagesCount, userId, getMessagesList,
      contactIs, getDialogs, lastActivityDate, dateNow
    } = props;
    const avatarElem = useRef(null);
    const onlineStatus = (dateNow - new Date(lastActivityDate)) > (60e3 * 10);
    const lastOnline = new Date(lastActivityDate);

    useEffect(() => {
      if (!small) return;
      avatarElem.current.style.backgroundImage = `url(${small})`;
    }, [small]);

    const handleOnClick = () => {
      getMessagesList(userId);
      getDialogs();
    };

    return (
      <div className={cn("contact", contactIs === userId && "dialog-with")} onClick={handleOnClick}>
        <NavLink to={`/profile/${userId}`}>
          <div className="contact__avatar" ref={avatarElem}>
            <div className="contact__last-online">{`Last online: ${getDate(lastOnline).getFullDate}`}</div>
          </div>
        </NavLink>
        <div className="contact__name">{userName}</div>
        <div className={cn("contact__online-status", onlineStatus ? "contact__online-status--offline"
          : "contact__online-status--online")}>{onlineStatus ? "offline" : "online"}</div>
        {
          newMessagesCount ? <div className="contact__new-messages">{newMessagesCount}</div> : null
        }
      </div>
    )
  }
);


export default Contact;