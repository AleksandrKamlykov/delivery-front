import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Cart } from './Pages/Cart/Cart';
import { Discount } from './Pages/Discount/Discount';
import { Home } from './Pages/Home/Home';

export const Router: FC = () => {


    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/discount' element={<Discount />} />
        </Routes>
    );
};