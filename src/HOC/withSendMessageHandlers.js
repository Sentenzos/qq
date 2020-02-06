import React from "react";


const withSendMessageHandlers = (Component, smth) => {
  return class Wrapper extends React.PureComponent {

    state = {
      messageText: ""
    };

    sendMessage = async () => {
      let messageText = this.state.messageText.replace(/<[^>]+>/g, '');
      if (messageText) {
        await this.props.sendNewMessage(this.state.messageText);
        this.setState({
          messageText: ""
        });
      }
    };

    handleEnterButton = (event) => {
      if (event.keyCode !== 13) return;
      if (event.shiftKey) return;
      this.sendMessage(this.state.messageText);
      event.preventDefault();
    };

    handleOnChange = (e) => {
      this.setState({
        messageText: e.target.value
      });
    };

    render () {

      return (
        <Component state={this.state}
                   sendMessage={this.sendMessage}
                   handleEnterButton={this.handleEnterButton}
                   handleOnChange={this.handleOnChange}
                   {...this.props}
        />
      )
    }
  }
};

export default withSendMessageHandlers;