import React from "react";
import "./App.css";
import News from "./components/DisplayNews/News";
import Sidebar from "./components/SideBar/SideBar";

export default function App() {
  return (
    <div className="parent-container">
      <Sidebar />                 {/*Left container*/}
      <News />                    {/*Right container*/}
    </div>
  )
}
