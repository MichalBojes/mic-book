package com.micbook.app.micbook.controller;

import com.micbook.app.micbook.dto.UserDTO;
import com.micbook.app.micbook.model.LoginStatus;
import com.micbook.app.micbook.model.UserModel;
import com.micbook.app.micbook.repository.UserRepository;
import com.micbook.app.micbook.service.JwtUserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
public class UsersController {
    private UserRepository repository;
    private JwtUserDetailsService service;

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

    @GetMapping(produces = "application/json")
    @RequestMapping({"/validateLogin"})
    @CrossOrigin(origins = "http://localhost:4200")
    public LoginStatus validateLogin() {
        return new LoginStatus("User successfully authenticated");
    }

    @PostMapping
    @RequestMapping({"/users"})
    @CrossOrigin(origins = "http://localhost:4200")
    public UserModel create(@RequestBody UserDTO user) {
        return service.save(user);
    }

}
