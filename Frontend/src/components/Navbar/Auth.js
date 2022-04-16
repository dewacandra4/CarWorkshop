import {Routes, Route, Link} from 'react-router-dom';

// route component
import Home from "../Home/Home";
import Dashboard from "../Dashboard/Dashboard";
import AuthUser from '../AuthUser/AuthUser';
import EditService from '../Service/EditService';

function Auth() {
    const {token, logout} = AuthUser();
    // const signout = (e) => {
    //     e.preventDefault();
    //     logout.post('/logout').then(res => {
    //         sessionStorage.clear();
    //         window.location.href = '/login';
    //     });
    // };
    const signout = (e) => {
        e.preventDefault();
        logout();
    };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" to="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
              <a className="nav-link" onClick={signout} >
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/logout" element={<Logout />} /> */}
          <Route path="/edit_service/:id" element={<EditService />} />
        </Routes>
      </div>
    </div>
  );
}

export default Auth;
