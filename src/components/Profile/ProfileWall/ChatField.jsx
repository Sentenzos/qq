import React from "react";
import ContentEditable from "react-contenteditable";
import sendMessageImg from "../../../assets/img/sendMessage.png";
import {compose} from "redux";
import withSendMessageHandlers from "../../../HOC/withSendMessageHandlers";


class ChatField extends React.PureComponent {

  //методы отправки сообщения берутся из хока
  render = () => {
    return (
      <div className="profile-wall__chat-wrapper">
        <label className="profile-wall__send-button-wrapper">
          <img className="send-button__img" alt={"send message image"} src={sendMessageImg}/>
          <button className="send-button__button"
                  onClick={this.props.sendMessage}
          />
        </label>

        <ContentEditable html={this.props.state.messageText}
                         disabled={false}
                         tagName={"div"}
                         className={"profile-wall__chat-field"}
                         placeholder={"Type your message . . ."}
                         onChange={this.props.handleOnChange}
                         onKeyDown={this.props.handleEnterButton}
        />
      </div>
    )
  }
}

export default compose(
  withSendMessageHandlers
)(ChatField);