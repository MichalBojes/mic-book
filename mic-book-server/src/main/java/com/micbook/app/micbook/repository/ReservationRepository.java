package com.micbook.app.micbook.repository;

import com.micbook.app.micbook.model.Reservation;
import com.micbook.app.micbook.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource
@CrossOrigin(origins = "http://localhost:4200")
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findAllByUser(UserModel user);
}