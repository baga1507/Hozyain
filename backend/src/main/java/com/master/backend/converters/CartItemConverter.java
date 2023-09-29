package com.master.backend.converters;

import com.master.backend.dto.CartItemDto;
import com.master.backend.entities.CartItem;
import com.master.backend.entities.Order;
import com.master.backend.entities.OrderItem;
import org.springframework.stereotype.Component;

@Component
public class CartItemConverter {

    public CartItemDto EntityToDto(CartItem cartItem) {
        CartItemDto cartItemDto = new CartItemDto();
        cartItemDto.setId(cartItem.getId());
        cartItemDto.setProductId(cartItem.getProduct().getId());
        cartItemDto.setProductTitle(cartItem.getProduct().getTitle());
        cartItemDto.setCartId(cartItem.getCart().getId());
        cartItemDto.setQuantity(cartItem.getQuantity());
        cartItemDto.setPricePerProduct(cartItem.getPricePerProduct());
        cartItemDto.setPrice(cartItem.getPrice());

        return cartItemDto;
    }

    public OrderItem toOrderItem(Order order, CartItem cartItem) {
        OrderItem orderItem = new OrderItem();
        orderItem.setProduct(cartItem.getProduct());
        orderItem.setOrder(order);
        orderItem.setPricePerProduct(cartItem.getPricePerProduct());
        orderItem.setQuantity(cartItem.getQuantity());
        orderItem.setTotalPrice(cartItem.getPrice());

        return orderItem;
    }
}
