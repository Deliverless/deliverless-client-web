import '../StripeForm.css';

import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';

import CartItem from '../components/CartItem';
import { CartContext } from '../lib/context/cartContext';

//const stripePromise = loadStripe("pk_test_51LiTBOHlhPKJMrfBUI52YU8nihPcSYlBkCHy46irESS7ev1J7vBI1rHNId6wM0kpZ5OybUNUwPvnT0GdyZo9xQG500i6jQAWVw");

const Cart = () =>{
    const {total, cartItems, itemCount, clearCart, checkout, handleCheckout, increase} = useContext(CartContext);

    // const [clientSecret, setClientSecret] = useState("");


    // useEffect(() => {
    //     // Create PaymentIntent as soon as the page loads

    //     console.log(typeof(total))
    //     fetch("/create-payment-intent", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ total: parseFloat(total) * 100 }),
    //     })
    //       .then((res) => res.json())
    //       .then((data) => setClientSecret(data.clientSecret));
    //   }, []);

    //   const appearance = {
    //     theme: 'stripe',
    //   };

    //   const options = {
    //     clientSecret,
    //     appearance,
    //   };

    return (
      <div className="container" style={{ maxWidth: "800px" }}>
        <div>
          <div className="text-center mt-5">
            <h1>Cart</h1>
          </div>

          <div className="row no-gutters justify-content-center">
            <div className="col-sm-8 p-3">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  
                  <CartItem
                    key={item.id}
                    item={item}
                  />
                ))
              ) : (
                <div className="p-3 text-center text-muted">
                  Your cart is empty!
                </div>
              )}

              {checkout && (
                <div className="p-3 text-center text-success">
                  <p>Checkout successfull</p>
                  <Link to="/" className="btn btn-outline-success btn-sm">
                    BUY MORE
                  </Link>
                </div>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="col-sm-4 p-3">
                <div className="card card-body">
                  <p className="mb-1">Total Items</p>
                  <h4 className=" mb-3 txt-right">{itemCount}</h4>
                  <p className="mb-1">Total Payment</p>
                  <h3 className="m-0 txt-right">${total}</h3>
                  <hr className="my-4" />
                  <div className="text-center">
                    <p>
                      <Button
                        type="button"
                        variant="contained"
                        component={Link} to="/checkout"
                      >
                        CHECKOUT
                      </Button>
                    </p>
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={clearCart}
                    >
                      CLEAR
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* <div className="App">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm handleCheckout={handleCheckout} />
            </Elements>
          )}
        </div> */}
      </div>
    );
    
}
 
export default Cart;