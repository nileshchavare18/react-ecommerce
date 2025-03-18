import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, buy } from "./store/cartSlice.js";
import { fetchApi, STATUS } from "./store/productSlice.js";
import { motion } from "framer-motion"; 
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination.jsx";
import "../App.css";

function Products() {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.product);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagePerPost] = useState(5);
  const navigate = useNavigate();
  const [searchingData, setSearchingData] = useState("");

  useEffect(() => {
    dispatch(fetchApi());
  }, [dispatch]);

  const handleAdd = (product) => {
    dispatch(add(product));
  };

  const handleBuy = (product) => {
    dispatch(buy(product));
    navigate("/cart");
  };


  const filterData = products.filter((product) =>
    product.title.toLowerCase().includes(searchingData.toLowerCase())
  );


  const lastIndex = currentPage * pagePerPost;
  const firstIndex = lastIndex - pagePerPost;
  const currentPost = filterData.slice(firstIndex, lastIndex);

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4 text-primary">🛍️ Trending Products</h2>
      
      <input
        type="text"
        name="search"
        placeholder="Search products..."
        value={searchingData}
        onChange={(e) => {
          setSearchingData(e.target.value);
          setCurrentPage(1); 
        }}
        className="form-control my-3"
      />

      {status === STATUS.LOADING && <h4 className="text-center text-warning">Loading products...</h4>}
      {status === STATUS.ERROR && <h4 className="text-center text-danger">Failed to load products. Try again later.</h4>}

      <div className="Product-Wrapper row g-4">
        {currentPost.length > 0 ? (
          currentPost.map((product) => (
            <motion.div
              className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center"
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="card product-card shadow-sm p-3 rounded border-0">
                <motion.img
                  src={product.image}
                  alt={product.title}
                  className="card-img-top product-img"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="card-body text-center">
                  <h6 className="text-dark">{product.title.substring(0, 30)}...</h6>
                  <h5 className="text-primary fw-bold">
                    <del className="text-danger">
                      ${(product.price * 1.1).toFixed(2)}
                    </del>
                    <span className="fs-6 mx-3">10% OFF</span>
                  </h5>
                  <h5 className="text-primary fw-bold">${product.price.toFixed(2)}</h5>
                  <motion.button
                    className="btn btn-primary w-100 mt-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAdd(product)}
                  >
                    Add To Cart
                  </motion.button>
                  <motion.button
                    className="btn btn-success w-100 mt-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBuy(product)}
                  >
                    Buy Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <h4 className="text-center text-muted">No products available.</h4>
        )}
      </div>

      <Pagination
        totalPost={filterData.length} 
        pagePerPost={pagePerPost}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Products;
