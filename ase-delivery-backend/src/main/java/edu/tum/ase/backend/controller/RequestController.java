package edu.tum.ase.backend.controller;

import edu.tum.ase.backend.model.Request;
import edu.tum.ase.backend.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/requests")
public class RequestController {

    @Autowired
    RequestService requestService;

    @PostMapping({"/create"})
    public ResponseEntity<Request> createRequest(@RequestBody Request request) {
        return requestService.saveRequest(request);
    }

    @DeleteMapping("/{requestId}")
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public void deleteRequestById(@PathVariable String requestId) {
        requestService.deleteById(requestId);
    }

    @GetMapping("")
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public List<Request> readRequests() {
        return requestService.findAll();
    }

    @GetMapping("/search/{text}")
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public List<Request> searchByEmail(@PathVariable String text) {
        return requestService.searchByEmail(text);
    }

    //TODO
}
