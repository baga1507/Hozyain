package com.hozyain.backend.converters;

import com.hozyain.backend.dto.ProductDto;
import com.hozyain.backend.entities.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductConverter {
    public ProductDto entityToDto(Product product) {
        return new ProductDto(product.getId(), product.getTitle(), product.getPrice());
    }

    public Product dtoToEntity(ProductDto productDto) {
        Product product = new Product();
        product.setId(product.getId());
        product.setTitle(productDto.getTitle());
        product.setPrice(productDto.getPrice());

        return product;
    }
}
