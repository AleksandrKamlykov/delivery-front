import React, { FC, memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { MiniLoader } from '../../Components/Shared/miniLoader/miniLoader';
import { useHttp } from '../../hooks/useHttp';
import { IOrder } from '../../Interfaces/interfaces';
import './orders.scss';
import { prepareOrders } from './prepare.orders';

export const Orders: FC = memo(() => {

    const { request, loading } = useHttp();

    const [searchInput, setSearchInput] = useState<string>('');
    const [ordersData, setOrdersData] = useState<IOrder[]>([]);

    const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => setSearchInput(event.target.value);

    const getOrders = async () => {

        const result = await request(`https://elif-tech-back.herokuapp.com/orders?select=${searchInput}`);

        setOrdersData(prepareOrders(result));
    };

    return (<section className='orders'>

        <Helmet><title>Delivery | orders</title></Helmet>

        <h2>Serch orders</h2>

        <div className='search-menu'>
            <input onChange={searchHandler} value={searchInput} type="text" className='search-order-input' placeholder='Enter your order number | phone | adress' />

            <button onClick={getOrders} className='search-order-btn'>Search{loading && <MiniLoader />}</button>
        </div>

        {
            ordersData.length > 0 && <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: 80 }}>Number other</th>
                            <th style={{ width: 100 }}>Name</th>
                            <th style={{ width: 100 }}>Phone</th>
                            <th>adress</th>
                            <th>price</th>
                            <th style={{ width: 80 }}>products</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            ordersData.map((elem: any) => {
                                const { orderNum, name, phone, address, total, order } = elem;

                                return (<tr key={orderNum}>
                                    <td>{orderNum}</td>
                                    <td>{name}</td>
                                    <td>{phone}</td>
                                    <td>{address}</td>
                                    <td>{total} uah.</td>
                                    <td>
                                        {
                                            order.map((order: any, index: number) => (
                                                <span key={index}>{order.name} {index === order.length ? '' : ','}</span>
                                            ))
                                        }
                                    </td>
                                </tr>);
                            })
                        }
                    </tbody>
                </table>
            </div>
        }

    </section>);
});