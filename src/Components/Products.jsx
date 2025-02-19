import React, { useState, useEffect } from 'react'

const Products = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("https://fakestoreapi.com/products");
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
                console.log(filter);
            }

            return () => {
                componentMounted = false;
            }
        }

        getProducts();
    }, []);

    const Loading = () => {
        return <>Loading....</>;
    };

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-dark me-2">New Arrival</button>
                    <button className="btn btn-outline-dark me-2">Appliances</button>
                    <button className="btn btn-outline-dark me-2">Beverages</button>
                    <button className="btn btn-outline-dark me-2">Fashion & Beauty</button>
                    <button className="btn btn-outline-dark me-2">Electronics</button>
                    <button className="btn btn-outline-dark me-2">Home Essentials</button>
                    <button className="btn btn-outline-dark me-2">Gadgets</button>
                </div>
                {filter.map((Product) => {
                    <>
                        <div className="col-md-3">
                            <div class="card">
                                <img src={Product.image} class="card-img-top" alt={Product.title} />
                                    <div class="card-body">
                                        <h5 class="card-title">{Product.title}</h5>
                                        <p class="card-text">₦{Product.price}</p>
                                        <a href="#" class="btn btn-primary">Add to cart</a>
                                    </div>
                            </div>
                        </div>
                    </>
                })}
            </>
        );
    };

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className='display-6 fw-bolder text-center'>Latest Products</h1>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    );
}

export default Products;