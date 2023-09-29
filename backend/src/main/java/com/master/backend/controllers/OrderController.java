package com.master.backend.controllers;

import com.master.backend.dto.OrderDto;
import com.master.backend.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public OrderDto createOrder(@RequestParam String email) {
        return orderService.createOrder(email);
    }

    @GetMapping("/get")
    public OrderDto get(@RequestParam Long id) {
        return orderService.getOrder(id);
    }

    @GetMapping("/get/all")
    public List<OrderDto> getUserOrders(@RequestParam String email) {
        return orderService.getUserOrders(email);
    }

    @PostMapping("clear/all")
    public void clearUserOrders(@RequestParam String email) {
        orderService.clearUserOrders(email);
    }
}
