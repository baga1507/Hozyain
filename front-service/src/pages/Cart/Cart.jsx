import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import {CartService} from "../../components/API/CartService";
import {Alert, Button, Image, Table} from "react-bootstrap";
import {OrderService} from "../../components/API/OrderService";
import "./Cart.css"
import {ProductService} from "../../components/API/ProductService";
import OrderItem from "../../components/OrderItem";
import CartItem from "../../components/CartItem";

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

    function changeItemQuantity(id, price, newQuantity) {
        const newCartItems = [...cart.items]
        const itemIndex = newCartItems.findIndex((item) => item.id === id)
        let newTotalPrice = cart.totalPrice
        if (newQuantity === 0) {
            newCartItems.splice(itemIndex, 1)
            newTotalPrice = newTotalPrice - price
        } else {
            newTotalPrice = newTotalPrice + price * (newQuantity - newCartItems[itemIndex].quantity)
            newCartItems[itemIndex].quantity = newQuantity
            newCartItems[itemIndex].price = price * newQuantity
        }
        setCart({...cart, items: newCartItems, totalPrice: newTotalPrice})
    }

    async function addToCart(item) {
        await CartService.add(item.productId)
        changeItemQuantity(item.id, item.pricePerProduct, item.quantity + 1)
    }

    async function removeFromCart(item) {
        await CartService.remove(item.id)
        changeItemQuantity(item.id, item.pricePerProduct, item.quantity - 1)
    }

    async function clear() {
        if (cart.items.length !== 0) {
            await CartService.clear()
            setCart({...cart, items: [], totalPrice: 0})
        }
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
                            <CartItem item={item} add={addToCart} remove={removeFromCart}/>
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
                        <div>
                            <Button
                                variant="danger"
                                style={{marginRight: "5px"}}
                                onClick={createOrder}
                            >
                                Оформить заказ
                            </Button>
                            <Button variant="secondary" onClick={clear}>Очистить</Button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Cart;