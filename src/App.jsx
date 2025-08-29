import React, { useState } from "react";
import "./App.css";
import Post from "./post.jsx";
import Header from "./Header.jsx";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout.jsx";
import IndexPages from "./Pages/Index.jsx";
import LoginPage from "./Pages/Loginpage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import { UserContextProvider } from "./usercontext.jsx";
import CreatePost from "./Pages/createPost.jsx";
import PostPage from "./Pages/postPage.jsx";
import EditPost from "./Pages/EditPost.jsx";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPages />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/Create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
