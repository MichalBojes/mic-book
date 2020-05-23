package com.micbook.app.micbook.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private UserModel user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bookId", referencedColumnName = "id")
    private Book book;

    private float bill;

    private Date reservationDate;

    private Date lendDate;

    private Date returnDate;

    private boolean isEnded;

}
