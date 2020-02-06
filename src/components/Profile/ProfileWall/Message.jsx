import transparentHeartImg from "../../../assets/img/transparentHeart.gif";
import redHeartImg from "../../../assets/img/redHeart.gif";
import getDate from "../../../common/JS/getDate";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";
import DeleteMessageBtn from "../../../common/components/DeleteMessageBtn";
import linkParser from "../../../common/JS/linkParser";


const Message = React.memo((props) => {

  const {name, likes, date, myLike, messageText, userAvatar, id, setMyLike, isLastMessage} = props;
  const messageAvatar = useRef(null);

  useEffect(() => {
    if (!userAvatar) return;
    messageAvatar.current.style.backgroundImage = `url(${userAvatar})`;
  }, [userAvatar, messageAvatar.current]);

  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(props.animationState);
  }, [props.animationState]);


  let text = useMemo(() => {
    return linkParser(messageText, {width: 430, height: 241.875})
  }, [messageText]);


  return (
    <>
      <CSSTransition
        classNames="profile-wall__message"
        timeout={1000}
        in={animation}
        onEntered={() => props.stopAnimation(id)}
      >
        <div className="profile-wall__message">
          <div className="message">
            <DeleteMessageBtn disabled={false}
                              eventHandler={() => props.deleteMessage(id)}
                              className="message__delete-btn"
            />
            <div className="message__avatar" ref={messageAvatar}>
            </div>
            <div className="message__body">
              <div className="message__info">
                <h1 className="message__from">{name}</h1>
                <time className="message__time">{getDate(date).getTime}</time>
                <span className="message__date">{getDate(date).getFullDate}</span>
              </div>
              <p className="message__text" dangerouslySetInnerHTML={{__html: text}}>
              </p>
            </div>
          </div>
          <div className="interaction-panel-wrapper">
            <div className="interaction-panel">
              <label
                className="interaction-panel__heart-wrapper">
                <img className="interaction-panel__heart-img" alt="i like it"
                     src={myLike ? redHeartImg : transparentHeartImg}/>
                <button className="interaction-panel__heart" onClick={props.ownerId ? () => {
                  props.likesControl(id)
                } : () => {
                }}/>
              </label>
              <div className="interaction-panel__likes">{likes || ""}</div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  )
});


export default Message;