import React, { FC, useEffect, useMemo, useState } from 'react';
import { CategoryItem } from '../../Components/CategoryItem/CategoryItem';
import { Navigation } from '../../Components/Navigation/Navigation';
import './home.scss';
import { useDispatch, useSelector } from "react-redux";
import { food } from '../../foods';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export const Home: FC = () => {

    const dispatch = useDispatch();

    const { shopId } = useSelector((state: any) => state.shop);
    const [searchParam, setSearchParam] = useSearchParams();

    const [categories, setCategories] = useState<any[]>([]);
    const [foods, setFoods] = useState<any>({});

    const [filters, setFilters] = useState<string[]>([]);

    const filtersSearch: string[] | undefined = searchParam.get('filters')?.split('-');
    const shopIdSearch: string | null = searchParam.get('shopId');


    function getData() {
        const categoriesSet = new Set();
        const data: any = {};

        food.forEach((food: any) => {
            const { category } = food;
            categoriesSet.add(category);

            if (data[category]) {
                data[category].foods.push(food);
            } else {
                data[category] = {
                    name: category,
                    foods: [food]
                };
            }

        });
        const categData: any[] = Array.from(categoriesSet);
        setCategories(categData);
        setFoods(data);
    }

    useEffect(() => {
        getData();

        if (shopIdSearch && !shopId) {
            dispatch({ type: 'CHOOSE', payload: +shopIdSearch });


        }


    }, []);


    useEffect(() => {
        if (filtersSearch && shopIdSearch) {

            setFilters([...filtersSearch]);

        } else {

            setFilters([]);
        }
    }, [shopId]);


    const addFilter = (value: string) => {
        setFilters((prev: string[]) => [...prev, value]);
        setSearchParam({ 'shopId': shopId, 'filters': [...filters, value].join('-') });
    };
    const categoryFilter = (data: any[]): any[] => {

        if (filters.length === 0) return data;
        return data.filter((item: any) => filters.includes(item.name));
    };

    const clearFilters = () => {
        setFilters([]);
        setSearchParam({ 'shopId': shopId });
    };

    return (<section className="home-wrapper">
        <Helmet ><title>Delivery | Home</title></Helmet>

        <Navigation />
        <div style={{ width: '100%' }}>

            {
                typeof shopId === 'number' && <>

                    <ul className='filter-list'>
                        {
                            categories.map((category: string) => (
                                <li key={category} className={`filter-item`}><button className={filters.includes(category) ? ' active' : ''} onClick={() => addFilter(category)}>{category}</button></li>
                            ))
                        }

                        <li key={'all'} className="filter-item"><button onClick={clearFilters}>Все</button></li>
                    </ul>

                    {
                        categoryFilter(Object.values(foods)).map(({ foods, name }: any) => <CategoryItem key={name} foodArr={foods} title={name} />)
                    }
                </>
            }

            {
                typeof shopId !== 'number' && <>
                    <h2 style={{ textAlign: 'center', marginTop: '15%' }}>Select shop to create an order</h2>
                </>
            }
        </div>
    </section>);
};