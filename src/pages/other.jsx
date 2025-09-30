import React, { useEffect } from 'react'
import Navbar from '../components/navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getBrands } from '../features/api';

const Other = () => {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.items);


    useEffect(() => {
        dispatch(getBrands({ pageNumber: 1, pageSize: 10 }));
    }, []);

    return (
        <>
            <Navbar />
            <div className='divBrands'>

                <div className='divCeteBraBann'>
                    <p>Categories</p>
                    <p>Brands</p>
                    <p>Banners</p>
                </div>

                <div className='BrandsDivActions'>
                    <p>Brands</p>
                    <p>Actions</p>
                </div>

                {data?.map((brand) => {
                    return (
                        <div key={brand.id}>
                            <div>
                                <h2>{brand?.brandName}</h2>
                                <hr style={{ color: "gray" }} />
                            </div>
                            <div>
                                <button>🗑️</button>
                            </div>
                        </div>

                    )
                })}

            </div>


        </>
    )
}

export default Other