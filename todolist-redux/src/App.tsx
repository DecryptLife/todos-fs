import "./App.css";
import LandingPage from "./components/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/home" element={<TodoList />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
