package com.micbook.app.micbook.controller;

import com.micbook.app.micbook.model.Book;
import com.micbook.app.micbook.model.Reservation;
import com.micbook.app.micbook.repository.BookRepository;
import com.micbook.app.micbook.repository.ReservationRepository;
import com.micbook.app.micbook.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class BorrowsController {
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

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
        reservationRepository.save(reservation);

        book.setNumberOfAvailable(book.getNumberOfAvailable() - 1);
        bookRepository.save(book);
    }

    @GetMapping("/borrow/{username}")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<Reservation> getUserBorows(@PathVariable(value = "username") String username) {
        return reservationRepository.findAllByUser(userRepository.findByUsername(username))
                .stream()
                .filter(Reservation::isEnded)
                .peek(e -> e.setBill(countBill(e)))
                .collect(Collectors.toList());
    }

    private float countBill(Reservation reservation) {
        ZoneId defaultZoneId = ZoneId.systemDefault();
        LocalDate now = LocalDate.now();
        LocalDate returnDate = reservation.getReturnDate().toInstant().atZone(defaultZoneId).toLocalDate();
        if (returnDate.isAfter(now)) {
            long between = ChronoUnit.DAYS.between(returnDate, now);
            return between * 0.30f;
        }
        return 0.0f;
    }

    @PutMapping("/borrow")
    @CrossOrigin(origins = "http://localhost:4200")
    public void returnBook(@RequestBody Reservation reservation) {
        reservation.setEnded(true);
        reservationRepository.save(reservation);
    }
}
