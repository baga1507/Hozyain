package com.hozyain.backend.controllers;

import com.hozyain.backend.dto.OrderDto;
import com.hozyain.backend.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/create")
    public OrderDto createOrder(String email) {
        return orderService.createOrder(email);
    }

    @GetMapping("/get/all")
    public List<OrderDto> getUserOrders(String email) {
        return orderService.getUserOrders(email);
    }
}
