import React, {useContext, useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import {ProductService} from "../../components/API/ProductService";
import {Row} from "react-bootstrap";
import Filters from "../../components/Filters";
import ProductItem from "../../components/ProductItem";
import "../../styles/Products.css"
import ProductCreation from "../../components/ProductCreation";
import {AuthContext} from "../../context/AuthContext";

const Products = () => {
    const [products, setProducts] = useState([])
    const [filter, setFilter] = useState({min_price: null, max_price: null})
    const [fetchProducts, isProductsLoading, productsError] = useFetching(async (args) => {
        const response = await ProductService.getProducts(args)
        setProducts(response.data)
    })
    const {isAdmin} = useContext(AuthContext)

    useEffect(() => {
        fetchProducts(filter)
    }, [filter])

    return (
        <div className="Products">
            <div className="buttons">
                <Filters filter={filter} setFilter={setFilter} fetchProducts={fetchProducts}/>
                {isAdmin &&
                    <ProductCreation products={products} setProducts={setProducts}/>
                }
            </div>
            <Row xs="auto">
                {products.map(p =>
                    <ProductItem product={p} key={p.id}/>
                )}
            </Row>
        </div>
    );
};

export default Products;