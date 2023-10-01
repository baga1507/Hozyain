package com.master.backend.controllers;

import com.master.backend.dto.ProductDto;
import com.master.backend.exceptions.InvalidImageException;
import com.master.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping(value = "/all")
    public List<ProductDto> getALl(@RequestParam(name = "min_price", required = false) Integer min,
                                   @RequestParam(name = "max_price", required = false) Integer max) {
        return productService.getAll(min, max);
    }

    @GetMapping(value = "/image", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<?> getImage(Long id) {
        try {
            return new ResponseEntity<>(productService.getImage(id), HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody MultipartFile image,
                                           @RequestParam String title,
                                           @RequestParam Integer price) {
        try {
            ProductDto product = productService.createProduct(image, title, price);
            return new ResponseEntity<>(product, HttpStatus.CREATED);
        } catch (InvalidImageException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
