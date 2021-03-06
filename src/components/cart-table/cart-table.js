import React from 'react';
import './cart-table.scss';
import {connect} from 'react-redux';
import {deleteFromCart, clearCart} from '../../actions';
import WithRestoService from '../hoc';

const CartTable = ({items, sended, deleteFromCart, clearCart, RestoService, totalPrice}) => {
    if(sended && items.length === 0){
        return (<div className="cart__title"> Ваш заказ успешно отправлен </div>)
    }
    if( items.length === 0){
        return (<div className="cart__title"> Ваша корзина пуста :( </div>)
    }
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {items.map(item =>{
                    const {title, price, quantity, url, id} = item;
                    return (
                        <div key={id} className="cart__item">
                        <img src={url} className="cart__item-img" alt={title}></img>
                        <div className="cart__item-title">{title}</div>
                        <div className="cart__item-price">{quantity} x {price}$ = {quantity*price}$</div>
                        <div onClick={()=> deleteFromCart(id)}
                        className="cart__close">&times;</div>
                         </div>
                    )
                })}
            <button 
            onClick={()=> {
                RestoService.setOrder(createOrder(items), totalPrice)
                clearCart();
            }} 
            className="menu__btn">Order</button>
            </div>
        </>
    );
};

const createOrder = (items) =>{
    const NewOrder = items.map(item =>{
        return{
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            totalItemPrice: item.quantity * item.price
        }
    })
    return NewOrder;
}


const mapStateToProps = ({items, totalPrice, sended}) => {
    return{
        items,
        totalPrice,
        sended
    }
};

const mapDispatchToProps = {
    deleteFromCart,
    clearCart
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));