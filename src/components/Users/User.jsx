import React, {useEffect, useMemo, useRef} from "react";
import {NavLink} from "react-router-dom";
import cn from "classnames";
import {shortenUserName} from "./Users.js";


const User = React.memo((props) => {

  const {
    photos: {large}, id, name, followed,
    requestSubscribe, requestUnsubscribe,
    isSubscribing, myId
  } = props;

  let userAvatar = useRef(null);

  useEffect(() => {
    if (!large) return;
    userAvatar.current.style.backgroundImage = `url(${large})`
  }, []);

  let userName = useMemo(() => shortenUserName(name), [name]);
  let disableButton = isSubscribing.find(id => id === props.id) ||
    (id === myId) || !myId;

  return (
    <div className="users-list__user">
      <NavLink to={`/profile/${id}`}>
        <div className="users-list__user-avatar" ref={userAvatar}/>
      </NavLink>
      <div className="users-list__user-name">{userName}</div>

      <label
        className={cn((followed ? "users-list__unsubscribe-wrapper" : "users-list__subscribe-wrapper"), disableButton && "is-subscribing")}>
        {followed ? "Unsubscribe" : "Subscribe"}
        <button className="users-list__unsubscribe"
                disabled={disableButton}
                onClick={followed ? () => requestUnsubscribe(props.id) : () => requestSubscribe(props.id)}
        />
      </label>

    </div>
  )
});

export default User