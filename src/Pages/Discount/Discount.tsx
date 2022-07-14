import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { DiscountItem } from '../../Components/DiscountItem/DiscountItem';
import { IDiscount } from '../../Interfaces/interfaces';
import './discount.scss';

export const Discount: FC = () => {

    const discounts: IDiscount[] = useSelector((state: any) => state.discounts);

    return (<section className='discounts-wrapper'>
        <Helmet><title>Delivery | discounts</title></Helmet>
        <h2 style={{ textAlign: 'center' }}>Discounts code for you!</h2>
        <div className='discounts-list'>
            {
                discounts.length > 0 && discounts.map((discount: IDiscount) => <DiscountItem key={discount.code} discount={discount} />)
            }
        </div>
    </section>);
};