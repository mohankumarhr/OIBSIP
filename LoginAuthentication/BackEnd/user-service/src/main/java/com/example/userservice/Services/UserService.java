package com.example.userservice.Services;

import com.example.userservice.Dao.UserRepository;
import com.example.userservice.Entities.User;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
public class UserService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private OTPutil otPutil;


    @Autowired
    private EmailUtil emailUtil;


    ZoneId zoneId = ZoneId.of("Asia/Calcutta");

    public User createUser(User user) throws MessagingException {
        String OTP = otPutil.generateOtp();
//        emailUtil.sendotpEmail(user.getUserEmail(), OTP);
        user.setUserPassword(passwordEncoder.encode(user.getPassword()));
        user.setUserASeller(false);
        user.setOTP(OTP);
        user.setOtpGeneratedTime(LocalDateTime.now());
        return userRepository.save(user);
    }


    public void ConfirmLogin(String userName){

        User user = this.userRepository.findUserByUserName(userName).orElseThrow(()->
                new RuntimeException("User Not Found!!!!"));
        ZoneId zoneId = ZoneId.of("Asia/Calcutta");
        System.out.println(LocalDateTime.now(zoneId));
        user.setLoggedIn(true);
        user.setLoggedInTime(LocalDateTime.now(zoneId));
        this.userRepository.save(user);

    }
    public void Logout(String userName){
        User user = this.userRepository.findUserByUserName(userName).orElseThrow(()->
                new RuntimeException("User Not Found!!!!"));
        user.setLoggedIn(false);
        user.setLoggedInTime(null);
        this.userRepository.save(user);
    }

    public String verifyAccount(String email, String otp) {
        User user = userRepository.findUserByUserEmail(email).orElseThrow(()
        -> new RuntimeException("User not found with this email : "+email));

        if(user.getOTP().equals(otp) && Duration.between(user.getOtpGeneratedTime(),LocalDateTime.now(zoneId)).getSeconds() < (1*60)){
            user.setVerified(true);
            userRepository.save(user);
            return "OTP verified you can login";
        }

        return "Please regenerate OTP and try again";

    }

    public String regenerateOTP(String email) {
        User user = userRepository.findUserByUserEmail(email).orElseThrow(()
                -> new RuntimeException("User not found with this email : "+email));

        String OTP = otPutil.generateOtp();
        try{
            emailUtil.sendotpEmail(email,OTP);

        }catch (MessagingException ex){
            throw new RuntimeException("Unable to send OTP please try again");
        }

        ZoneId zoneId = ZoneId.of("Asia/Calcutta");
        user.setOTP(OTP);
        user.setOtpGeneratedTime(LocalDateTime.now(zoneId));
        userRepository.save(user);
        return "Email sent...Please verify account within 1 minute";


    }




    public String forgotPassword(String email) {
        User user = this.userRepository.findUserByUserEmail(email).orElseThrow(
                () -> new RuntimeException("User not found with this email : " + email)
        );
        try {
            emailUtil.sendsetPasswordEmail(email);
        }catch (Exception e){
            throw new RuntimeException("Unable to set password please try again");
        }

        return "Please check your email to set new password to your account";
    }

    public String setPassword(String email, String newPassword) {
        User user = this.userRepository.findUserByUserEmail(email).orElseThrow(
                () -> new RuntimeException("User not found with this email : " + email)
        );

        user.setUserPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return "New Password set successfully login with new password";
    }
}
