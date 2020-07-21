import React from 'react';
import CartTable from '../cart-table';
import {connect} from 'react-redux';

import './cartPage.css';

const CartPage = ({items}) => {
 
    if(items.length > 0){
        return (
            <div className="cart"> 
                <CartTable/>
                <button 
                    className="menu__btn order">
                    Order
                </button>
            </div>
        )
    }else{
        return<div className="cart cart__empty">Your Cart is empty ;( </div>
    }
}

const mapStateToProps = ({items}) => {
    return{
        items
    }
};

export default connect(mapStateToProps)(CartPage);