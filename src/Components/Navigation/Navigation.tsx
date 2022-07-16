import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './navigation.scss';

import { useSearchParams } from 'react-router-dom';
import { useHttp } from '../../hooks/useHttp';

export const Navigation: FC = memo(() => {

    const [searchParam, setSearchParam] = useSearchParams();
    const { request, loading } = useHttp();

    const [shops, setShops] = useState<any[]>([]);

    const dispatch = useDispatch();
    const { shopId } = useSelector((state: any) => state.shop);
    const cart = useSelector((state: any) => state.cart);

    useEffect(() => {

        (async () => {
            const response = await request('https://elif-tech-back.herokuapp.com/shops');
            setShops(response);
        })();

    }, []);

    const chooseShop = useCallback((id: number) => {
        setSearchParam({ 'shopId': id.toString() });
        dispatch({ type: 'CHOOSE', payload: id });
    }, []);

    return (<>
        <nav className='shops-nav'>
            <h2>Shops</h2>
            <ul className='shops-list'>
                {
                    shops.map(({ id, name }) => {
                        const dis: boolean = cart.length > 0 && shopId && shopId !== id;
                        return (
                            <li key={id} className="shop-item">
                                <button
                                    onClick={chooseShop.bind(null, id)}
                                    disabled={dis}
                                    className={id == shopId ? 'active' : ''}
                                >
                                    {name}
                                </button>
                            </li>
                        );
                    })
                }
            </ul>
        </nav>
    </>);
});