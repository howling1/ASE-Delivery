package edu.tum.ase.backend.respository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.ResponseEntity;

import edu.tum.ase.backend.model.Box;


public interface BoxRepository extends MongoRepository<Box, String>{
    
    
    //Create and Update
    public Box save(Box box);
    
    // Read by id 
    public Optional<Box> findById(String id);
    
    // Delete by id
    public void deleteById(String id);
    
    // find all boxes
    List<Box> findAll();

    public List<Box> findByCustomerId(String text);
    
    public List<Box> findByDeliveries(String id);

    public List<Box> findAllByIdOrNameOrAddressContaining(String text, String text2, String text3);

    public List<Box> findByName(String text);
    

}
