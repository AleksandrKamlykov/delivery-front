import { discountReducer } from './discountReducer';
import { cartReducer } from './cartReducer';
import { shopReducer } from './shopReducer';
import { combineReducers } from "redux";



export const rootReducer = combineReducers({
    shop: shopReducer,
    cart: cartReducer,
    discounts: discountReducer
});