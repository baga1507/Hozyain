package com.master.backend.services;

import com.master.backend.converters.ProductConverter;
import com.master.backend.dto.ProductDto;
import com.master.backend.entities.Product;
import com.master.backend.exceptions.InvalidImageException;
import com.master.backend.repositories.ProductRepository;
import com.master.backend.repositories.specifications.ProductSpecification;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductConverter productConverter;
    private final String imageFolderPath = "C:\\Users\\User\\IdeaProjects\\Hozyain\\images\\";

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

    public byte[] getImage(Long id) throws IOException {
        return Files.readAllBytes(new File(imageFolderPath + id + ".jpg").toPath());
    }

    @Transactional
    public ProductDto createProduct(MultipartFile image, String title, Integer price) {
        if (image == null) {
            throw new InvalidImageException("No image was found");
        }
        if (!image.getContentType().equals("image/png") && !image.getContentType().equals("image/jpeg")) {
            throw new InvalidImageException("Inappropriate image extension");
        }
        Product product = productRepository.save(new Product(title, price));
        File file = new File(imageFolderPath + product.getId() + ".jpg");
        try {
            if (file.exists()) {
                Files.delete(file.toPath());
            }
            Files.write(file.toPath(), image.getBytes());
            return productConverter.entityToDto(product);
        } catch (IOException e) {
            productRepository.delete(product);
            throw new InvalidImageException(e.getMessage());
        }
    }
}

