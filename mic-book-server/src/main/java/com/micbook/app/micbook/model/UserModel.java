package com.micbook.app.micbook.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
public class UserModel {

    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    private String username;

    @NonNull
    @JsonIgnore
    private String password;

    private String name;
    private String surname;
    private String status;
    private String email;
    private Long age;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserModel userModel = (UserModel) o;
        return username.equals(userModel.username) && password.equals(userModel.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username);
    }
}
