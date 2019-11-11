package com.micbook.app.micbook.controller;

import com.micbook.app.micbook.model.Book;
import com.micbook.app.micbook.repository.BookRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
public class BooksController {
    private BookRepository repository;

    public BooksController(BookRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/books-list")
    @CrossOrigin(origins = "http://localhost:4200")
    public Collection<Book> booksList() {
        return repository.findAll().stream()
                .filter(this::isEmptyName)
                .collect(Collectors.toList());
    }

    private boolean isEmptyName(Book book) {
        return !book.getName().equals("") &&
                !book.getName().equals(" ");
    }
}
