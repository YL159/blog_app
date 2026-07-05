import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageLayout from "./layouts/PageLayout";
import Intro from "./pages/Intro";
import Blog from "./pages/Blog";
import Problem from "./pages/Problem";
import Review from "./pages/Review";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<PageLayout />}>

          <Route path="intro" element={<Intro />} />
          {/* <Route path="/" element={<ProblemMD mdfile="84_Largest_Rectangle_Histo.md" />} /> */}

          <Route path="blogs/:title" element={<Blog />} />

          <Route path="problems">
            <Route index element={<></>} />
            <Route path=":slug" element={<Problem />} />
          </Route>

          <Route path="reviews/:title" element={<Review />}/>

          <Route path="*" element={<div>404 Not Found</div>} />

        </Route>

      </Routes>
    </Router>
  );
}

export default App
