import React, { FC, useState } from 'react';
import './discount.scss';

export const DiscountItem: FC<any> = ({ discount }: any) => {
    const { precent, code } = discount;
    const [isCopy, setIsCopy] = useState<boolean>(false);

    function copyCode() {
        window.navigator.clipboard
            .writeText(code)
            .then(() => {
                setIsCopy(true);
            })
            .catch((err: any) => {
                throw Error(err.message);
            });
    }

    return (<div className='discount-wrapper'>
        <div className='discount-logo'>{precent}%</div>
        <div className='discount-menu'>
            <span>Your discount</span>
            <button className={isCopy ? 'copied' : ''} onClick={copyCode}>{isCopy ? 'Copied!' : 'Copy'}</button>
        </div>
    </div>);
};