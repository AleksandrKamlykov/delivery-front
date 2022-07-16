import React, { FC, memo } from 'react';
import { GoodItem } from '../GoodItem/GoodItem';
import './category.scss';



export const CategoryItem: FC<any> = memo(({ foodArr, title }: any) => {


    return (<div className='category-wrapper'>
        <div className='category-title'>
            <div style={{ width: '5%' }}></div>
            <h2>{title}</h2>
            <div />
        </div>
        <div className='category-items'>
            {
                foodArr.map((good: any) => <GoodItem key={good.id} good={good} />
                )
            }        </div>
    </div>);
});