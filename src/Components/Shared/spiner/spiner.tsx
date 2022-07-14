import React, { FC } from 'react';
import './spiner.scss';

export const Spiner: FC = () => {


    return (<>
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </>);
};