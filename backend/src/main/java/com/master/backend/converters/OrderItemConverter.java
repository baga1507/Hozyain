package com.master.backend.converters;

import com.master.backend.dto.OrderItemDto;
import com.master.backend.entities.OrderItem;
import org.springframework.stereotype.Component;

@Component
public class OrderItemConverter {

    public OrderItemDto EntityToDto(OrderItem orderItem) {
        OrderItemDto orderItemDto = new OrderItemDto();
        orderItemDto.setId(orderItem.getId());
        orderItemDto.setProductId(orderItem.getProduct().getId());
        orderItemDto.setProductTitle(orderItem.getProduct().getTitle());
        orderItemDto.setOrderId(orderItem.getOrder().getId());
        orderItemDto.setPricePerProduct(orderItem.getPricePerProduct());
        orderItemDto.setQuantity(orderItem.getQuantity());
        orderItemDto.setTotalPrice(orderItem.getTotalPrice());

        return orderItemDto;
    }
}
