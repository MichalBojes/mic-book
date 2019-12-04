package com.micbook.app.micbook.model;

import lombok.*;
import org.apache.lucene.analysis.core.KeywordAnalyzer;
import org.hibernate.search.annotations.Analyzer;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;

import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Entity;

@Entity
@Data
@NoArgsConstructor
@Indexed
public class Book {
    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    @Field
    @Analyzer(impl = KeywordAnalyzer.class)
    private String title;

    @Field
    @Analyzer(impl = KeywordAnalyzer.class)
    private String otherTitle;

    @NonNull
    @Field
    @Analyzer(impl = KeywordAnalyzer.class)
    private String authorName;

    private String publisher;

    private String publicationCity;

    private int publicationYear;

    @NonNull
    private int numberOfAvailable;

    @NonNull
    private int amount;

    private String topic;

    @NonNull
    private String publicationType;

}