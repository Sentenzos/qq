export const shortenUserName = (name) => {
  let userName = name;
  if (userName.length <= 15) return userName;
  userName = userName.split(' ');
  if (userName[0].length <= 15) return userName[0] + "...";
  return userName[0].slice(0, 16) + "...";
};

