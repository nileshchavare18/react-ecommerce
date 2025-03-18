import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Protected(props) {
    let navigate=useNavigate()
    const {Component}=props;
    useEffect(() => {
      const token = localStorage.getItem('login');
      if (!token) {
        navigate('/login');
      }
    }, [Component]);
    
  return (
    <div>
        <Component/>
    </div>
  )
}

export default Protected