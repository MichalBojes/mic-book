package com.micbook.app.micbook.controller;

import com.micbook.app.micbook.model.Book;
import com.micbook.app.micbook.repository.BookRepository;
import com.micbook.app.micbook.service.HibernateSearchService;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class BooksController {

    private BookRepository repository;

    private HibernateSearchService searchservice;

    public BooksController(BookRepository repository, HibernateSearchService searchservice) {
        this.repository = repository;
        this.searchservice = searchservice;
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

    @DeleteMapping("/books")
    @CrossOrigin(origins = "http://localhost:4200")
    public void deleteBook(@RequestParam(name = "id") Long id) {
        repository.deleteById(id);
    }

    @GetMapping("/books/search")
    @CrossOrigin(origins = "http://localhost:4200")
    public Collection<Book> searchBooks(
            @RequestParam(name = "query") String query,
            @RequestParam(name = "limit", required = false) Long limit) {
        if (query != null && !query.equals("")) {
            List<Book> result =
                    searchservice.search(query)
                            .stream()
                            .limit(limit)
                            .collect(Collectors.toList());
            return result;
        }
        return null;
    }

    private boolean isEmptyName(Book book) {
        return !book.getTitle().equals("") &&
                !book.getTitle().equals(" ");
    }
}
