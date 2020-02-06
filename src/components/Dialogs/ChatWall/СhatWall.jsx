import React, {useEffect, useRef} from "react";
import ChatField from "./ChatField";
import Message from "./Message";
import scrollTo from "../../../common/JS/scrollTo";


const ChatWall = React.memo((props) => {

  const messagesField = useRef(null);

  useEffect(() => {
    scrollTo.bottom.document();
  }, [props.messages[0]]);

  const contactAvatar = props.dialogs.find(d => {
    return d.id === props.contactIs ? d : null
  });

  let messages;

  if (!props.messages.length) {

    messages = (
      <div className="message-wrapper">
        <div className="message">
          <div className="message__avatar">
          </div>
          <div className="message__body">
            <div className="message__info">
              <h1 className="message__from">Nobody</h1>
            </div>
            <p className="message__text"> There are no messages yet =(</p>
          </div>
        </div>
      </div>
    )
  } else {

    messages = props.messages.map((m, i) => {
      const messageDate = new Date(m.addedAt);
      let prevMessageDate, messageDelay, prevSenderId;

      if (i) {
        prevMessageDate = new Date(props.messages[i - 1].addedAt);
        messageDelay = messageDate - prevMessageDate;
        prevSenderId = props.messages[i - 1].senderId;
      }

      return (
        <Message
          key={m.id}
          messageId={m.id}
          messageDate={messageDate}
          senderId={m.senderId}
          senderName={m.senderName}
          myId={props.myId}
          myAvatar={props.myAvatar}
          contactAvatar={contactAvatar.photos.small}
          messageText={m.body}
          viewed={m.viewed}
          messageDelay={messageDelay}
          prevSenderId={prevSenderId}
          deleteMessage={props.deleteMessage}
          deletingMessages={props.deletingMessages}
        />
      )
    });
  }

  return (
    <div className="dialogs-field">
      <div className="dialogs-field__messages">
        {messages}
      </div>

      <ChatField sendNewMessage={props.sendNewMessage}
                 contactsListElem={props.contactsListElem}
      />

    </div>
  )
});

let s = 5;

export default ChatWall;
