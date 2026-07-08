import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageLayout from "./layouts/PageLayout";
import Intro from "./pages/Intro";
import Blog from "./pages/Blog";
import Problem from "./pages/Problem";
import Review from "./pages/Review";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<PageLayout />}>
          <Route index element={<Navigate to="intro" replace />} />
          <Route path="intro" element={<Intro />} />
          
          <Route path="blogs">
            <Route index element={<></>} />
            <Route path=":title" element={<Blog />} />
          </Route>

          <Route path="problems">
            <Route index element={<></>} />
            <Route path=":slug" element={<Problem />} />
          </Route>

          <Route path="reviews">
            <Route index element={<></>} />
            <Route path=":title" element={<Review />} />
          </Route>
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App
