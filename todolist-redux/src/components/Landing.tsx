import { useState } from "react";
import "./landing.css";
import { loginUser, registerUser } from "../APIs/userAPIs";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  interface IUser {
    username: string;
    password: string;
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = {
        username,
        password,
      };

      const response = await loginUser(user);
      console.log(response);

      if (response.status === 200) {
        navigate("/home");
      } else {
        console.log("check flow");
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  };
  return (
    <div>
      <div>
        <h1>Login</h1>
      </div>
      <div>
        <label htmlFor="">Username:</label>
        <input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="">Password:</label>
        <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const user = {
        username,
        password,
      };

      const response = await registerUser(user);
    } catch (e) {
      console.log("Error: ", e);
    }
  };
  return (
    <div>
      <div>
        <h1>Register</h1>
      </div>
      <div>
        <label htmlFor="">Username:</label>
        <input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="">Password:</label>
        <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="landing-container">
      <LoginPage />
      <RegisterPage />
    </div>
  );
};

export default LandingPage;
