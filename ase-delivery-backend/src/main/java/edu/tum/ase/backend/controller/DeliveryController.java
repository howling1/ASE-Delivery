package edu.tum.ase.backend.controller;

import edu.tum.ase.backend.model.AseUser;
import edu.tum.ase.backend.model.Delivery;
import edu.tum.ase.backend.service.DeliveryService;
import edu.tum.ase.backend.service.EmailService;
import edu.tum.ase.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/delivery")
public class DeliveryController {

    @Autowired
    DeliveryService deliveryService;

    @Autowired
    EmailService emailService;

    @Autowired
    UserService userService;

    @GetMapping("/{type}/{id}")
    @PreAuthorize("hasAuthority('DISPATCHER') || hasAuthority('DELIVERER') || hasAuthority('CUSTOMER')")
    public List<Delivery> getAllDelivery(@PathVariable String type, @PathVariable String id) {
        return deliveryService.findAll(type, id);
    }

    @GetMapping("/findById/{id}")
    @PreAuthorize("hasAuthority('DISPATCHER') || hasAuthority('DELIVERER')")
    public Delivery findById(@PathVariable String id) {
        try {
            return deliveryService.findById(id);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Delivery with id: " + id + "not found.", e);
        }
    }

    @GetMapping("/findAllById/{id}")
    @PreAuthorize("hasAuthority('DISPATCHER') || hasAuthority('DELIVERER') || hasAuthority('CUSTOMER')")
    public List<Delivery> searchById(@PathVariable String id) {
        return deliveryService.searchById(id);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public ResponseEntity<Object> createDelivery(@RequestBody Delivery delivery) {

        ResponseEntity<Object> new_delivery = deliveryService.createDelivery(delivery);

        String customerId = delivery.getCustomerId();
        AseUser aseUser;
        String emailAddress;

        try{
            aseUser = userService.findById(customerId);
            emailAddress = aseUser.getEmail();
            emailService.sendSimpleMessage(emailAddress,
                    "You have a new delivery.",
                    "Dear customer, a new delivery is created.");
        } catch (Exception e) {
            //empty catch
        }

        return new_delivery;
    }

    @PostMapping("/update")
    @PreAuthorize("hasAuthority('DISPATCHER') || hasAuthority('DELIVERER')")
    public ResponseEntity<Object> updateDelivery(@RequestBody Delivery delivery) {
        return deliveryService.updateDelivery(delivery);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public void deleteDelivery(@PathVariable String id) {
        deliveryService.deleteDelivery(id);
    }

    @GetMapping("/detail/{id}")
    @PreAuthorize("hasAuthority('DISPATCHER') || hasAuthority('DELIVERER') || hasAuthority('CUSTOMER')")
    public ResponseEntity<Object> readDetail(@PathVariable String id) {
        System.out.println( deliveryService.readDeliveryDetail(id));
        return deliveryService.readDeliveryDetail(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/findAllByBoxId/{id}")
    public List<Delivery> searchByBoxID(@PathVariable String id) {
        return deliveryService.findAllByBoxId(id);
    }
    
}