import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import {ProductService} from "../../components/API/ProductService";
import {Row} from "react-bootstrap";
import Filters from "../../components/Filters";
import ProductItem from "../../components/ProductItem";

const Products = () => {
    const [products, setProducts] = useState([])
    const [filter, setFilter] = useState({min_price: null, max_price: null})
    const [fetchProducts, isProductsLoading, productsError] = useFetching(async (args) => {
        const response = await ProductService.getProducts(args)
        setProducts(response.data)
    })

    useEffect(() => {
        fetchProducts(filter)
    }, [filter])

    return (
        <div className="Products">
            <Filters filter={filter} setFilter={setFilter} fetchProducts={fetchProducts}/>
            <Row xs="auto">
                {products.map(p =>
                    <ProductItem id={p.id} title={p.title} price={p.price} key={p.id}/>
                )}
            </Row>
        </div>
    );
};

export default Products;