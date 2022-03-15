package edu.tum.ase.backend.controller;

import edu.tum.ase.backend.model.AseUser;
import edu.tum.ase.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public AseUser createUser(@RequestBody AseUser user) {
        // create AseUser with password encryption
        return userService.saveUser(new AseUser(
                user.getEmail(),
                bCryptPasswordEncoder.encode(user.getPassword()),
                user.getRole(),
                user.getStatus(),
                user.getRfid()
        ));
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public AseUser readUserById(@PathVariable String userId) {
        try {
            return userService.findById(userId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping("/update") //update requires the same id of the target
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public AseUser updateUser(@RequestBody AseUser user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userService.saveUser(user);
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public void deleteUserById(@PathVariable String userId) {
        userService.deleteById(userId);
    }

    @GetMapping("")
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public List<AseUser> readUsers() {
        return userService.findAll();
    }

    @GetMapping("/search/{text}")
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public List<AseUser> searchUsersByIdOrEmail(@PathVariable String text) {
        return userService.searchByIdOrEmail(text);
    }

    //TODO
}
