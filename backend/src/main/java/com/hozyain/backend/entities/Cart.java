package com.hozyain.backend.entities;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "carts")
@Data
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<CartItem> items;

    @Column(name = "total_price")
    private Integer totalPrice;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    public void clear() {
        items.clear();
        totalPrice = 0;
    }
}
