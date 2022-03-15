package edu.tum.ase.backend.controller;

import edu.tum.ase.backend.model.AseUser;
import edu.tum.ase.backend.service.UserService;
import edu.tum.ase.backend.controller.UserController;
import edu.tum.ase.backend.service.EmailService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @Autowired
    UserService userService;

    String customerId;

    AseUser aseUser;

    String emailAddress;

    @PostMapping("/email_inbox")
    public void sendMailInbox(@RequestBody JSONObject jsonParam) throws JSONException {

        customerId = jsonParam.getString("customerId");

        try{
            aseUser = userService.findById(customerId);
            emailAddress = aseUser.getEmail();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }

        emailService.sendSimpleMessage(emailAddress,
                "New delivery(ies) have arrived.",
                "Dear customer, new item(s) have been delivered in your box.");
    }

    @PostMapping("/email_finished")
    public void sendMailFinished(@RequestBody JSONObject jsonParam) throws JSONException {

        customerId = jsonParam.getString("customerId");
        System.out.println(customerId);

        try{
            aseUser = userService.findById(customerId);
            emailAddress = aseUser.getEmail();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }

        emailService.sendSimpleMessage(emailAddress,
                "You have taken your deliveries",
                "Dear customer, you have taken your deliveries");
    }
}
