package com.micbook.app.micbook.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.micbook.app.micbook.model.Book;
import com.micbook.app.micbook.model.UserModel;
import lombok.*;
import org.apache.lucene.analysis.core.KeywordAnalyzer;
import org.hibernate.search.annotations.Analyzer;
import org.hibernate.search.annotations.Field;

import javax.persistence.*;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDTO {
    private Long id;
    private Long bookId;
    private String title;
    private String authorName;
    private float bill;
    private Date reservationDate;
    private Date lendDate;
    private Date returnDate;
    private boolean isEnded;
}
