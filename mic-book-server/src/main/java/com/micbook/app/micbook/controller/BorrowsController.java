package com.micbook.app.micbook.controller;

import com.micbook.app.micbook.dto.ReservationDTO;
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
import java.util.Optional;
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
    public List<ReservationDTO> getUserBorows(@PathVariable(value = "username") String username) {
        List<Reservation> found = reservationRepository.findAll();

        return found.stream()
                .filter(e -> e.getUser().getUsername().equals(username))
                .filter(e -> !e.isEnded())
                .peek(e -> e.setBill(countBill(e)))
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private ReservationDTO mapToDTO(Reservation reservation) {
        return ReservationDTO.builder()
                .id(reservation.getId())
                .bookId(reservation.getBook().getId())
                .title(reservation.getBook().getTitle())
                .authorName(reservation.getBook().getAuthorName())
                .bill(reservation.getBill())
                .reservationDate(reservation.getReservationDate())
                .lendDate(reservation.getLendDate())
                .returnDate(reservation.getReturnDate())
                .isEnded(reservation.isEnded())
                .build();
    }

    private float countBill(Reservation reservation) {
        ZoneId defaultZoneId = ZoneId.systemDefault();
        LocalDate now = LocalDate.now();
        LocalDate returnDate = reservation.getReturnDate().toInstant().atZone(defaultZoneId).toLocalDate();
        if (now.isAfter(returnDate)) {
            long between = ChronoUnit.DAYS.between(returnDate, now);
            return between * 0.30f;
        }
        return 0.0f;
    }

    @PutMapping("/borrow")
    @CrossOrigin(origins = "http://localhost:4200")
    public void returnBook(@RequestBody ReservationDTO reservationDTO) {
        Optional<Reservation> reservationEntity = reservationRepository.findById(reservationDTO.getId());
        if (reservationEntity.isPresent()) {
            Reservation reservation = reservationEntity.get();
            reservation.setEnded(true);
            reservationRepository.save(reservation);
        }
    }
}
