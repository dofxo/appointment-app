const setToken = (userId: string | null) => {
  localStorage.setItem("token", userId || "");
};

export default setToken;
