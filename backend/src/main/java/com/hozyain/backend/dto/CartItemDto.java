package com.hozyain.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDto {
    private Long id;
    private Long productId;
    private String productTitle;
    private Long cartId;
    private Integer pricePerProduct;
    private Integer quantity;
    private Integer price;
}
