package com.hozyain.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class OrderDto {
    private Long id;
    private List<OrderItemDto> items;
    private Integer totalPrice;
}
