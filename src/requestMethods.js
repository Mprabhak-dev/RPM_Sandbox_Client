import axios from "axios";

// const BASE_URL = "http://localhost:5000/";
// const BASE_URL = "https://rpm-sandbox-server.onrender.com/";
// const BASE_URL = "https://rpmsanboxserver-production.up.railway.app/";
const BASE_URL = "http://18.183.18.175:8080/";

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   header: { token: `Bearer ${TOKEN}` },
// });
