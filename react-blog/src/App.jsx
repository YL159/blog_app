import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageLayout from "./layouts/PageLayout";
import Blog from "./pages/Blog";
import Review from "./pages/Review";
import ProblemCategory from "./pages/ProblemCategory"
import Article from "./pages/Article";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>

        <Route path="/" element={<PageLayout />}>
          <Route index element={<Navigate to="/intro" replace />} />
          <Route path="intro" element={<Article filePath="/_Intro.md" />} />

          <Route path="blogs">
            <Route index element={<Blog />} />
            <Route path="*" element={<Article />} />
          </Route>

          <Route path="problems">
            <Route index element={<ProblemCategory />} />
            <Route path="*" element={<Article />} />
          </Route>

          <Route path="reviews">
            <Route index element={<Review />} />
            <Route path="*" element={<Article />} />
          </Route>
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App
