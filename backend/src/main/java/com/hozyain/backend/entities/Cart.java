package com.hozyain.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "carts")
@Getter
@Setter
@NoArgsConstructor
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

    public boolean isEmpty() {
        return items.isEmpty();
    }

    public void clear() {
        items.clear();
        totalPrice = 0;
    }
}
