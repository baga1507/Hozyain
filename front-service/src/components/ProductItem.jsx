import React from 'react';
import {Button, Card} from "react-bootstrap";

const ProductItem = ({title, price}) => {
    let image = "./images/"

    return (
        <Card
            className="d-flex justify-content-between"
            bg="secondary"
            text="light"
            style={{marginTop: "10px", marginRight: "15px"}}
        >
            <Card.Img variant="top" src={require(image + title + ".jpg")} height="200px" width="200px"/>
            <Card.Text as="h5" style={{alignSelf: "center", fontSize: "30px"}}>{title}</Card.Text>
            <div className="d-flex justify-content-between" style={{marginTop: "10px"}}>
                <Card.Text style={{fontSize: "20px"}}>{price} ₽</Card.Text>
                <Button style={{alignSelf: "start"}} variant="outline-warning">Купить</Button>
            </div>
            <br/>
        </Card>
    );
};

export default ProductItem;