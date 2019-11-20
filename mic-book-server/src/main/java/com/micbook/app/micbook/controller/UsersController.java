package com.micbook.app.micbook.controller;

import com.micbook.app.micbook.dto.UserDTO;
import com.micbook.app.micbook.model.UserModel;
import com.micbook.app.micbook.repository.UserRepository;
import com.micbook.app.micbook.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
public class UsersController {
    private UserRepository repository;
    private JwtUserDetailsService service;
    @Autowired
    private PasswordEncoder bcryptEncoder;

    public UsersController(UserRepository repository, JwtUserDetailsService service) {
        this.repository = repository;
        this.service = service;
    }

    @GetMapping("/users-list")
    @CrossOrigin(origins = "http://localhost:4200")
    public Collection<UserModel> usersList() {
        return repository.findAll().stream()
                .collect(Collectors.toList());
    }

    @PostMapping("/users")
    @CrossOrigin(origins = "http://localhost:4200")
    public UserModel create(@RequestBody UserDTO user) {
        return service.save(user);
    }


    @PutMapping("/users")
    @CrossOrigin(origins = "http://localhost:4200")
    public UserModel update(@RequestBody UserDTO user) {
        return service.update(user);
    }


    @GetMapping("/users")
    @CrossOrigin(origins = "http://localhost:4200")
    public UserModel getUser(@RequestParam(name = "username") String username) {
        return repository.findByUsername(username);
    }
}
