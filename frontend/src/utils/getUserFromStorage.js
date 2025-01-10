export const getUserFromStorage = () => {
  const token = JSON.parse(localStorage.getItem("userInfo") || null);
  //console.log(token);
  return token?.token;
};
