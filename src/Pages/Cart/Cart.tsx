import React, { FC, memo, useEffect, useState } from 'react';
import './cart.scss';
import { OrderForm } from '../../Components/OrderForm/OrderForm';
import { CartList } from '../../Components/CartList/CartList';
import { useSelector } from 'react-redux';
import { IProduct } from '../../Interfaces/interfaces';
import { Helmet } from 'react-helmet';

export const Cart: FC = () => {
    const cart: IProduct[] = useSelector((state: any) => state.cart);

    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const totals = cart.reduce((acc, next) => acc + (next.price * next.count), 0);
        setTotal(totals);
    }, [cart]);

    return (<section className='cart-wrapper'>
        <Helmet><title>Delivery | Cart</title></Helmet>
        <OrderForm total={total} />
        <CartList total={total} />
    </section>);
};