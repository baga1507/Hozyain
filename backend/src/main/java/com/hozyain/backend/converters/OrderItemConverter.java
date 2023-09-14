package com.hozyain.backend.converters;

import com.hozyain.backend.dto.OrderItemDto;
import com.hozyain.backend.entities.OrderItem;
import org.springframework.stereotype.Component;

@Component
public class OrderItemConverter {

    public OrderItemDto EntityToDto(OrderItem orderItem) {
        OrderItemDto orderItemDto = new OrderItemDto();
        orderItemDto.setId(orderItem.getId());
        orderItemDto.setProductTitle(orderItem.getProduct().getTitle());
        orderItemDto.setOrderId(orderItem.getOrder().getId());
        orderItemDto.setPricePerProduct(orderItem.getPricePerProduct());
        orderItemDto.setQuantity(orderItem.getQuantity());
        orderItemDto.setTotalPrice(orderItem.getTotalPrice());

        return orderItemDto;
    }
}
