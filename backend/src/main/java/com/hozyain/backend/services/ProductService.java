package com.hozyain.backend.services;

import com.hozyain.backend.converters.ProductConverter;
import com.hozyain.backend.dto.ProductDto;
import com.hozyain.backend.entities.Product;
import com.hozyain.backend.repositories.ProductRepository;
import com.hozyain.backend.repositories.specifications.ProductSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductConverter productConverter;

    public List<ProductDto> getAll(Integer min, Integer max) {
        Specification<Product> spec = Specification.where(null);
        if (min != null) {
            spec = spec.and(ProductSpecification.priceGreaterThanOrEqualTo(min));
        }
        if (max != null) {
            spec = spec.and(ProductSpecification.priceLowerThanOrEqualTo(max));
        }

        return productRepository.findAll(spec).stream().map(productConverter::entityToDto).toList();
    }

    public Product getProduct(Long id) {
        return productRepository.findById(id).orElseThrow();
    }
}
