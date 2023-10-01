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

import javax.swing.text.html.Option;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;

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
        for (CartItem item: cart.getItems()) {
            if (Objects.equals(item.getProduct().getId(), productId)) {
                item.setQuantity(item.getQuantity() + 1);
                item.setPrice(item.getPrice() + item.getPricePerProduct());
                cart.setTotalPrice(cart.getTotalPrice() + item.getPricePerProduct());
                cartRepository.save(cart);
                return itemConverter.EntityToDto(item);
            }
        }

        Product product = productService.getProduct(productId);
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

    @Transactional
    public void removeFromCart(String email, Long itemId) {
        Cart cart = userService.getUser(email).getCart();
        CartItem item = itemRepository.findById(itemId)
                .orElseThrow(() -> new NoSuchElementException("Item hasn't been found"));
        item.setQuantity(item.getQuantity() - 1);
        cart.setTotalPrice(cart.getTotalPrice() - item.getPricePerProduct());
        if (item.getQuantity() == 0) {
            cart.getItems().remove(item);
        }
    }

    public CartDto getCart(String email) {
        Cart cart = userService.getUser(email).getCart();
        return cartConverter.EntityToDto(cart);
    }

    @Transactional
    public void clearCart(String email) {
        Cart cart = userService.getUser(email).getCart();
        cart.clear();
    }
}
