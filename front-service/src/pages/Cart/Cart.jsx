import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import {CartService} from "../../components/API/CartService";
import {Alert, Button, Image, Table} from "react-bootstrap";
import {OrderService} from "../../components/API/OrderService";
import "./Cart.css"

const Cart = () => {
    const [cart, setCart] = useState({items: []})
    const [isOrderCreated, setIsOrderCreated] = useState(false)
    const [fetchCart, isCartLoading, CartError] = useFetching(async () => {
        const cart =  await CartService.get()
        setCart(cart)
    })

    useEffect(() => {
        fetchCart()
    }, [])

    async function createOrder() {
        await OrderService.create()
        fetchCart()
        setIsOrderCreated(true)
    }

    async function addToCart(item) {
        item.qunatity += 1
        CartService.add(item.productId)
        console.log(cart)
    }

    return (
        <div className="Cart">
            {isOrderCreated &&
                <Alert className="order-alert" variant="primary">Заказ успешно оформлен!</Alert>
            }
            {!isCartLoading &&
                <div className="Cart__content">
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
                                <td>{item.price} ₽</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <h4>Итого: {cart.totalPrice} ₽</h4>
                        <Button variant="primary" onClick={createOrder}>Оформить заказ</Button>
                    </div>
                </div>
            }
        </div>
    );
};

export default Cart;