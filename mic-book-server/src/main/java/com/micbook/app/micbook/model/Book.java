package com.micbook.app.micbook.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.apache.lucene.analysis.core.KeywordAnalyzer;
import org.apache.lucene.analysis.core.LowerCaseFilterFactory;
import org.apache.lucene.analysis.core.WhitespaceTokenizerFactory;
import org.apache.lucene.analysis.ngram.EdgeNGramFilterFactory;
import org.apache.lucene.analysis.snowball.SnowballPorterFilterFactory;
import org.hibernate.search.annotations.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
@Indexed
@AnalyzerDef(name = "customanalyzer", tokenizer = @TokenizerDef(factory = WhitespaceTokenizerFactory.class), filters = {
        @TokenFilterDef(factory = LowerCaseFilterFactory.class),
        @TokenFilterDef(factory = SnowballPorterFilterFactory.class, params = {@Parameter(name = "language", value = "English")}),
        @TokenFilterDef(factory = EdgeNGramFilterFactory.class, params = {@Parameter(name = "maxGramSize", value = "15")})

})
public class Book {
    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    @Field
    @Analyzer(definition = "customanalyzer")
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

    @Field
    @Analyzer(impl = KeywordAnalyzer.class)
    private String topic;

    @NonNull
    private String publicationType;

}