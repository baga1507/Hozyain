package com.hozyain.backend.services;


import com.hozyain.backend.entities.Cart;
import com.hozyain.backend.entities.Role;
import com.hozyain.backend.entities.User;
import com.hozyain.backend.exceptions.UserAlreadyExistsException;
import com.hozyain.backend.repositories.OrderRepository;
import com.hozyain.backend.repositories.RoleRepository;
import com.hozyain.backend.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new  UsernameNotFoundException("Пользователь с данным email не найден"));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), mapRolesToAuthorities(user.getRoles()));
    }

    public User getUser(String email) {
        return userRepository.findByEmail(email).orElseThrow();
    }

    @Transactional
    public User createUser(String email, String password) {
        try {
            getUser(email);
            throw new UserAlreadyExistsException("User with email " + email + " already exists");
        } catch (NoSuchElementException e) {
            User user = new User();
            user.setEmail(email);
            user.setPassword(password);
            user.setRoles(new HashSet<>());
            user.addRole(roleRepository.findByName("ROLE_USER"));
            return userRepository.save(user);
        }
    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }
}
