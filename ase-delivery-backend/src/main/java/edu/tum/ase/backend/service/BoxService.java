package edu.tum.ase.backend.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import edu.tum.ase.backend.model.Box;
import edu.tum.ase.backend.model.Delivery;
import edu.tum.ase.backend.respository.BoxRepository;
import edu.tum.ase.backend.respository.DeliveryRepository;

@Service
public class BoxService {

    @Autowired
    private BoxRepository boxRepository;
    
    @Autowired
    private DeliveryRepository deliveryRepository;
    
    public ResponseEntity<Object> createBox(Box box) {
        List<Box> boxd = searchByName(box.getName());
        if(boxd.size()>0) {
            return new ResponseEntity<>("Name already exists!", HttpStatus.BAD_REQUEST);
        }      
        Box newBox = boxRepository.save(box);
        return new ResponseEntity<>(newBox, HttpStatus.OK);

    }
    
    public Box findById(String id) throws Exception {
        return boxRepository.findById(id).orElseThrow(() -> new Exception("No project with id " + id));
    }
    
    public void deleteById(String id) {
        boxRepository.deleteById(id);
    }
    
    public List<Box> findAll() {
        return boxRepository.findAll();
    }


    public List<Box> searchByIdOrNameOrAddress(String text) {
        return boxRepository.findAllByIdOrNameOrAddressContaining(text, text, text);
    }


    public List<Box> searchByCustomerId(String id) {
        return boxRepository.findByCustomerId(id);
    }

    public List<Box> searchByDelivererId(String id) {
        
        //find all deliveries for deliverer
        
       List<Box> result = new ArrayList<Box>();
        
        List<Delivery> dels = deliveryRepository.findAllByDelivererId(id);
        //
        for(Delivery del:dels) {
            List<Box> tem = boxRepository.findByDeliveries(del.getId());
            result.addAll(tem);
        }
        
        //remove duplicates
        Set<Box> result1 = new HashSet<>(result);
        result.clear();
        result.addAll(result1);
        
        return result;
    }

    public List<Box> searchByName(String name) {
        return boxRepository.findByName(name);
    }

    public ResponseEntity<Object>updateBox(Box box) {
       List<Box> boxd = searchByName(box.getName());
        if(boxd.size()==1 && boxd.get(0).getId().equals(box.getId())) {
            Box newBox =  boxRepository.save(box);
            return new ResponseEntity<>(newBox, HttpStatus.OK);
        } 
        else if(boxd.size()<1) {
            Box newBox =  boxRepository.save(box);
            return new ResponseEntity<>(newBox, HttpStatus.OK);
        }
        return new ResponseEntity<>("Name already exists!", HttpStatus.BAD_REQUEST);
        }
}
