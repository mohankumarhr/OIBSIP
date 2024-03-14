package com.example.userservice.Services;

import com.example.userservice.Dao.UserRepository;
import com.example.userservice.Entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        User user = this.userRepository.findUserByUserName(userName).orElseThrow(()->
                new RuntimeException("User not Found!!!!"));
        if(user==null){
            new RuntimeException("User not Found");

        }
        return user;
    }
}
