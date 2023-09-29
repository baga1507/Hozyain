import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import {CartService} from "../../components/API/CartService";
import {Alert, Button, Image, Table} from "react-bootstrap";
import {OrderService} from "../../components/API/OrderService";
import "./Cart.css"
import {ProductService} from "../../components/API/ProductService";
import Item from "../../components/Item";

const Cart = () => {
    const [cart, setCart] = useState({items: []})
    const [isEmptyCreated, setIsEmptyCreated] = useState(false)
    const [isOrderCreated, setIsOrderCreated] = useState(false)
    const [fetchCart, isCartLoading, cartError] = useFetching(async () => {
        const cart =  await CartService.get()
        setCart(cart)
    })

    useEffect(() => {
        fetchCart()
    }, [])

    async function createOrder() {
        if (cart.items.length === 0) {
            setIsEmptyCreated(true)
        } else {
            await OrderService.create()
            fetchCart()
            setIsOrderCreated(true)
        }
    }

    async function addToCart(item) {
        item.qunatity += 1
        CartService.add(item.productId)
        console.log(cart)
    }

    return (
        <div className="Cart">
            {isOrderCreated &&
                <Alert className="order-create" variant="primary">Заказ успешно оформлен!</Alert>
            }
            {isEmptyCreated &&
                <Alert className="order-empty" variant="danger">Перед покупкой добавьте товары в корзину</Alert>
            }
            {!isCartLoading &&
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
                        {cart.items.map(item =>
                            <Item item={item}/>
                        )}
                        <tr>
                            <td><h4>Итого:</h4></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><h5>{cart.totalPrice} ₽</h5></td>
                        </tr>
                        </tbody>
                    </Table>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <h4></h4>
                        <Button variant="danger" onClick={createOrder}>Оформить заказ</Button>
                    </div>
                </div>
            }
        </div>
    );
};

export default Cart;