import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import SideBar from "./components/SideBar"
import OverLay from './components/OverLay';
import { useFetch } from "./useFetch";
import Login from "./components/Login";
import Register from "./components/Register";
import SingleCard from "./components/Single/SinglePost";
import CreatePost from "./components/CreatePost";
import Content from "./components/Content";
import axios from "axios";




function App () {

const [url, setUrl] = useState("/backend/random");
const [currentUser, setCurrentUser] = useState("");


const getData = async () => {
  const res = await axios.get('https://geolocation-db.com/json/')
  const ipString = res.data.IPv4;
  
  console.log(ipString);
  axios.post("/user", {
    ip: ipString
  }).then(response => {
    setCurrentUser(response.data.express.ip);
  }).catch(err =>{
    console.log(err);
  })
}

useEffect( () => {
  getData();
}, [])
  
function getPath(path){
  setUrl(path);
}

  return (
    <Router>
      <div className="App">
        <div className="wrapper">
          <Header />
          <SideBar
            onClick = {getPath}
          />
          <OverLay />
          <Routes>
            <Route exact path= "/" element={
              <Content user={currentUser} path={url} />
            } />
            <Route path="/login" element={
              <Login />
            } />
            <Route path="/register" element={
              <Register />
            } />
            <Route path="/posts/:id" element={
              <SingleCard user={currentUser} />
            } />
            <Route path="/submit" element={
              <CreatePost />
            } />
          </Routes>
        </div>
          <Footer />
      </div>
    </Router>
  );
}

export default App;
