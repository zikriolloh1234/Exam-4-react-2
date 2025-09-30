import React, { useEffect } from 'react'
import Navbar from '../components/navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../features/api';
import { baseApi } from '../app/token';

const Dashboard = () => {
    const dispatch = useDispatch();

    const { data } = useSelector((state) => state.items);

    useEffect(() => {
        dispatch(getProduct({ pageNumber: 1, pageSize: 10 }));
    }, []);




    return (
        <>
            <Navbar />

            <div className='divBrands'>
                <h2>dashaboard</h2>
                <div className='getProducts'>
                    {data?.products?.map((item) => (
                        <div className='getProductsDiv' key={item.id}>
                            <div style={{ display: "flex" }}>
                                <img
                                    src={`${baseApi}/images/${item.image}`}
                                    width={"50px"}
                                    height={"50px"}
                                    style={{
                                        borderRadius: "5px"
                                    }}
                                    alt="" />
                                <div className='inaccessories'>
                                    <p>{item?.productName}</p><br />
                                    <span>in Accessories</span>
                                </div>
                            </div>
                            <div>
                                <p style={{ color: "green" }}>{item?.price}</p>
                                <p>in sales</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default Dashboard