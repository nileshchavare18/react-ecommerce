import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const items = useSelector((state) => state.cart);
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem("login");
    navigate("/login"); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm p-3">
      <div className="container d-flex justify-content-between align-items-center">
   
        <Link to="/" className="navbar-brand fw-bold text-primary fs-3">
          🛒 Redux Store
        </Link>


        <div className="d-flex align-items-center gap-4">
          <Link to="/" className="nav-link fw-semibold text-dark fs-5">
            Home
          </Link>

        
          <Link to="/cart" className="nav-link position-relative text-dark fs-5">
            <FaShoppingCart size={28} />
            {items.length > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.8rem", padding: "5px 8px" }}
              >
                {items.length}
              </span>
            )}
          </Link>

     
          {localStorage.getItem("login") && (
            <button
              className="btn btn-danger px-3 py-2 fw-semibold"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
