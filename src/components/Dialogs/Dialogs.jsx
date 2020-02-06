import React, {useRef} from 'react'
import './Dialogs.css'
import ContactsList from "./ContactsList/ContactsList";
import ChatWall from "./ChatWall/СhatWall"

const Dialogs = React.memo((props) => {

  const contactsListElem = useRef(null);

  return (
    <>
      <div className="dialogs-page">
        {
          props.contactIs ? <ChatWall messages={props.messages}
                                      myAvatar={props.myAvatar}
                                      dialogs={props.dialogs}
                                      contactIs={props.contactIs}
                                      myId={props.myId}
                                      sendNewMessage={props.sendMessage}
                                      getMessagesList={props.getMessagesList}
                                      contactsListElem={contactsListElem.current}
                                      deleteMessage={props.deleteMessage}
                                      deletingMessages={props.deletingMessages}
          /> : null
        }

        <ContactsList dialogs={props.dialogs}
                      getMessagesList={props.getMessagesList}
                      getDialogs={props.getDialogs}
                      contactIs={props.contactIs}
                      forRef={contactsListElem}
        />
      </div>
      <div className="bottom-hider"/>
    </>
  )
});


{/*<div className={styles.mainDialog}>*/
}
{/*  <ContactsList dialogs={props.dialogs}*/
}
{/*               getMessagesList={props.getMessagesList}*/
}
{/*               getDialogs={props.getDialogs}*/
}
{/*               companionIs={props.companionIs}*/
}
{/*  />*/
}
{/*  {props.companionIs ? <ChatWall messages={props.messages}*/
}
{/*                             myAvatar={props.myAvatar}*/
}
{/*                             dialogs={props.dialogs}*/
}
{/*                             companionIs={props.companionIs}*/
}
{/*                             myId={props.myId}*/
}
{/*                             sendMessage={props.sendMessage}*/
}
{/*                             getMessagesList={props.getMessagesList}*/
}
{/*  /> : null}*/
}
{/*</div>*/
}

export default Dialogs