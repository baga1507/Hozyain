import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import {OrderService} from "../../components/API/OrderService";
import {Image, Table} from "react-bootstrap";
import "./Order.css"

const Order = () => {
    const params = useParams()
    const [order, setOrder] = useState({items: []})
    const [fetchOrder, isOrderLoading, orderError] = useFetching(async () => {
        const response = await OrderService.get(params.id)
        setOrder(response.data)
    })

    useEffect(() => {
        fetchOrder()
    }, [])

    return (
        <div className="Order">
            <div className="Order__header">
                <h3>Заказ №{params.id}</h3>
            </div>
            {!isOrderLoading &&
                <div>
                    <Table hover>
                        <thead>
                        <tr>
                            <th></th>
                            <th>Название</th>
                            <th>Цена</th>
                            <th>Кол-во</th>
                            <th>Общая сумма</th>
                        </tr>
                        </thead>
                        <tbody>
                        {order.items.map(item =>
                            <tr key={item.id}>
                                <td>
                                    <Image
                                        src={require("../../components/images/" + item.productTitle + ".jpg")}
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
                        )}
                        </tbody>
                    </Table>
                    <div>
                        <h4>Итого: {order.totalPrice} ₽</h4>
                    </div>
                </div>
            }
        </div>
    );
};

export default Order;