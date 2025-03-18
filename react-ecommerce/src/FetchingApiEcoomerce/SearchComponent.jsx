import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { motion } from "framer-motion";

function SearchComponent({ products, handleIncrement, handleDecrement, handleRemove }) {
const [searchingData,setSearchingData]=useState('')
const dispatch=useDispatch()
const filterData=products.filter((product)=>product.title.toLowerCase().includes(searchingData.toLowerCase()))



    
  return (
    <div>
        <input
        type="text"
        name="search"
        placeholder="Search products..."
        value={searchingData}
        onChange={(e) => setSearchingData(e.target.value)}
        className="form-control my-3"
      />
    <div>
        {filterData.length > 0 ? (filterData.map((product) => {
                const itemTotal = product.quantity * product.price;
                const tax = (itemTotal * 15) / 100;
                const deliveryCharges = itemTotal < 900 ? 100 : (itemTotal * 10) / 100;
                const totalPrice = itemTotal + tax + deliveryCharges;

                return (
                  <motion.div
                    className="col-md-12"
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="card product-card shadow-sm p-3 rounded border-0 d-flex flex-row align-items-center gap-3">
                      <motion.img
                        src={product.image}
                        alt={product.title}
                        className="product-img rounded"
                        whileHover={{ scale: 1.1 }}
                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                      />

                      <div className="card-body">
                        <h6 className="text-dark fw-bold">{product.title}</h6>
                        <h5 className="text-primary fw-bold">
                          <del className="text-danger">
                            ${(product.price * 1.1).toFixed(2)}
                          </del>
                          <span className="fs-6 mx-2">10% OFF</span>
                          <span className="text-primary">${product.price.toFixed(2)}</span>
                        </h5>

                        <p className="fw-bold m-0">Quantity: {product.quantity}</p>
                        <p className="fw-bold m-0">Tax (15%): ${tax.toFixed(2)}</p>
                        <p className="fw-bold m-0">Delivery: ${deliveryCharges.toFixed(2)}</p>
                        <p className="fw-bold">Total: ${totalPrice.toFixed(2)}</p>

                        <div className="d-flex align-items-center gap-2">
                          <button
                            onClick={() => handleDecrement(product.id)}
                            className="btn btn-sm btn-danger"
                            disabled={product.quantity === 1}
                          >
                            -
                          </button>
                          <span className="fw-bold">{product.quantity}</span>
                          <button
                            onClick={() => handleIncrement(product.id)}
                            className="btn btn-sm btn-danger"
                          >
                            +
                          </button>
                        </div>

                        <motion.button
                          className="btn btn-danger w-100 mt-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRemove(product.id)}
                        >
                          ❌ Remove
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })):(<h2>Data is Not Found</h2>)}
    </div>
    </div>
  )
}

export default SearchComponent