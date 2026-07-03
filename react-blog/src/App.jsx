import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageLayout from "./layouts/PageLayout";
import ProblemMD from "./components/ProblemMD";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/problems" element={<PageLayout />}>
            <Route path=":slug" element={<ProblemMD />} />
        </Route>

        <Route path="/" element={<ProblemMD mdfile="84_Largest_Rectangle_Histo.md" />} />
      </Routes>
    </Router>
  );
}

export default App
