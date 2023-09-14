package com.hozyain.backend.controllers;

import com.hozyain.backend.dto.ProductDto;
import com.hozyain.backend.services.ProductService;
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
    public List<ProductDto> getALl(@RequestParam(name = "min_price", required = false) Integer min,
                                   @RequestParam(name = "max_price", required = false) Integer max) {
        return productService.getAll(min, max);
    }
}
