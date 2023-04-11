import React, { useState } from "react";
import "./App.css";
import News from "./components/RightComponents/DisplayNews/News";
import Sidebar from "./components/LeftComponents/SideBar/SideBar";

export default function App() {
  let response = {}
  const [selectedState, setSelectedState] = useState("")
  return (
    <div className="parent-container">
      <Sidebar  />                 {/*Left container*/}
      <News />                    {/*Right container*/}
    </div>
  )
}