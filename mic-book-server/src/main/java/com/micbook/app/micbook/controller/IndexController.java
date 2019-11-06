package com.micbook.app.micbook.controller;

import com.micbook.app.micbook.model.Book;
import com.micbook.app.micbook.repository.BookRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
public class IndexController {
    private BookRepository repository;

    public IndexController(BookRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/cool-books")
    @CrossOrigin(origins = "http://localhost:4200")
    public Collection<Book> coolBooks() {
        return repository.findAll().stream()
                .filter(this::isCool)
                .collect(Collectors.toList());
    }

    private boolean isCool(Book book) {
        return !book.getName().equals("AMC Gremlin") &&
                !book.getName().equals("Triumph Stag") &&
                !book.getName().equals("Ford Pinto") &&
                !book.getName().equals("Yugo GV");
    }
}
