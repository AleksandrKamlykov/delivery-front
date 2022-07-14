import React, { FC, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './goodItem.scss';

export const GoodItem: FC<any> = memo(({ good }: any) => {
    const { price, name, description, image } = good;

    const dispatch = useDispatch();

    const cartArr = useSelector((state: any) => state.cart);

    const isOrdered = cartArr.some((elem: any) => elem.id == good.id);

    const cartHandler = () => {
        if (isOrdered) {
            dispatch({ type: 'REMOVE_CART', payload: good.id });

        } else {
            dispatch({ type: 'ADD_CART', payload: { ...good, id: good.id, count: 1 } });
        }


    };

    return (<div className='good-wrapper'>
        <img src={image} alt='good-img' />
        <h4>{name}</h4>
        <p>{description}</p>
        <div className='good-menu'>
            <span><small>price:</small> <strong>{price} uah.</strong></span>
            <button className={isOrdered ? 'active-good' : ''} onClick={cartHandler}>{isOrdered ? 'Remove from cart' : 'Add to cart'}</button>
        </div>
    </div>);
});