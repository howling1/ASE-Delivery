package edu.tum.ase.backend.controller;

import edu.tum.ase.backend.respository.UserRepository;
import edu.tum.ase.backend.service.AuthService;
import edu.tum.ase.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;

@RestController
@RequestMapping("/auth")
// filter
public class AuthController {
    @Autowired
    private AuthService authService;
    
    @Autowired
    private UserService userService;

    @GetMapping("/csrf")
    public String csrf() {
        return "Please get the CSRF Token in the response";
    }

    @PostMapping
    public ResponseEntity<String> login(@RequestHeader("Authorization") String authorization,
                                        HttpServletRequest request,
                                        HttpServletResponse response) {
        return authService.authenticateUser(authorization, request, response);
    }

    // returns the current logged-in user
    @GetMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> currentUser() {
        HashMap<String, String> user = new HashMap<>();

        Authentication authContext = SecurityContextHolder.getContext().getAuthentication();
        String email = authContext.getName();
        String role = authContext.getAuthorities().toString();
        String id = userService.findByEmail(email).getId();
        user.put("email", email);
        // TODO: might cause bugs at some point
        user.put("role", role.substring(1, role.length() - 1));
        user.put("id", id);

        return new ResponseEntity<Object>(user, HttpStatus.OK);
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        return authService.removeCurrentUser(response);
    }
}
