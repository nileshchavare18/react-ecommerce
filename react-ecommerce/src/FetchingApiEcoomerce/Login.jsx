import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [credentials,setCredentials]=useState({username:'',password:''})
    const [error,setError]=useState({})
    let navigate=useNavigate()

    const handleOnChange=(e)=>{
        const {name,value}=e.target;
        setCredentials((prev)=>({...prev,[name]:value}))
    }

    const ValidationError=(credentials)=>{
        let error=[];
        if(!credentials.username){
            error.username='please write username';
        }else if(credentials.username.length <6){
            error.username='please write username more than 6 letters';

        }

        if(!credentials.password){
            error.password='please write a password'
        }else if(credentials.password.length < 6){
            error.password='password is must be more than 6 letters'
        }

        return error
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
       const Validation= ValidationError(credentials);
       setError(Validation)
        if(Object.keys(Validation).length === 0){
            localStorage.setItem('login',JSON.stringify(credentials))
            navigate('/')
        }
    }
  return  (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h2 className="text-center text-primary mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
      
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className={`form-control ${error.username ? "is-invalid" : ""}`}
              value={credentials.username}
              name="username"
              placeholder="Enter username"
              onChange={handleOnChange}
            />
            {error.username && <div className="invalid-feedback">{error.username}</div>}
          </div>

      
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className={`form-control ${error.password ? "is-invalid" : ""}`}
              value={credentials.password}
              name="password"
              placeholder="Enter password"
              onChange={handleOnChange}
            />
            {error.password && <div className="invalid-feedback">{error.password}</div>}
          </div>

     
          <button type="submit" className="btn btn-primary w-100 fw-semibold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login