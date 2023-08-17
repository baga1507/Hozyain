package com.hozyain.core.controllers;

import com.hozyain.core.entities.Product;
import com.hozyain.core.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/all")
    public List<Product> getALl(@RequestParam(name = "min_price", required = false) Integer min,
                                @RequestParam(name = "max_price", required = false) Integer max) {
        return productService.getAll(min, max);
    }
}
