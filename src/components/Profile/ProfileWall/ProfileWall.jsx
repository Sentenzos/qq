import React from 'react';
import Message from "./Message";
import ChatField from "./ChatField";
import {CSSTransition} from "react-transition-group";


const ProfileWall = React.memo((props) => {

  return (
    <div className="profile-wall">
      {
        props.ownerId && <ChatField
          sendNewMessage={props.sendNewMessage}
        />
      }
      <div className="profile-wall__messages">
        {
          props.wallMessages.length ?

          props.wallMessages.map((message, i) => {
          return <Message
            id={message.id}
            name={message.name}
            date={message.date}
            likes={message.likes}
            myLike={message.myLike}
            messageText={message.message}
            userAvatar={message.avatar}
            key={message.id}
            animationState={message.animationState}
            likesControl={props.likesControl}
            ownerId={props.ownerId}
            stopAnimation={props.stopAnimation}
            deleteMessage={props.deleteMessage}
          />;
        })
            :
            <CSSTransition classNames="message-stub"
                           in={true}
                           appear={true}
                           timeout={700}
            >
              <div className="message-stub" >
                You don't have notes yet.
              </div>
            </CSSTransition>
        }
      </div>
    </div>
  )
});

export default ProfileWall;