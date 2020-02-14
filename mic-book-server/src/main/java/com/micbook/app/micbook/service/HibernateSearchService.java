package com.micbook.app.micbook.service;

import com.micbook.app.micbook.model.Book;
import org.apache.lucene.search.Query;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.springframework.stereotype.Service;
import org.hibernate.search.jpa.FullTextQuery;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;


@Service
public class HibernateSearchService {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public List<Book> search(String text) {

        // get the full text entity manager
        FullTextEntityManager fullTextEntityManager =
                Search.getFullTextEntityManager(entityManager);

        // create the query using Hibernate Search query DSL
        QueryBuilder queryBuilder = fullTextEntityManager
                .getSearchFactory()
                .buildQueryBuilder()
                .forEntity(Book.class)
                .get();

        // a very basic query by keywords
        Query query = queryBuilder
                .keyword()
                .fuzzy()
                .onFields("title",
                        "otherTitle",
                        "authorName",
                        "topic")
                .matching(text)
                .createQuery();

        // wrap Lucene query in an Hibernate Query object
        FullTextQuery jpaQuery = fullTextEntityManager
                .createFullTextQuery(query, Book.class);

        // execute search and return results (sorted by relevance as default)
        @SuppressWarnings("unchecked")
        List<Book> results = jpaQuery.getResultList();

        return results;
    }

}

