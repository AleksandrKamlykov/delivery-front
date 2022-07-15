import React, { FC, memo, useEffect, useState } from 'react';
import './cart.scss';
import { OrderForm } from '../../Components/OrderForm/OrderForm';
import { CartList } from '../../Components/CartList/CartList';
import { useSelector } from 'react-redux';
import { IProduct } from '../../Interfaces/interfaces';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';

export const Cart: FC = () => {

    const [searchparams, setSearchParams] = useSearchParams();

    const cart: IProduct[] = useSelector((state: any) => state.cart);

    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const totals = cart.reduce((acc, next) => acc + (next.price * next.count), 0);
        setTotal(totals);
    }, [cart]);

    const order = searchparams.get('order');

    return (<>
        <section className='cart-wrapper'>
            <Helmet><title>Delivery | Cart</title></Helmet>
            {
                !order && <>
                    <OrderForm total={total} />
                    <CartList total={total} />
                </>
            }

        </section>
        {
            order && <>
                <h2>thanks for your order</h2>
                <h3>your order <strong>№ {order}</strong></h3>

            </>
        }
    </>);
};