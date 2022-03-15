package edu.tum.ase.backend.respository;

import edu.tum.ase.backend.model.Delivery;
import edu.tum.ase.backend.model.DeliveryStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
import java.util.List;

public interface DeliveryRepository extends MongoRepository<Delivery, String> {

    // Create and Update
    Delivery save(Delivery delivery);

    // Read by id
    Optional<Delivery> findById(String id);

    // Find all by id
    List<Delivery> findAllById(String id);

    // Get all deliveries
    List<Delivery> findAll();

    // Delete by id
    void deleteById(String id);
    
    List<Delivery> findAllByBoxId(String id);

    List<Delivery> findAllByDelivererId(String id);

    List<Delivery> findAllByCustomerId(String id);

    boolean existsByCustomerIdAndStatusIsNot(String id, DeliveryStatus status);

    boolean existsByDelivererIdAndStatusIsNot(String id, DeliveryStatus status);
}