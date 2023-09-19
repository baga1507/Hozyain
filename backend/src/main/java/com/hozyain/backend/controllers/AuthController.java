package com.hozyain.backend.controllers;


import com.hozyain.backend.exceptions.UserAlreadyExistsException;
import com.hozyain.backend.services.CartService;
import com.hozyain.backend.services.UserService;
import com.hozyain.backend.utils.JwtRequest;
import com.hozyain.backend.utils.JwtResponse;
import com.hozyain.backend.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("auth")
public class AuthController {

    private final UserService userService;
    private final CartService cartService;
    private final JwtUtil jwtTokenUtil;
    private final AuthenticationProvider authenticationProvider;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthToken(@RequestBody JwtRequest jwtRequest) {
        try {
            authenticationProvider.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getEmail(), jwtRequest.getPassword()));
        } catch (Exception e) {
            return new ResponseEntity<>(e.toString(), HttpStatus.UNAUTHORIZED);
        }
        UserDetails userDetails = userService.loadUserByUsername(jwtRequest.getEmail());
        String token = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody JwtRequest jwtRequest) {
        try {
            cartService.createCart(userService.createUser(jwtRequest.getEmail(), passwordEncoder.encode(jwtRequest.getPassword())));
        } catch (UserAlreadyExistsException e) {
            return new ResponseEntity<>(e.toString(), HttpStatus.UNAUTHORIZED);
        }
        return createAuthToken(jwtRequest);
    }
}
