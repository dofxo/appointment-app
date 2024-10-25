const setToken = (userId: string) => {
  localStorage.setItem("token", userId);
  console.log(userId);
};

export default setToken;
