package com.micbook.app.micbook.service;

import com.micbook.app.micbook.model.UserModel;
import com.micbook.app.micbook.repository.UserRepository;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@EnableConfigurationProperties
@SpringBootTest
public class JwtUserDetailsServiceTest {

    @Autowired
    private JwtUserDetailsService service;

    @MockBean
    private UserRepository repository;

    @Before
    public void setUp() {

        UserModel user = new UserModel();
        user.setUsername("testName");
        user.setPassword("testPassword");

        Mockito.when(repository.findByUsername(user.getName()))
                .thenReturn(user);
    }

    @Test
    void loadUserByUsername() {
        String name = "testName";
        UserDetails found = service.loadUserByUsername(name);
        assertEquals(found.getUsername(), name);
    }

    @Test
    void save() {
    }

    @Test
    void update() {
    }

    @Test
    void delete() {
    }
}