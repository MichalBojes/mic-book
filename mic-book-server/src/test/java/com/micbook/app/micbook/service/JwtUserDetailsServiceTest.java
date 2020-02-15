package com.micbook.app.micbook.service;

import com.micbook.app.micbook.dto.UserDTO;
import com.micbook.app.micbook.model.UserModel;
import com.micbook.app.micbook.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class JwtUserDetailsServiceTest {

    @Mock
    private UserRepository userDao;

    @Mock
    private PasswordEncoder bcryptEncoder;

    @InjectMocks
    private JwtUserDetailsService service;

    @BeforeEach
    void setMockOutput() {

        UserModel user = new UserModel();
        user.setUsername("testName");
        user.setPassword("testPassword");

        UserModel updateUser = new UserModel();
        updateUser.setUsername("testName");
        updateUser.setPassword("updatePassword");

        when(bcryptEncoder.encode("testPassword")).thenReturn("testPassword");
        when(bcryptEncoder.encode("updatePassword")).thenReturn("updatePassword");
        when(userDao.findByUsername("testName")).thenReturn(user);
        when(userDao.save(user)).thenReturn(user);
        when(userDao.save(updateUser)).thenReturn(updateUser);

    }

    @DisplayName("Test Mock UserRepository + JwtUserDetailsService")
    @Test
    void loadUserByUsername() {
        String name = "testName";
        UserDetails found = service.loadUserByUsername(name);
        assertEquals(found.getUsername(), name);

    }

    @Test
    void save() {
        String name = "testName";
        UserDTO newUser = new UserDTO();
        newUser.setUsername(name);
        newUser.setPassword("testPassword");

        UserModel saved = service.save(newUser);
        assertEquals(saved.getUsername(), name);

    }

    @Test
    void update() {
        String name = "testName";
        UserModel saved = userDao.findByUsername(name);

        UserDTO newUser = new UserDTO();
        newUser.setUsername(saved.getUsername());
        newUser.setPassword("updatePassword");
        UserModel updated = service.save(newUser);
        assertNotEquals(updated.getPassword(), saved.getPassword());
    }

}