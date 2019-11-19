package com.micbook.app.micbook.model;

import lombok.*;

import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Entity;

@Entity
@Data
@NoArgsConstructor
public class Book {
    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    private String title;

    private String otherTitle;

    @NonNull
    private String authorName;

    private String publisher;

    private String publicationCity;

    private int publicationYear;

    @NonNull
    private int numberOfAvailable;

    private String topic;

    @NonNull
    private String publicationType;

}