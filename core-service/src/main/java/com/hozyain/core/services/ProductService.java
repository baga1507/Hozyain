package com.hozyain.core.services;

import com.hozyain.core.entities.Product;
import com.hozyain.core.repositories.ProductRepository;
import com.hozyain.core.repositories.specifications.ProductSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

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
