package com.hozyain.backend.services;

import com.hozyain.backend.converters.CartConverter;
import com.hozyain.backend.converters.OrderConverter;
import com.hozyain.backend.dto.OrderDto;
import com.hozyain.backend.entities.Cart;
import com.hozyain.backend.entities.Order;
import com.hozyain.backend.exceptions.EmptyOrderException;
import com.hozyain.backend.repositories.OrderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final UserService userService;
    private final CartConverter cartConverter;
    private final OrderConverter orderConverter;
    private final OrderRepository orderRepository;

    @Transactional
    public OrderDto createOrder(String email) {
        Cart cart = userService.getUser(email).getCart();

        if (cart.isEmpty()) {
            throw new EmptyOrderException("Trying to create an empty order");
        }

        Order order = cartConverter.toOrder(cart);
        orderRepository.save(order);
        cart.clear();
        return orderConverter.entityToDto(order);
    }

    public OrderDto getOrder(Long id) {
        return orderConverter.entityToDto(orderRepository.findById(id).orElseThrow());
    }

    public List<OrderDto> getUserOrders(String email) {
        return userService.getUser(email).getOrders().stream().map(orderConverter::entityToDto).sorted((o1, o2) ->
                o2.getId().compareTo(o1.getId())
        ).toList();
    }

    @Transactional
    public void clearUserOrders(String email) {
        userService.getUser(email).getOrders().clear();
    }
}
