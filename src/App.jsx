import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AddContacts from "./pages/AddContacts";
import Edit from "./pages/Edit";
import Favourites from "./pages/Favourites";


const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
         <Navbar/>
          <Routes>
             <Route path="/" element={<Home/>} />
             <Route path="/contacts" element={<AddContacts/>} />
             <Route path="/favourite" element={<Favourites/>} />
             <Route path="users/:id" element={<Edit/>} />
            
          </Routes>
         <Footer/>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
