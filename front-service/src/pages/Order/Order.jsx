import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import {OrderService} from "../../components/API/OrderService";
import {Image, Table} from "react-bootstrap";
import "./Order.css"
import OrderItem from "../../components/OrderItem";

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
                            <OrderItem item={item}/>
                        )}
                        <tr>
                            <td><h4>Итого:</h4></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><h5>{order.totalPrice} ₽</h5></td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            }
        </div>
    );
};

export default Order;