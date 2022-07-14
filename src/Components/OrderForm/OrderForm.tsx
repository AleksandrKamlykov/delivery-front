import React, { FC, memo, useRef, useState } from 'react';
import './orderForm.scss';
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from 'react-redux';
import { IDiscount } from '../../Interfaces/interfaces';

export const OrderForm: FC<any> = memo(({ total }) => {

    const discountsArr: IDiscount[] = useSelector((state: any) => state.discounts);

    const [isVerif, setIsVerif] = useState<boolean>(false);
    const [discountInput, setDiscountInput] = useState<string>('');
    const [isDiscount, setIsdiscount] = useState<IDiscount | undefined>(undefined);

    const ref = useRef<any>(null);

    const onSubmit = (e: any) => {

    };

    const onChange = (value: any) => {
        console.log("Captcha value:", value);
        setIsVerif(true);
    };

    const discountHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

        const value: string = event.target.value;

        const isD = discountsArr.find((dicount: IDiscount) => dicount.code === value);
        if (isD) {
            setIsdiscount(isD);
        } else {
            setIsdiscount(undefined);
        }

        setDiscountInput(value);
    };

    const disableInput: boolean = total === 0;
    const totalPrice = Math.floor(total / 100 * (100 - (isDiscount?.precent ?? 0)));

    return (<div className='form-wrapper'>
        <h2>Your contacts</h2>
        <form action="/">

            <input disabled={disableInput} placeholder='Name' type='text' />
            <input disabled={disableInput} placeholder='Email' type='text' />
            <input disabled={disableInput} placeholder='Phone' type='text' />
            <input disabled={disableInput} placeholder='Address' type='text' />
            <div className='form-menu'>
                <input value={discountInput} onChange={discountHandler} className={isDiscount ? 'is-discount' : ''} disabled={disableInput} type="text" placeholder='Promocode' />
                <div>
                    <span>Total price: </span>
                    <strong>{totalPrice} uah.</strong>
                </div>
            </div>
            <button onClick={onSubmit} disabled={!isVerif || disableInput} type='submit'>Submit</button>
            <ReCAPTCHA
                ref={ref}
                sitekey="6LfLO-4gAAAAANoJpQ6Ab9EpAKA-GDmt6cdhaxWn"
                // sitekey="6LezLe4gAAAAAKJiM7htth5IsqWZ45a5OWGaQU_P"
                onChange={onChange}
            />
        </form>
    </div>);
});

