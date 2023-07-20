import React from "react";
import { Auth } from "./Auth";
import '../../main.global.css';
import { MainPage } from "./MainPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { CardPage } from "./CardPage";
import { NotFound } from "./NotFound";
import { useAppSelector } from "../hooks/redux";
import { NotFoundAuth } from "./NotFoundAuth";

export default function App() {
  const { token } = useAppSelector(state => state.auth);
  return (
      <Routes>
        <Route path="/" element={token ? <Navigate to={"/users/page/1"} /> :  <Navigate to={"/auth"} /> } />
        <Route path="/users/page/:num" element={ <MainPage /> } />
        <Route path="/auth" element={ <Auth /> } />
        <Route path="/users/:id" element={<CardPage />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/not-found-auth" element={<NotFoundAuth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

  )
}
