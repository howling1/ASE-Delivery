package edu.tum.ase.backend.service;

import edu.tum.ase.backend.model.*;
import edu.tum.ase.backend.respository.BoxRepository;
import edu.tum.ase.backend.respository.DeliveryRepository;
import edu.tum.ase.backend.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private BoxService boxService;

    @Autowired
    private BoxRepository boxRepository;

    @Autowired
    private UserRepository userRepository;


    public List<Delivery> findAll(String type, String id) {
        AseUser currentUser;
        try {
            currentUser = userService.findById(id);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Not authorized", e);
        }
        switch (currentUser.getRole()) {
            case DISPATCHER:
                List<Delivery> all = deliveryRepository.findAll();
                List<Delivery> filtered = new ArrayList<Delivery>();
                switch (type) {
                    case "all":
                        return all;
                    case "past":
                        for (Delivery del : all) {
                            if (del.getStatus() == DeliveryStatus.FINISHED) {
                                filtered.add(del);
                            }
                        }
                        return filtered;

                    case "active":
                        for (Delivery del : all) {
                            if (del.getStatus() != DeliveryStatus.FINISHED) {
                                filtered.add(del);
                            }
                        }
                        return filtered;
                    default:
                        return filtered;

                }

            case DELIVERER:
                return deliveryRepository.findAllByDelivererId(id);
            case CUSTOMER:
                List<Delivery> allcus = deliveryRepository.findAllByCustomerId(id);
                List<Delivery> filteredcus = new ArrayList<Delivery>();
                switch (type) {
                    case "all":
                        return allcus;
                    case "past":
                        for (Delivery del : allcus) {
                            if (del.getStatus() == DeliveryStatus.FINISHED) {
                                filteredcus.add(del);
                            }
                        }
                        return filteredcus;
                    case "active":
                        for (Delivery del : allcus) {
                            if (del.getStatus() != DeliveryStatus.FINISHED) {
                                filteredcus.add(del);
                            }
                        }
                        return filteredcus;
                    default:
                        return filteredcus;
                }
        }
        return deliveryRepository.findAll();
    }

    public List<Delivery> searchById(String id) {
        return deliveryRepository.findAllById(id);
    }

    public Delivery findById(String id) throws Exception {
        return deliveryRepository.findById(id).orElseThrow(() -> new Exception("No delivery with id: " + id));
    }

    public ResponseEntity<Object> createDelivery(Delivery delivery) {
        Delivery ret;
        //Customer check
        AseUser customer;
        try {
            customer = userService.findById(delivery.getCustomerId());
            if (customer.getRole() != Role.CUSTOMER) {
                return new ResponseEntity<>("Given user is not a customer", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Customer not found", HttpStatus.NOT_FOUND);
        }
        //Deliverer check
        AseUser deliverer;
        try {
            deliverer = userService.findById(delivery.getDelivererId());
            if (deliverer.getRole() != Role.DELIVERER) {
                return new ResponseEntity<>("Given user is not a deliverer", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Deliverer not found", HttpStatus.NOT_FOUND);
        }
        //Box check
        Box box;
        try {
            box = boxService.findById(delivery.getBoxId());
            // if box is available (empty)
            if (box.getCustomerId() == null) {
                box.setCustomerId(customer.getId());
                box.setFull();
            } else {
                if (!box.getCustomerId().equals(customer.getId())) {
                    return new ResponseEntity<>("Box occupied by other customer.", HttpStatus.BAD_REQUEST);
                }
            }
            ret = deliveryRepository.save(delivery);
            box.addDelivery(ret.getId());
            boxRepository.save(box);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>("Box not found", HttpStatus.NOT_FOUND);
        }
        //Set status to busy
        customer.setStatus(UserStatus.BUSY);
        deliverer.setStatus(UserStatus.BUSY);
        userRepository.save(customer);
        userRepository.save(deliverer);
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    public ResponseEntity<Object> updateDelivery(Delivery delivery) {
        if ( !deliveryRepository.existsById(delivery.getId()) ) {
            return new ResponseEntity<>("Delivery may have been deleted, please go back to delivery list", HttpStatus.NOT_FOUND);
        }
        //Customer check
        AseUser customer;
        try {
            customer = userService.findById(delivery.getCustomerId());
            if (customer.getRole() != Role.CUSTOMER) {
                return new ResponseEntity<>("Given user is not a customer", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Customer not found", HttpStatus.NOT_FOUND);
        }
        //Deliverer check
        AseUser deliverer;
        try {
            deliverer = userService.findById(delivery.getDelivererId());
            if (deliverer.getRole() != Role.DELIVERER) {
                return new ResponseEntity<>("Given user is not a deliverer", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Deliverer not found", HttpStatus.NOT_FOUND);
        }

        //Box check
        Box new_box;
        try {
            new_box = boxService.findById(delivery.getBoxId());
        } catch (Exception e) {
            return new ResponseEntity<>("Box not found", HttpStatus.NOT_FOUND);
        }

        Optional<Delivery> opt_delivery = deliveryRepository.findById(delivery.getId());
        if (opt_delivery.isPresent()) {
            Delivery previous_delivery = opt_delivery.get();
            // check if box needs to be updated
            if (!previous_delivery.getBoxId().equals(delivery.getBoxId())) {
                try {

                    // remove from old_box
                    Box old_box = boxService.findById(previous_delivery.getBoxId());
                    old_box.removeDelivery(delivery.getId());
                    if (old_box.getDeliveries().isEmpty()) {
                        // unbind customer & set status to available if old box's deliveries become empty
                        old_box.setCustomerId(null);
                        old_box.setAvailable();
                    }

                    // add to new box
                    if (new_box.getCustomerId() == null) {
                        new_box.setCustomerId(customer.getId());
                        new_box.setFull();
                    } else {
                        if (!new_box.getCustomerId().equals(customer.getId())) {
                            return new ResponseEntity<>("New box occupied by other customer.", HttpStatus.BAD_REQUEST);
                        }
                    }
                    new_box.addDelivery(delivery.getId());

                    // save updates
                    boxRepository.save(old_box);
                    boxRepository.save(new_box);
                } catch (Exception e) {
                    //Empty catch, triggered by boxService.findById
                }
            }
        }
        Optional<Delivery> opt_old_delivery = deliveryRepository.findById(delivery.getId());
        Delivery old_delivery = null;
        if (opt_old_delivery.isPresent()) {
            old_delivery = opt_old_delivery.get();
        }

        Delivery saved_delivery = deliveryRepository.save(delivery);

        // change user status
        // if status is changed to FINISHED
        if (saved_delivery.getStatus() == DeliveryStatus.FINISHED) {
            setUserStatusIfIdle(saved_delivery.getCustomerId(), saved_delivery.getDelivererId());
        } else {
            // check status of old customer/deliverer
            if (old_delivery != null) {
                setUserStatusIfIdle(old_delivery.getCustomerId(), old_delivery.getDelivererId());
            }
            // set status of new customer/deliverer to busy
            customer.setStatus(UserStatus.BUSY);
            deliverer.setStatus(UserStatus.BUSY);
            userRepository.save(customer);
            userRepository.save(deliverer);
        }

        return new ResponseEntity<>(saved_delivery, HttpStatus.OK);
    }


    public ResponseEntity<Object> readDeliveryDetail(String deliveryId) {
        Optional<Delivery> opt_delivery = deliveryRepository.findById(deliveryId);
        if (opt_delivery.isPresent()) {
            Delivery delivery = opt_delivery.get();
            HashMap<String, String> map = new HashMap<>();
            map.put("deliveryId", delivery.getId());
            map.put("status", delivery.getStatus().toString());
            map.put("date", delivery.getCreatedAt().toString());
            AseUser customer;
            AseUser deliverer;
            Box box;
            try {
                customer = userService.findById(delivery.getCustomerId());
            } catch (Exception e) {
                return new ResponseEntity<>("Customer not found", HttpStatus.NOT_FOUND);
            }
            try {
                deliverer = userService.findById(delivery.getDelivererId());
            } catch (Exception e) {
                return new ResponseEntity<>("Deliverer not found", HttpStatus.NOT_FOUND);
            }
            try {
                box = boxService.findById(delivery.getBoxId());
            } catch (Exception e) {
                return new ResponseEntity<>("Box not found", HttpStatus.NOT_FOUND);
            }

            map.put("customerId", delivery.getCustomerId());
            map.put("customerEmail", customer.getEmail());
            map.put("delivererId", delivery.getDelivererId());
            map.put("delivererEmail", deliverer.getEmail());
            map.put("boxName", box.getName());
            map.put("address", box.getAddress());
            map.put("station", box.getStationName());
            map.put("boxId", delivery.getBoxId());

            return new ResponseEntity<>(map, HttpStatus.OK);
        }
        return new ResponseEntity<>("Delivery not found.", HttpStatus.NOT_FOUND);
    }

    public void deleteDelivery(String id) {
        Optional<Delivery> opt_delivery = deliveryRepository.findById(id);
        if (opt_delivery.isPresent()) {
            Delivery delivery = opt_delivery.get();
            Optional<Box> opt_box = boxRepository.findById(delivery.getBoxId());
            if (opt_box.isPresent()) {
                Box related_box = opt_box.get();
                deliveryRepository.deleteById(id);
                related_box.removeDelivery(id);

                if (related_box.getDeliveries().isEmpty()) {
                    // unbind customer & set status to available if old box's deliveries become empty
                    related_box.setCustomerId(null);
                    related_box.setAvailable();
                }
                boxRepository.save(related_box);
            }
            setUserStatusIfIdle(delivery.getCustomerId(), delivery.getDelivererId());
        }
    }

    public List<Delivery> findAllByBoxId(String id) {
        return deliveryRepository.findAllByBoxId(id);
    }

    // helper function
    private boolean isUserIdle(String userId, boolean isCustomer) {
        return isCustomer ?
                !deliveryRepository.existsByCustomerIdAndStatusIsNot(userId, DeliveryStatus.FINISHED) :
                !deliveryRepository.existsByDelivererIdAndStatusIsNot(userId, DeliveryStatus.FINISHED);
    }

    private void setUserStatusIfIdle(String customerId, String delivererId) {
        if (isUserIdle(customerId, true)) {
            System.out.println("customer in");
            try {
                AseUser customer = userService.findById(customerId);
                customer.setStatus(UserStatus.IDLE);
                userRepository.save(customer);
            } catch (Exception e) {
            }
        }
        if (isUserIdle(delivererId, false)) {
            System.out.println("deliverer in");
            try {
                AseUser deliverer = userService.findById(delivererId);
                deliverer.setStatus(UserStatus.IDLE);
                userRepository.save(deliverer);
            } catch (Exception e) {
            }
        }
    }

}
