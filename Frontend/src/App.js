import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "sweetalert2/dist/sweetalert2.all.js";
import "sweetalert2/dist/sweetalert2.css";
import Swal from "sweetalert2";
// import withReactContent from 'sweetalert2-react-content'
import "./App.css";
import AuthUser from "./components/AuthUser/AuthUser";
import {Routes, Route, Link} from 'react-router-dom';

// route component
import Guest from "./components/Navbar/Guest";
import Auth from "./components/Navbar/Auth";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";


function App() {
  
  const {getToken} = AuthUser();
  // redirect to guest page if token is not set
  if (!getToken()) {
    return <Guest/>
  }
  else
  {
    return (
      <Auth/>
    );
  }
}

export default App;
