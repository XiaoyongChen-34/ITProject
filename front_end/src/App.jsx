/**************************************************************
 *  Copyright 2024, All rights reserved, For internal use only
 *
 *  FILE:        App.jsx
 *  PROJECT:     Parson's Problem
 *  MODULE:      Front_end
 *
 *  Description:
 *  This file handles the routing of webpages, including Home,
 *  Student, Admin, etc. Webpage related data is initiated and
 *  stored locally, including entry, message and log in status.
 *
 *  Notes:
 *  Data of entry and message is shared across different webpages
 *  for access and update.
 *
 *  REVISION HISTORY
 *  Date:        By:             Description:
 *  2024-08-16   Yiwen Zhang     Initial creation and setup of
 *                               App.jsx
 *
 **************************************************************/

import Home from "./pages/Home";
import Problem from "./pages/Problem";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
import RoadMap from "./pages/RoadMap";
import Rank from "./pages/Rank";
import Test from "./pages/Test";
import React, { useState, createContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { getCookie } from "./components/Cookie";

export const EntryContext = createContext();
export const LoginContext = createContext();

function App() {
  // The data to be sent to store in database
  const [entry, setEntry] = useState(() => {
    // Retrieve the stored value from local storage when app starts
    const storedEntry = localStorage.getItem("entry");
    return storedEntry
      ? JSON.parse(storedEntry)
      : {
          objectID: "N/A",
          ip: "",
          time: "00:00:00",
          topic: "",
          context: "",
          question: "",
          correctness: "N/A",
          name: "",
          flag: "",
          studentCode: "N/A",
        };
  });

  useEffect(() => {
    // Store entry in local storage whenever it changes
    localStorage.setItem("entry", JSON.stringify(entry));
  }, [entry]);

  // The data to be retrieve from backend
  const [msg, setMsg] = useState(() => {
    // Retrieve the stored value from local storage when app starts
    const storedMsg = localStorage.getItem("msg");
    return storedMsg
      ? JSON.parse(storedMsg)
      : {
          code: [""],
          shuffledCode: [""],
          description: "",
          message: "",
          topic: "",
          context: "",
        };
  });

  useEffect(() => {
    // Store msg in local storage whenever it changes
    localStorage.setItem("msg", JSON.stringify(msg));
  }, [msg]);

  // Makes sure the user is directly to login page before entering admin page
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onLogin = () => {
    setIsAuthenticated(true);
  };

  // Previous question
  const [prevQuestion, setPrevQuestion] = useState(() => {
    // Retrieve the stored value from local storage
    const storedPrevQuestion = localStorage.getItem("prevQuestion");
    return storedPrevQuestion ? storedPrevQuestion : "";
  });

  useEffect(() => {
    // Store entry in local storage whenever it changes
    localStorage.setItem("prevQuestion", prevQuestion);
  }, [prevQuestion]);

  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <EntryContext.Provider
                value={{
                  entry,
                  setEntry,
                  msg,
                  setMsg,
                  prevQuestion,
                  setPrevQuestion,
                }}
              >
                <Home />
              </EntryContext.Provider>
            }
          />
          <Route
            path="/Problem"
            element={
              <EntryContext.Provider
                value={{
                  entry,
                  setEntry,
                  msg,
                  setMsg,
                  prevQuestion,
                  setPrevQuestion,
                }}
              >
                <Problem />
              </EntryContext.Provider>
            }
          />
          <Route
            path="/login"
            element={
              <LoginContext.Provider value={{ onLogin }}>
                <Login />
              </LoginContext.Provider>
            }
          />

          <Route
            path="/admin"
            element={
              getCookie("admin") === "true" || isAuthenticated ? (
                <Admin />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="/Student" element={<Student />} />
          <Route path="/RoadMap" element={<RoadMap />} />
          <Route path="/Rank" element={<Rank />} />
          <Route path="/Test" element={<Test />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
