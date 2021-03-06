import { API } from "../../backend";
import { cartEmpty } from "../../core/helper/cartHelper";

export const signup = (user) => {
  return fetch(`${API}user/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.error(err));
};

export const signin = (user) => {
  const formData = new FormData();

  for (const name in user) {
    formData.append(name, user[name]);
  }

  return fetch(`${API}user/login/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log("SUCCESS", response);
      return response.json();
    })
    .catch((err) => console.error(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    const formData = new FormData();
    formData.append(
      "email",
      JSON.parse(localStorage.getItem("jwt")).user.email
    );

    return fetch(`${API}user/token/`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.token === JSON.parse(localStorage.getItem("jwt")).token);
        //console.log(data.token);
        if (data.token !== "") {
          return data.token === JSON.parse(localStorage.getItem("jwt")).token;
        } else {
          return false;
        }
      })
      .catch((err) => console.error("error", err));
  } else {
    return false;
  }
};

export const signout = (next) => {
  const userId =
    isAuthenticated() && JSON.parse(localStorage.getItem("jwt")).user.id;
  if (typeof window !== "undefined") {
    cartEmpty(() => {});
    //next();

    return fetch(`${API}user/logout/${userId}`, {
      method: "GET",
    })
      .then((response) => {
        console.log("Signout success");
        localStorage.removeItem("jwt");
        next();
      })
      .catch((err) => console.error(err));
  }
};
