package com.micbook.app.micbook.controller;

import com.micbook.app.micbook.model.Book;
import com.micbook.app.micbook.repository.BookRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
public class BooksController {
    private BookRepository repository;

    public BooksController(BookRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/books/list")
    @CrossOrigin(origins = "http://localhost:4200")
    public Collection<Book> booksList() {
        return repository
                .findAll()
                .stream()
                .filter(this::isEmptyName)
                .collect(Collectors.toList());
    }

    @GetMapping("/books/edit")
    @CrossOrigin(origins = "http://localhost:4200")
    public Book bookEdit(@RequestParam(name = "id") Long id) {
        Book ksiazka = repository.getById(id);
        return ksiazka;
    }

    @DeleteMapping("/books/delete")
    @CrossOrigin(origins = "http://localhost:4200")
    public void deleteBook(@RequestParam(name = "id") Long id) {
        repository.deleteById(id);
    }

    private boolean isEmptyName(Book book) {
        return !book.getTitle().equals("") &&
                !book.getTitle().equals(" ");
    }
}
