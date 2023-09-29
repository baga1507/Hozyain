package com.master.backend.converters;

import com.master.backend.dto.ProductDto;
import com.master.backend.entities.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductConverter {
    public ProductDto entityToDto(Product product) {
        return new ProductDto(product.getId(),
                product.getTitle(),
                product.getPrice()
        );
    }

    public Product dtoToEntity(ProductDto productDto) {
        Product product = new Product();
        product.setId(product.getId());
        product.setTitle(productDto.getTitle());
        product.setPrice(productDto.getPrice());

        return product;
    }
}
