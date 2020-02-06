import React, {useEffect, useMemo, useRef} from "react";
import getDate from "../../../common/JS/getDate";
import cn from "classnames";
import {NavLink} from "react-router-dom";
import DeleteMessageBtn from "../../../common/components/DeleteMessageBtn";
import linkParser from "../../../common/JS/linkParser";
import replaceHtmlSymbols from "../../../common/JS/replaceHtmlSymbols";


const Message = React.memo(
  (props) => {
    const avatarLink = props.senderId === props.myId ? props.myAvatar : props.contactAvatar;
    const avatarElem = useRef(null);
    const deleteMessageBtn = <DeleteMessageBtn
      className="message__delete-btn"
      disabled={props.deletingMessages.find(id => id === props.messageId)}
      eventHandler={() => props.deleteMessage(props.messageId)}/>;

    //Когда сервер получает текст он превращает все символы (скобки, пробелы) в html коды.
    //Необходимо преобразование обратно в символы для корректной работы.
    const messageText = useMemo(() => {
      return linkParser(
        replaceHtmlSymbols(props.messageText),
        {width: 410, height: 230.625});
    }, [props.messageText]);

    useEffect(() => {
      if (!avatarLink) return;
      if (!avatarElem.current) return;
      avatarElem.current.style.backgroundImage = `url(${avatarLink})`
    });

    //задержка между сообщениями составляет больше минуты и разные отправители
    if (!props.messageDelay || props.messageDelay > 60e3 || props.senderId !== props.prevSenderId) {
      return (
        <div className={cn("message-wrapper", !props.viewed && "message-is-unread")}>
          {deleteMessageBtn}
          <div className="message">
            <NavLink to={`/profile/${props.senderId}`}>
              <div className="message__avatar" ref={avatarElem}/>
            </NavLink>
            <div className="message__body">
              <div className="message__info">
                <h1 className="message__from">{props.senderName}</h1>
                <time className="message__time">{getDate(props.messageDate).getTime}</time>
                <span className="message__date">{getDate(props.messageDate).getFullDate}</span>
              </div>
              <p className="message__text" dangerouslySetInnerHTML={{__html: messageText}}/>
            </div>
          </div>
        </div>
      )
    } else if (props.messageDelay < 60e3) {
      return (
        <div className={cn("additional-text__wrapper", !props.viewed && "message-is-unread")}>
          {deleteMessageBtn}
          <p className="messages__additional-text" dangerouslySetInnerHTML={{__html: messageText}}/>
        </div>
      )
    }
  }
);


export default Message;