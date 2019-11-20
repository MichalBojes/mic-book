package com.micbook.app.micbook.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue
    private Long id;

//    @NonNull
//    private UserModel user;
//
//    @NonNull
//    private Book book;

    private float bill;

    private Date reservationDate;

    private Date lendDate;

    private Date returnDate;

    private boolean isEnded;

}
