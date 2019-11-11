package com.micbook.app.micbook.controller;

import com.micbook.app.micbook.model.User;
import com.micbook.app.micbook.repository.UserRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
public class UsersController {
    private UserRepository repository;

    public UsersController(UserRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/users-list")
    @CrossOrigin(origins = "http://localhost:4200")
    public Collection<User> usersList() {
        return repository.findAll().stream()
                .collect(Collectors.toList());
    }
}
