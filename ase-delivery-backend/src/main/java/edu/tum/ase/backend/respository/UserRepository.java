package edu.tum.ase.backend.respository;

import edu.tum.ase.backend.model.AseUser;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<AseUser, String> {

    // Create and Update
    AseUser save(AseUser user);

    // Read by id
    Optional<AseUser> findById(String id);

    // Delete by id
    void deleteById(String id);

    // Read all by role
    List<AseUser> findAll();

    // Search by id or email containing
    List<AseUser> findAllByIdOrEmailContaining(String text1, String text2);

    // Find user by email
    AseUser findByEmail(String email);

    // Exists by email
    boolean existsByEmail(String email);

    //TODO: add APIs here...
}
