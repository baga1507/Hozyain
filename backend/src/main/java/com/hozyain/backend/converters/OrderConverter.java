package com.hozyain.backend.converters;

import com.hozyain.backend.dto.OrderDto;
import com.hozyain.backend.entities.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderConverter {
    private final OrderItemConverter itemConverter;

    public OrderDto EntityToDto(Order order) {
        OrderDto orderDto = new OrderDto();
        orderDto.setId(order.getId());
        orderDto.setItems(order.getItems().stream().map(itemConverter::EntityToDto).toList());
        orderDto.setTotalPrice(order.getTotalPrice());

        return orderDto;
    }
}
