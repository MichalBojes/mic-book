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
                        "authorName")
                .matching(text)
                .createQuery();

        // wrap Lucene query in an Hibernate Query object
        FullTextQuery jpaQuery = fullTextEntityManager
                .createFullTextQuery(query, Book.class);

        // execute search and return results (sorted by relevance as default)
        @SuppressWarnings("unchecked")
        List<Book> results = jpaQuery.getResultList();

        return results;
    } // method search


//    @Transactional
//    public List<Book> fuzzySearch(String searchTerm) {
//
//        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
//
//        QueryBuilder qb = fullTextEntityManager
//                .getSearchFactory()
//                .buildQueryBuilder()
//                .forEntity(Book.class)
//                .get();
//
//        Query luceneQuery = qb
//                .keyword()
//                .fuzzy()
//                .withEditDistanceUpTo(1)
//                .withPrefixLength(1)
//                .onFields("title",
//                        "otherTitle",
//                        "author_name")
//                .matching(searchTerm)
//                .createQuery();
//
//        javax.persistence.Query jpaQuery = fullTextEntityManager.createFullTextQuery(luceneQuery, Book.class);
//
//        List<Book> BaseballCardList = null;
//        try {
//            BaseballCardList = jpaQuery.getResultList();
//        } catch (NoResultException nre) {
//
//        }
//        return BaseballCardList;
//    }
}

