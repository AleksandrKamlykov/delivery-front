import React, { FC, memo, useRef, useState } from 'react';
import './orderForm.scss';
import ReCAPTCHA from "react-google-recaptcha";
import { IDiscount } from '../../Interfaces/interfaces';
import { useHttp } from '../../hooks/useHttp';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { MiniLoader } from '../Shared/miniLoader/miniLoader';

export const OrderForm: FC<any> = memo(({ total }) => {

    const [searchParams, setSearchparams] = useSearchParams();
    const cart = useSelector((state: any) => state.cart);
    const dispatch = useDispatch();

    const { request, loading } = useHttp();

    const [isVerif, setIsVerif] = useState<boolean>(false);
    const [discountInput, setDiscountInput] = useState<string>('');
    const [isDiscount, setIsdiscount] = useState<IDiscount | undefined>(undefined);
    const [finishOrder, setFinishOrder] = useState<any>(undefined);

    const [formData, setFormData] = useState<any>({});

    const refCaptcha = useRef<any>(null);
    const refForm = useRef<HTMLFormElement>(null);

    const onSubmit = async (event: any) => {
        event.preventDefault();

        const body = {
            ...formData,
            total: total,
            discount: {
                code: disableInput,
                precent: isDiscount?.precent
            },
            order: cart


        };
        const response = await request('https://elif-tech-back.herokuapp.com/create-order', 'POST', body);

        setSearchparams({ 'order': response.name });
        dispatch({ type: 'CLEAR_CART' });
        setFinishOrder(response);

    };

    const onChange = (value: any) => {
        console.log("Captcha value:", value);
        setIsVerif(true);
    };

    const discountHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

        const value: string = event.target.value;

        setDiscountInput(value);
    };

    const formHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key: string = event.target.name;
        const value: string = event.target.value;

        setFormData((prev: any) => ({ ...prev, [key]: value }));
    };

    const checkDiscount = async () => {
        const discount = await request(`https://elif-tech-back.herokuapp.com/check-discount?key=${discountInput}`);

        if (discount.ok) {
            setIsdiscount(discount);
        } else {
            setDiscountInput(discount.message);
        }


    };

    const disableInput: boolean = total === 0;
    const totalPrice = Math.floor(total / 100 * (100 - (isDiscount?.precent ?? 0)));

    return (<div className='form-wrapper'>
        <h2>Your contacts</h2>
        <form ref={refForm}  >

            <input required onChange={formHandler} disabled={disableInput} name="name" placeholder='Name' type='text' />
            <input required onChange={formHandler} disabled={disableInput} name="email" placeholder='Email' type='text' />
            <input required onChange={formHandler} disabled={disableInput} name="phone" placeholder='Phone' type='text' />
            <input required onChange={formHandler} disabled={disableInput} name="address" placeholder='Address' type='text' />
        </form>
        <div className='form-menu'>
            <input value={discountInput} onChange={discountHandler} className={isDiscount ? 'is-discount' : ''} disabled={disableInput} type="text" placeholder='Promocode' />
            <button onClick={checkDiscount} className='checker-btn'>Check discount</button>


        </div >
        <div className='form-menu'>
            <div style={{ width: '100%' }}>
                <span>Total price: </span>
                {
                    isDiscount && <span> - {isDiscount.precent}% : </span>
                }
                <strong>{totalPrice} uah.</strong>
            </div>

            <button onClick={onSubmit} style={{ width: '100%' }} disabled={!isVerif || disableInput} type='submit'>Submit {loading && <MiniLoader />}</button>

        </div>
        <ReCAPTCHA
            ref={refCaptcha}
            sitekey="6LfLO-4gAAAAANoJpQ6Ab9EpAKA-GDmt6cdhaxWn"
            // sitekey="6LezLe4gAAAAAKJiM7htth5IsqWZ45a5OWGaQU_P"
            onChange={onChange}
        />

    </div>);
});

