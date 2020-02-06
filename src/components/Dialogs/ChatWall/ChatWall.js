export const unifyMessages = (messagesArr) => {

  let messages = messagesArr.map(m => ({...m}));

  for (let i = messages.length - 1; i > 0; i--) {
    let messageDate = new Date(messages[i].addedAt);
    let prevMessageDate = new Date(messages[i - 1].addedAt);
    let messageDelay = messageDate - prevMessageDate;
    let senderId = messages[i].senderId;
    let prevSenderId = messages[i - 1].senderId;
    let idIsEqual = senderId === prevSenderId;

    if ((messageDelay < 60e3) && idIsEqual) {
      messages[i - 1].relatedMessages = [messages[i].body];
      if (messages[i].relatedMessages) {
        messages[i - 1].relatedMessages = [...messages[i - 1].relatedMessages, ...messages[i].relatedMessages]
      }
      messages.splice(i, 1);
    }
  }

  return messages
};