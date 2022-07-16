import React, { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { IProduct } from '../../Interfaces/interfaces';
import { CartItem } from '../CartItem/CartItem';
import './cart.list.scss';

export const CartList: FC<{ total: number; }> = memo(({ total }: { total: number; }) => {

    const cart: IProduct[] = useSelector((state: any) => state.cart);


    return (<div className='cart-list-wrapper'>
        {
            cart.length > 0 && cart.map((product: IProduct) => <CartItem key={product.id} product={product} />)
        }


        {
            total === 0 && <h2>You have no items in your shopping cart</h2>
        }
    </div>);
});