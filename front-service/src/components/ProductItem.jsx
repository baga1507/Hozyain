import React, {useEffect, useState} from 'react';
import {Button, Card} from "react-bootstrap";
import {CartService} from "./API/CartService";
import {useFetching} from "../hooks/useFetching";
import {ProductService} from "./API/ProductService";

const ProductItem = ({product}) => {
    const [image, setImage] = useState(null)
    const [fetchImage, isFetching, imageError] = useFetching(async () => {
        const data = await ProductService.getImage(product.id)
        setImage(URL.createObjectURL(data))
    })
    const [addToCart, isAdding, addError] = useFetching(async (e) => {
        e.preventDefault()
        CartService.add(product.id)
    })

    useEffect(() => {
        fetchImage()
    }, [])

    return (
        <Card
            className="d-flex justify-content-between"
            bg="light"
            text="dark"
            style={{marginRight: "15px"}}
        >
            <Card.Img variant="top" src={image} height="200px" width="200px"/>
            <Card.Text
                as="h5"
                style={{alignSelf: "center", fontSize: product.title.length < 10 ? "30px" : "20px"}}
            >
                {product.title}
            </Card.Text>
            <div className="d-flex justify-content-between" style={{marginTop: "10px"}}>
                <Card.Text style={{fontSize: "20px"}}>{product.price} ₽</Card.Text>
                <Button style={{alignSelf: "start"}} variant="outline-danger" onClick={addToCart}>+</Button>
            </div>
            <br/>
        </Card>
    );
};

export default ProductItem;