import React, {useEffect, useRef} from "react";
import styles from '../Dialogs.css';
import Contact from "./Contact";
import scrollTo from "../../../common/JS/scrollTo";


const ContactsList = React.memo(
  (props) => {

    const dateNow = Date.now() + (new Date().getTimezoneOffset() * 60e3);

    //при первой отрисовке отрисовать диалог который велся в последний раз
    useEffect(() => {
      if (props.contactIs) return;
      //Т.к. dialogs могли не успеть прийти с сервера и задиспатчиться
      if (!props.dialogs[0]) return;
      props.getMessagesList(props.dialogs[0].id);
    }, [props.contactIs, props.dialogs, props.getMessagesList]);

    const dialogs = props.dialogs.map(d => {
      return <Contact photos={d.photos}
                      userName={d.userName}
                      newMessagesCount={d.newMessagesCount}
                      key={d.id}
                      userId={d.id}
                      getMessagesList={props.getMessagesList}
                      contactIs={props.contactIs}
                      getDialogs={props.getDialogs}
                      dateNow={dateNow}
                      lastActivityDate={d.lastUserActivityDate}
      />
    });

    return (
      <div className="contactsList" ref={props.forRef}>
        {dialogs}
      </div>
    )
  }
);


export default ContactsList;
