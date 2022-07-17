import React from "react";
import useDarkMode from "./components/useDarkMode";
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Header from "./components/Header";
import Countries from "./components/Countries";
import Country from "./components/Country";

function App() {
  const [setTheme, colorTheme] = useDarkMode();
  return (
    <Router>
      <div className="font-nunito-sans dark:bg-darkVDarkBlue max-h-screen">
        <Header colorTheme={colorTheme} onClick={() => setTheme(colorTheme)}/>
        <Routes>
          <Route path="/" element={<Countries/>}></Route>
          <Route path="/:name" element={<Country/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

