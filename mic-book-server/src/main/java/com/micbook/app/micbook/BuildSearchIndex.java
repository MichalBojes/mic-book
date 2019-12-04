package com.micbook.app.micbook;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;

import org.hibernate.Session;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

/**
 * The only meaning for this class is to build the Lucene index at application
 * startup. This is needed in this example because the database is filled
 * before and each time the web application is started. In a normal web
 * application probably you don't need to do this.
 *
 * @author netgloo
 */
@Component
public class BuildSearchIndex
        implements ApplicationListener<ApplicationReadyEvent> {

    private final EntityManager entityManager;

    @Autowired
    private BuildSearchIndex(final EntityManagerFactory entityManagerFactory) {
        this.entityManager = entityManagerFactory.createEntityManager();
    }

    @Override
    public void onApplicationEvent(final ApplicationReadyEvent event) {
        try {
//            FullTextEntityManager fullTextEntityManager = Search.
//                    getFullTextEntityManager(entityManager);
//
//            fullTextEntityManager
//                    .createIndexer()
//                    .startAndWait();
//            org.hibernate.search.Search.getFullTextSession((Session) entityManager.getDelegate()).createIndexer();
//            org.hibernate.search.Search.getFullTextSession((Session) entityManager.getDelegate())
//                    .createIndexer()
//                    .startAndWait();
            FullTextEntityManager fullTextEntityManager =
                    Search.getFullTextEntityManager(entityManager);
            fullTextEntityManager.createIndexer().startAndWait();

        } catch (InterruptedException e) {
            System.out.println(
                    "An error occurred trying to build the serach index: " +
                            e.toString());
        }
        return;
    }


}
