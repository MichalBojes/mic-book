package com.micbook.app.micbook;

import com.micbook.app.micbook.model.Book;
import com.micbook.app.micbook.repository.BookRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.stream.Stream;

@SpringBootApplication
public class MicBookApplication {

    public static void main(String[] args) {
        SpringApplication.run(MicBookApplication.class, args);
    }

    @Bean
    ApplicationRunner init(BookRepository repository) {
        return args -> {
            Stream.of("Ferrari", "Jaguar", "Porsche", "Lamborghini", "Bugatti",
                    "AMC Gremlin", "Triumph Stag", "Ford Pinto", "Yugo GV").forEach(name -> {
                Book book = new Book();
                book.setName(name);
                //repository.save(book);
            });
            repository.findAll().forEach(System.out::println);
        };
    }

}
