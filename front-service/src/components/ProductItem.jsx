import React from 'react';
import {Button, Card} from "react-bootstrap";
import {CartService} from "./API/CartService";
import {useFetching} from "../hooks/useFetching";

const ProductItem = ({id, title, price}) => {
    const image = "./images/"
    const [addToCart, isAdding, addError] = useFetching(async (e) => {
        e.preventDefault()
        try {
            CartService.add(id)
        } catch (e) {
            console.log(e)
        }
    })

    return (
        <Card
            className="d-flex justify-content-between"
            bg="light"
            text="dark"
            style={{marginRight: "15px"}}
        >
            <Card.Img variant="top" src={require(image + title + ".jpg")} height="200px" width="200px"/>
            <Card.Text as="h5" style={{alignSelf: "center", fontSize: "30px"}}>{title}</Card.Text>
            <div className="d-flex justify-content-between" style={{marginTop: "10px"}}>
                <Card.Text style={{fontSize: "20px"}}>{price} ₽</Card.Text>
                <Button style={{alignSelf: "start"}} variant="outline-danger" onClick={addToCart}>+</Button>
            </div>
            <br/>
        </Card>
    );
};

export default ProductItem;