import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { remove, increment, decrement } from "./store/cartSlice.js";
import "../App.css";

function Cart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);

  const handleRemove = (productId) => {
    dispatch(remove(productId));
  };

  const handleIncrement = (productId) => {
    dispatch(increment(productId));
  };

  const handleDecrement = (productId) => {
    dispatch(decrement(productId));
  };

  // Calculate total price for order summary
  const cartTotal = products.reduce((total, product) => {
    const itemTotal = product.quantity * product.price;
    const tax = (itemTotal * 15) / 100;
    const deliveryCharges = itemTotal < 900 ? 100 : (itemTotal * 10) / 100;
    return total + itemTotal + tax + deliveryCharges;
  }, 0);

  return (
    <div className="container py-3">
      <h4 className="fw-bold mb-4 text-primary">🛒 Your Cart</h4>

      <div className="row g-4">
  
        <div className="col-md-7 bg-light p-3 rounded myShoppingCart">
          {products.length === 0 ? (
            <div className="text-center">
              <h4 className="text-muted">Your cart is empty 🛍️</h4>
            </div>
          ) : (
            <div className="row g-3">
              {products.map((product) => {
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
              })}
            </div>
          )}
        </div>

 
        <div className="col-md-5">
          <div className="bg-light p-4 rounded shadow-sm">
            <h4 className="text-dark fw-bold">📦 Order Summary</h4>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Subtotal:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold">
              <span>Tax (15%):</span>
              <span>${(cartTotal * 0.15).toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold">
              <span>Delivery:</span>
              <span>${cartTotal < 900 ? "100" : (cartTotal * 0.10).toFixed(2)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between text-primary fw-bold fs-5">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <motion.button
              className="btn btn-success w-100 mt-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✅ Proceed to Checkout
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
