package com.master.backend.services;

import com.master.backend.converters.CartConverter;
import com.master.backend.converters.CartItemConverter;
import com.master.backend.dto.CartDto;
import com.master.backend.dto.CartItemDto;
import com.master.backend.entities.Cart;
import com.master.backend.entities.CartItem;
import com.master.backend.entities.Product;
import com.master.backend.entities.User;
import com.master.backend.exceptions.ProductNotFoundException;
import com.master.backend.repositories.CartItemRepository;
import com.master.backend.repositories.CartRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CartService {
    private final ProductService productService;
    private final UserService userService;
    private final CartItemRepository itemRepository;
    private final CartRepository cartRepository;
    private final CartItemConverter itemConverter;
    private final CartConverter cartConverter;

    public void createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setTotalPrice(0);
        cartRepository.save(cart);
    }

    @Transactional
    public CartItemDto addToCart(String email, Long productId) {
        Cart cart = userService.getUser(email).getCart();
        Product product = productService.getProduct(productId);
        for (CartItem item: cart.getItems()) {
            if (Objects.equals(item.getProduct().getId(), productId)) {
                item.setQuantity(item.getQuantity() + 1);
                item.setPrice(item.getPrice() + item.getPricePerProduct());
                cart.setTotalPrice(cart.getTotalPrice() + item.getPricePerProduct());
                cartRepository.save(cart);
                return itemConverter.EntityToDto(item);
            }
        }

        CartItem item = new CartItem();
        item.setProduct(product);
        item.setCart(cart);
        item.setPricePerProduct(product.getPrice());
        item.setQuantity(1);
        item.setPrice(product.getPrice());
        itemRepository.save(item);
        cart.setTotalPrice(cart.getTotalPrice() + item.getPricePerProduct());
        cartRepository.save(cart);
        return itemConverter.EntityToDto(item);
    }

    public CartDto getCart(String email) {
        Cart cart = userService.getUser(email).getCart();
        return cartConverter.EntityToDto(cart);
    }

    @Transactional
    public CartDto removeItem(String email, Long itemId) {
        Cart cart = userService.getUser(email).getCart();
        for (CartItem item: cart.getItems()) {
            if (Objects.equals(item.getId(), itemId)) {
                cart.setTotalPrice(cart.getTotalPrice() - item.getPrice());
                cart.getItems().remove(item);
                return cartConverter.EntityToDto(cart);
            }
        }
        throw new ProductNotFoundException("Item with id " + itemId + " is not found");
    }

    @Transactional
    public void clearCart(String email) {
        Cart cart = userService.getUser(email).getCart();
        cart.clear();
    }

    public List<CartDto> getAllCarts() {
        return cartRepository.findAll().stream().map(cartConverter::EntityToDto).toList();
    }
}
