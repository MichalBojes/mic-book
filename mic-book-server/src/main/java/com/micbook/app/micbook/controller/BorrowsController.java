package com.micbook.app.micbook.controller;

import com.micbook.app.micbook.model.Book;
import com.micbook.app.micbook.model.Reservation;
import com.micbook.app.micbook.repository.ReservationRepository;
import com.micbook.app.micbook.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

@RestController
@RequiredArgsConstructor
public class BorrowsController {
    private final ReservationRepository repository;
    private final UserRepository userRepository;

    @PostMapping("/borrow/{username}")
    @CrossOrigin(origins = "http://localhost:4200")
    public void borrowBook(@RequestBody Book book, @PathVariable(value = "username") String username) {

        ZoneId defaultZoneId = ZoneId.systemDefault();
        LocalDate localDate = LocalDate.now();
        Date reservationDate = Date.from(localDate.atStartOfDay(defaultZoneId).toInstant());
        Date returnDate = Date.from(localDate.plusMonths(3).atStartOfDay(defaultZoneId).toInstant());
        Reservation reservation = Reservation.builder()
                .book(book)
                .reservationDate(reservationDate)
                .lendDate(reservationDate)
                .returnDate(returnDate)
                .isEnded(false)
                .user(userRepository.findByUsername(username))
                .bill(0.0F)
                .build();
        repository.save(reservation);
    }
}
