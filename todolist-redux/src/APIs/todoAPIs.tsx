const baseURL = "http://localhost:8000/todos";

interface ITodo {
  id?: string;
  content: string;
}

export const getTodos = () => {
  return fetch(baseURL, {
    credentials: "include",
  }).then((res) => res.json());
};

export const getTodo = (id: ITodo["id"]) => {
  console.log(baseURL + `/${id}`);
  return fetch(baseURL + `/${id}`).then((res) => res.json());
};
export const createTodo = (newTodo: ITodo) => {
  console.log("In API method");
  return fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(newTodo),
  }).then((res) => res.json());
};

export const updateTodo = (id: ITodo["id"], partialTodo: ITodo["content"]) => {
  console.log("In API Call: ", id, partialTodo);
  return fetch(baseURL + `/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ content: partialTodo }),
  }).then((res) => res.json());
};

export const deleteTodo = (id: ITodo["id"]) => {
  console.log("id", id);
  return fetch(`${baseURL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  }).then((res) => res.json());
};
