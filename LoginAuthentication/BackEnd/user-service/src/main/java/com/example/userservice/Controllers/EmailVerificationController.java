package com.example.userservice.Controllers;

import com.example.userservice.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/verify")
public class EmailVerificationController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/verify-account",method={RequestMethod.GET,RequestMethod.PUT})
    public ResponseEntity<String> verifyAccount(@RequestParam String email,@RequestParam String OTP){
        return new ResponseEntity<>(userService.verifyAccount(email,OTP), HttpStatus.OK);
    }

    @PutMapping("/regenerate-otp")
    public ResponseEntity<String> regenerateOTP(@RequestParam String email){
        return new ResponseEntity<>(userService.regenerateOTP(email),HttpStatus.OK);
    }

    @PutMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email){
        return new ResponseEntity<>(userService.forgotPassword(email),HttpStatus.OK);

    }

    @PutMapping("/set-password")
    public ResponseEntity<String> setPassword(@RequestParam String email,@RequestHeader String newPassword){
        return new ResponseEntity<>(userService.setPassword(email,newPassword), HttpStatus.OK);

    }
}
