import { IProduct } from './../../Interfaces/interfaces';
const initialState: IProduct[] = [];


export const cartReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case 'ADD_CART':
            return [...state, action.payload];
        case 'REMOVE_CART':
            return state.filter((cart: any) => cart.id !== action.payload);
        case 'CLEAR_CART':
            return [];
        case 'PLUS_COUNT':
            return state.map((product: IProduct) => {
                if (product.id === action.payload) product.count += 1;
                return product;
            });
        case 'MINUS_COUNT':
            return state.map((product: IProduct) => {
                if (product.id === action.payload) product.count -= 1;
                return product;
            });
        default:
            return state;

    }

};