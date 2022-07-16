import React, { FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { DiscountItem } from '../../Components/DiscountItem/DiscountItem';
import { Spiner } from '../../Components/Shared/spiner/spiner';
import { useHttp } from '../../hooks/useHttp';
import { IDiscount } from '../../Interfaces/interfaces';
import './discount.scss';

export const Discount: FC = () => {

    const { request, loading } = useHttp();

    const [discounts, setDiscount] = useState<IDiscount[]>([]);

    useEffect(() => {
        (async () => {
            const response = await request('https://elif-tech-back.herokuapp.com/discounts');
            setDiscount(response);
        })();

    }, []);


    return (<section className='discounts-wrapper'>
        <Helmet><title>Delivery | discounts</title></Helmet>
        <h2 style={{ textAlign: 'center' }}>Discounts code for you!</h2>
        <div className='discounts-list'>
            {
                discounts.length > 0 && !loading && discounts.map((discount: IDiscount) => <DiscountItem key={discount.code} discount={discount} />)
            }
            {
                loading && <Spiner />
            }
        </div>
    </section>);
};