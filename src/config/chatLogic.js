export function getSender(userLogged, users) {
  return userLogged._id === users[0]._id ? users[1].name : users[0].name;
}

export function getSenderFull(userLogged, users) {
  return userLogged._id === users[0]._id ? users[1] : users[0];
}

export function isSameSender(messages, message, index, userLogged) {
  return messages[index - 1]?.sender._id === message.sender._id;
}

export function isLastMessage(messages, message, index, userLogged) {
  return (
    message.sender._id !== userLogged._id &&
    (messages[index + 1]?.sender._id === userLogged._id || !messages[index + 1])
  );
}
