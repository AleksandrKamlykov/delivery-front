import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import './header.scss';
//import cartIcon from '../../img/icons8-shopping_cart.png';

export const Header: FC = () => {

    const cart: any[] = useSelector((state: any) => state.cart);

    return (<>
        <header>

            <Link className='logo' to={'/'}>
                <h1 >Delivery</h1>
            </Link>


            <nav className='nav-menu'>
                <ul>

                    <li>
                        <NavLink className={'cart-link'} to={'/discount'}>

                            <span>Discount</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={'cart-link'} to={'/cart'}>
                            {
                                cart.length > 0 && <div className='counter'>
                                    {cart.length}
                                </div>
                            }
                            <span>Cart</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    </>);
};