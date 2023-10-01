import React, {useEffect, useState} from 'react';
import {Button, Image} from "react-bootstrap";
import {ProductService} from "./API/ProductService";
import {useFetching} from "../hooks/useFetching";
import {CartService} from "./API/CartService";

const CartItem = ({item, add, remove}) => {
    const [image, setImage] = useState(null)
    const [fetchImage, isFetching, imageError] = useFetching(async () => {
        const data = await ProductService.getImage(item.productId)
        setImage(URL.createObjectURL(data))
        console.log(item.id)
    })

    useEffect(() => {
        fetchImage()
    }, [])

    return (
        <tr key={item.id}>
            <td>
                <Image
                    src={image}
                    height="75px"
                    width="75px"
                />
            </td>
            <td>{item.productTitle}</td>
            <td>{item.pricePerProduct} ₽</td>
            <td>
                <Button
                    variant="danger"
                    style={{marginRight: "5px"}}
                    onClick={() => add(item)}
                >
                    +
                </Button>
                {item.quantity}
                <Button
                    variant="secondary"
                    style={{marginLeft: "5px"}}
                    onClick={() => remove(item)}
                >
                    -
                </Button>
            </td>
            <td>{item.price} ₽</td>
        </tr>
    );
};

export default CartItem;