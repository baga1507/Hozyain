package com.hozyain.backend.converters;

import com.hozyain.backend.dto.CartDto;
import com.hozyain.backend.entities.Cart;
import com.hozyain.backend.entities.Order;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CartConverter {
    private final CartItemConverter itemConverter;

    public CartDto EntityToDto(Cart cart) {
        return new CartDto(
                cart.getId(),
                cart.getItems().stream().map(itemConverter::EntityToDto).toList(),
                cart.getTotalPrice(),
                cart.getUser().getEmail()
        );
    }

    public Order toOrder(Cart cart) {
        Order order = new Order();
        order.setUser(cart.getUser());
        order.setItems(cart.getItems().stream().map(cartItem -> itemConverter.toOrderItem(order, cartItem)).toList());
        order.setTotalPrice(cart.getTotalPrice());

        return order;
    }
}
