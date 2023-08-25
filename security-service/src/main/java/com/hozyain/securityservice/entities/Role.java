package com.hozyain.securityservice.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name="roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="name")
    private String name;

    @CreationTimestamp
    @Column(name="created_at")
    private LocalDateTime created_at;

    @UpdateTimestamp
    @Column(name="updated_at")
    private LocalDateTime updated_at;
}
