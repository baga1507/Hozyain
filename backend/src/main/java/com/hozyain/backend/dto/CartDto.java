package com.hozyain.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CartDto {
    private Long id;
    private List<CartItemDto> items;
    private Integer totalPrice;
    private String email;
}
