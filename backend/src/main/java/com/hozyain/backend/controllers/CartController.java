package com.hozyain.backend.controllers;

import com.hozyain.backend.dto.CartDto;
import com.hozyain.backend.dto.CartItemDto;
import com.hozyain.backend.services.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/carts")
public class CartController {
    private final CartService cartService;

    @PostMapping("/add")
    public CartItemDto addToCart(@RequestParam String email,
                                 @RequestParam(name = "product_id") Long productId) {
        return cartService.addToCart(email, productId);
    }

    @PostMapping("/remove")
    public CartDto removeItem(@RequestParam String email,
                              @RequestParam(name = "item_id") Long itemId) {
        return cartService.removeItem(email, itemId);
    }

    @PostMapping("/clear")
    public void clearCart(@RequestParam String email) {
        cartService.clearCart(email);
    }

    @GetMapping("/get")
    public CartDto getCart(@RequestParam String email) {
        return cartService.getCart(email);
    }

    @GetMapping("/all")
    public List<CartDto> getAll() {
        return cartService.getAllCarts();
    }
}
