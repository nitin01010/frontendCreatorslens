import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Dashboard from "./components/dashboard";
import ReadBlog from "./components/readBlog";
import Admin from "./components/admin";
import CreateAccount from "./components/createAccount";
import PrivatedRouter from "../privatedRouter";
import PublicRouter from "../publicRouter";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<PublicRouter />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/post/:id" element={<ReadBlog />} />
          <Route path="/account" element={<CreateAccount />} />
        </Route>
        <Route element={<PrivatedRouter />}>
          <Route path="/account/admin" element={<Admin />} />
        </Route>
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
