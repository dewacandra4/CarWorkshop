import React from 'react'
import { useState } from 'react'
import AuthUser from "../AuthUser/AuthUser";
export default function Login() {
    const { http,setToken} = AuthUser();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        http.post('/login', {
            email : email,
            password : password
        }).then((auth) => {
          setToken(auth.data.user, auth.data.access_token)
        }
        )
    };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="card">
          <div className="card-body">
            <div className="col-md-6 offset-md-3">
              <h1 className="text-center">Login</h1>
              <form>
                <div className="mb-3">
                  <label className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                  />
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
