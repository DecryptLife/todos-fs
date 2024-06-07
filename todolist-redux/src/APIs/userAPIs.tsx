const baseURL = "http://localhost:8000/auth";

interface IUser {
  username: string;
  password: string;
}

export const registerUser = (user: IUser) => {
  console.log("In register API");
  return fetch(baseURL + `/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const loginUser = (user: IUser) => {
  return fetch(baseURL + `/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
};
