import { IDiscount } from './../../Interfaces/interfaces';
const initialState: IDiscount[] = [{ precent: 10, code: 'ndaihg298' }, { precent: 15, code: 'nd6457298' }, { precent: 20, code: 'n123123d' }, { precent: 20, code: 'nd78kyj8' },];

export const discountReducer = (state = initialState, action: any) => {

    switch (action.type) {
        default:
            return state;
    }
};