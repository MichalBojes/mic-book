package com.micbook.app.micbook.service;

import java.util.ArrayList;

import com.micbook.app.micbook.dto.UserDTO;
import com.micbook.app.micbook.model.UserModel;
import com.micbook.app.micbook.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userDao;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserModel user = userDao.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new User(user.getUsername(), user.getPassword(),
                new ArrayList<>());
    }

    public UserModel save(UserDTO user) {
        UserModel newUser = new UserModel();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        newUser.setName(user.getName());
        newUser.setSurname(user.getSurname());
        newUser.setStatus(user.getStatus());
        newUser.setEmail(user.getEmail());
        newUser.setAge(user.getAge());
        return userDao.save(newUser);
    }

    public UserModel update(UserDTO user) {
        UserModel newUser = userDao.findByUsername(user.getUsername());
        if (user.getPassword() != null && !user.getPassword().equals("")) {
            newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        }
        newUser.setName(user.getName());
        newUser.setSurname(user.getSurname());
        newUser.setEmail(user.getEmail());
        newUser.setAge(user.getAge());
        newUser.setStatus(user.getStatus());
        return userDao.save(newUser);
    }

    public void delete(UserDTO user) {
        userDao.deleteById(user.getId());
    }
}
