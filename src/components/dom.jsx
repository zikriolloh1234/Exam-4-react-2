import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../features/api';

const Dom = () => {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.items);
    console.log(data);

    useEffect(() => {
        dispatch(getProduct());
    }, []);
    return (
        <>
            {data?.products?.map((item, index) => (
                <h2 key={index}>{item.productName}</h2>
            ))}

        </>
    )
}

export default Dom