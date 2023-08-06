

export default function getCustomTokenFromLocalStorage() {
    const customToken =  localStorage.getItem("customToken");
    const decodeCustomToken = customToken && decodeToken(customToken);
    return decodeCustomToken;
  }
  
