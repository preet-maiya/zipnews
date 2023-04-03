import React, { useState } from "react";
import "./App.css";
import News from "./components/RightComponents/DisplayNews/News";
import Sidebar from "./components/LeftComponents/SideBar/SideBar";

export default function App() {
  let response = {}
  const [selectedState, setSelectedState] = useState("")
  const recievingResponse = (data) => {
    response = data;
    console.log(response.stateName)
    setSelectedState(response.stateName);
  }
  return (
    <div className="parent-container">
      <Sidebar handleResponse={recievingResponse} />                 {/*Left container*/}
      <News selectedState={selectedState} />                    {/*Right container*/}
    </div>
  )
}
