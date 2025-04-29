const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};

const removeRefreshToken = () => {
  localStorage.removeItem("refreshToken");
};

const setAccessToken = (accessToken: string) => {
  return localStorage.setItem("accessToken", accessToken);
};

const setRefreshToken = (refreshToken: string) => {
  return localStorage.setItem("refreshToken", refreshToken);
};

export {
  getAccessToken,
  getRefreshToken,
  removeRefreshToken,
  removeAccessToken,
  setAccessToken,
  setRefreshToken,
};
