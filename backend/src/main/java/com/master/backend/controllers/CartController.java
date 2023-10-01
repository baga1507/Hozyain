package com.master.backend.controllers;

import com.master.backend.dto.CartDto;
import com.master.backend.dto.CartItemDto;
import com.master.backend.services.CartService;
import com.master.backend.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/carts")
public class CartController {
    private final CartService cartService;
    private final JwtUtil jwtUtil;

    @PostMapping("/add")
    public CartItemDto addToCart(@RequestHeader("Authorization") String authHeader,
                                 @RequestParam(name = "product_id") Long productId) {
        String token = authHeader.substring(7);
        return cartService.addToCart(jwtUtil.getEmailFromToken(token), productId);
    }

    @PostMapping("/remove")
    public ResponseEntity<String> removeFromCart(@RequestHeader("Authorization") String authHeader,
                                            @RequestParam(name = "item_id") Long itemId) {
        String token = authHeader.substring(7);
        try {
            cartService.removeFromCart(jwtUtil.getEmailFromToken(token), itemId);
            return ResponseEntity.ok("Item has been deleted");
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/clear")
    public void clearCart(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        cartService.clearCart(jwtUtil.getEmailFromToken(token));
    }

    @GetMapping("/get")
    public CartDto getCart(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        return cartService.getCart(jwtUtil.getEmailFromToken(token));
    }
}
