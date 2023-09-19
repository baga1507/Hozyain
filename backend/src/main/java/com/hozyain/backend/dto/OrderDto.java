package com.hozyain.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
public class OrderDto {
    private Long id;
    private List<OrderItemDto> items;
    private Integer totalPrice;
    private LocalDate createdAt;
}
