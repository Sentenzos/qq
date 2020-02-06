import React from "react";
import ContentEditable from "react-contenteditable";
import {compose} from "redux";
import withSendMessageHandlers from "../../../HOC/withSendMessageHandlers";
import sendMessageImg from "../../../assets/img/sendMessage.png";
import scrollTo from "../../../common/JS/scrollTo";


// Пришлось использовать классовый компнент, так как при функциональном, ContentEditable не хотел
// обновлять свои пропсы и принимать функцию handleEnterButton со свежими замыканиями.
class ChatField extends React.PureComponent {

  //2 функции ниже прокручивают вверх список контактов после отправки сообщения,
  //чтобы юзер с котором идет диалог был в поле видимости.
  handleMouseClick = () => {
    this.props.sendMessage();
    scrollTo.top.element(this.props.contactsListElem);
  };

  handleEnterButton = (event) => {
    if (event.keyCode !== 13) return;
    if (event.shiftKey) return;
    this.props.handleEnterButton(event);
    scrollTo.top.element(this.props.contactsListElem);
  };

  render = () => {

    return (
      <div className="dialogs-field__chatFrame">
        <label className="dialogs-field__send-button-wrapper">
          <img className="send-button__img" alt={"send message image"} src={sendMessageImg}/>
          <button className="send-button__button"
                  onClick={this.handleMouseClick}
          />
        </label>
        <div className="dialogs-field__chat">
          <ContentEditable html={this.props.state.messageText}
                           disabled={false}
                           tagName={"div"}
                           className={""}
                           placeholder={"Type your message . . ."}
                           onChange={this.props.handleOnChange}
                           onKeyDown={this.handleEnterButton}
          />
        </div>
      </div>
    )
  }
}

export default compose(
  withSendMessageHandlers
)(ChatField);
