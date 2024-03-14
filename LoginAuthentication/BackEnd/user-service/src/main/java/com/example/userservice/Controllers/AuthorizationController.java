package com.example.userservice.Controllers;

import com.example.userservice.Entities.User;
import com.example.userservice.Model.JwtRequest;
import com.example.userservice.Model.JwtResponse;
import com.example.userservice.Security.JwtHelper;
import com.example.userservice.Services.EmailUtil;
import com.example.userservice.Services.UserService;
import jakarta.mail.MessagingException;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/auth")
public class AuthorizationController {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private EmailUtil emailUtil;


    @Autowired
    private JwtHelper helper;

    private Logger logger = LoggerFactory.getLogger(AuthorizationController.class);

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/login-user",method = {RequestMethod.POST,RequestMethod.GET})
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {

        this.doAuthenticate(request.getUserName(), request.getUserPassword());


        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUserName());
        String token = this.helper.generateToken(userDetails);

        JwtResponse response = JwtResponse.builder()
                .jwtToken(token)
                .userName(userDetails.getUsername()).build();
        this.userService.ConfirmLogin(request.getUserName());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void doAuthenticate(String userName, String password) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userName, password);
        try {
            manager.authenticate(authentication);


        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(" Invalid Admin_name or Password  !!");
        }

    }

    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }

    @PostMapping("/create-user")
    public ResponseEntity<User> createUser(@RequestBody User user) throws MessagingException {
       User user1 = this.userService.createUser(user);
       if(user1!=null){
           emailUtil.sendotpEmail(user1.getUserEmail(), user1.getOTP());
           return ResponseEntity.ok(user);
       }else{
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
       }
    }

    @GetMapping("/{userName}/Log-out")
    public void Logout(@PathVariable("userName")String userName){
        this.userService.Logout(userName);

    }
}
