import React, { FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import { IProduct } from '../../Interfaces/interfaces';
import './cart.item.scss';

export const CartItem: FC<any> = ({ product }: any) => {
    const dispatch = useDispatch();
    const { id, name, image, count, price, category } = product;

    const plusCount = (id: number) => {
        dispatch({ type: 'PLUS_COUNT', payload: id });
    };
    const minusCount = (id: number) => {
        if (count <= 1) {
            dispatch({ type: 'REMOVE_CART', payload: id });
        } else {
            dispatch({ type: 'MINUS_COUNT', payload: id });
        }
    };

    return (<div className='cart-item-wrapper'>
        <img src={image} alt={name} />
        <div>
            <p>{name}</p>
            <div className='cart-counter'>
                <button onClick={() => minusCount(id)}>-</button>
                <span>{count}</span>
                <button onClick={() => plusCount(id)}>+</button>
            </div>
            <p><strong>Price: {price * count} uah.</strong></p>
        </div>
    </div>);
};