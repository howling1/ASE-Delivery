package edu.tum.ase.backend.respository;

import edu.tum.ase.backend.model.Request;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RequestRepository extends MongoRepository<Request, String> {

    // Create
    Request save(Request request);

    // Delete by id
    void deleteById(String id);

    // Read all requests
    List<Request> findAll();

    // Search all requests by email
    List<Request> findAllByEmailContaining(String email);

    // Exists by email
    boolean existsByEmail(String email);

    //TODO: add APIs here...
}
