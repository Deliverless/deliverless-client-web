import React, {useContext} from 'react'
import CartItem from '../components/CartItem';
import { CartContext } from '../lib/cartContext'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import PaymentCard from '../components/PaymentCard';

const Cart = () =>{
    const {total, cartItems, itemCount, clearCart, checkout, handleCheckout, increase} = useContext(CartContext);
    return (
        <div className="container" style={{maxWidth:"800px"}}>
            <div>
                <div className="text-center mt-5">
                    <h1>Cart</h1>
                </div>

                <div className="row no-gutters justify-content-center">
                    <div className="col-sm-8 p-3">
                        {
                            cartItems.length > 0 ?
                            cartItems.map(food => <CartItem key={food.id} food={food} options={food.selOptions} />) :
                            <div className="p-3 text-center text-muted">
                                Your cart is empty
                            </div>
                        }

                        { checkout && 
                            <div className="p-3 text-center text-success">
                                <p>Checkout successfull</p>
                                <Link to="/" className="btn btn-outline-success btn-sm">BUY MORE</Link>
                            </div>
                        }
                    </div>
                    {
                        cartItems.length > 0 && 
                        <div className="col-sm-4 p-3">
                            <div className="card card-body">
                                <p className="mb-1">Total Items</p>
                                <h4 className=" mb-3 txt-right">{itemCount}</h4>
                                <p className="mb-1">Total Payment</p>
                                <h3 className="m-0 txt-right">{total}</h3>
                                <hr className="my-4"/>
                                <div className="text-center">
                                    <p><Button type="button" variant="contained" onClick={handleCheckout}>CHECKOUT</Button></p>
                                    <Button type="button" variant="outlined" onClick={clearCart}>CLEAR</Button>
                                </div>

                            </div>
                        </div>
                    }
                    
                </div>
            </div>

            <PaymentCard></PaymentCard>


        </div>
    );
    
}
 
export default Cart;