package com.master.backend.converters;

import com.master.backend.dto.OrderDto;
import com.master.backend.entities.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class OrderConverter {
    private final OrderItemConverter itemConverter;

    public OrderDto entityToDto(Order order) {
        OrderDto orderDto = new OrderDto();
        orderDto.setId(order.getId());
        orderDto.setItems(order.getItems().stream().map(itemConverter::EntityToDto).toList());
        orderDto.setTotalPrice(order.getTotalPrice());
        orderDto.setCreatedAt(LocalDate.from(order.getCreatedAt()));

        return orderDto;
    }
}
