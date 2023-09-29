package com.master.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OrderItemDto {
    private Long id;
    private Long productId;
    private String productTitle;
    private Long orderId;
    private Integer pricePerProduct;
    private Integer quantity;
    private Integer totalPrice;
}
