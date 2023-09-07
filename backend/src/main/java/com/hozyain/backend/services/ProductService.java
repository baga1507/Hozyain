package com.hozyain.backend.services;

import com.hozyain.backend.entities.Product;
import com.hozyain.backend.repositories.ProductRepository;
import com.hozyain.backend.repositories.specifications.ProductSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAll(Integer min, Integer max) {
        Specification<Product> spec = Specification.where(null);
        if (min != null) {
            spec = spec.and(ProductSpecification.priceGreaterThanOrEqualTo(min));
        }
        if (max != null) {
            spec = spec.and(ProductSpecification.priceLowerThanOrEqualTo(max));
        }

        return productRepository.findAll(spec);
    }
}
