import React, {useEffect, useState} from 'react';
import {Image} from "react-bootstrap";
import {ProductService} from "./API/ProductService";
import {useFetching} from "../hooks/useFetching";

const OrderItem = ({item}) => {
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
                {item.quantity}
            </td>
            <td>{item.totalPrice} ₽</td>
        </tr>
    );
};

export default OrderItem;