package edu.tum.ase.backend.service;

import edu.tum.ase.backend.model.Request;
import edu.tum.ase.backend.respository.RequestRepository;
import edu.tum.ase.backend.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<Request> saveRequest(Request request) {
        if (requestRepository.existsByEmail(request.getEmail())) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
        Request newRequest = requestRepository.save(request);
        return new ResponseEntity<Request>(newRequest, HttpStatus.OK);
    }

    public void deleteById(String id) {
        requestRepository.deleteById(id);
    }

    public List<Request> findAll() {
        return requestRepository.findAll();
    }

    public List<Request> searchByEmail(String text) {
        return requestRepository.findAllByEmailContaining(text);
    }

    //TODO: add more functions

}
