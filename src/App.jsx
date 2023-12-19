import { FaMoon } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import bgimgLight from '../public/images/bg-desktop-light.jpg'
import bgimgDark from '../public/images/bg-desktop-dark.jpg'

import './App.css'
import TodoList from "./TodoList.jsx/TodoList";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`container ${darkMode ? "dark": "light"}`}>
      {darkMode ? (<img className="bg-img" src={bgimgDark} alt="" />) : (<img className="bg-img" src={bgimgLight} alt="" />)}
      <main>
        <head>
          <h1>TODO</h1>
          {darkMode ? (<MdLightMode onClick={handleToggleMode} className="toggle-icon"/>) : (<FaMoon onClick={handleToggleMode} className="toggle-icon"/>)}
        </head>
        <TodoList darkMode={darkMode} setDarkMode={setDarkMode}/>
      </main>
    </div>
  )
}

export default App
