import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {useFetching} from "../../hooks/useFetching";
import {OrderService} from "../../components/API/OrderService";
import {useNavigate} from "react-router-dom";

const Orders = () => {
    const router = useNavigate()
    const [orders, setOrders] = useState([])
    const [fetchOrders, isOrdersLoading, errorOrders] = useFetching(async () => {
        const response = await OrderService.getUserOrders()
        setOrders(response.data)
    })

    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <div>
            {!isOrdersLoading &&
                <Table hover>
                    <thead>
                    <tr>
                        <th>Номер заказа</th>
                        <th>Сумма</th>
                        <th>Дата создания</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(order =>
                        <tr key={order.id} onClick={() => router("/orders/" + order.id)}>
                            <td><strong>Заказ №{order.id}</strong></td>
                            <td>{order.totalPrice} ₽</td>
                            <td>{order.createdAt}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            }
        </div>
    );
};

export default Orders;