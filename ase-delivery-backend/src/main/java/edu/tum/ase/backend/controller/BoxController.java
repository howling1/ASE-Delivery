package edu.tum.ase.backend.controller;

import edu.tum.ase.backend.model.Box;
import edu.tum.ase.backend.model.Request;
import edu.tum.ase.backend.service.BoxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@RequestMapping("/boxes")
public class BoxController {
    
    @Autowired
    BoxService boxService;
    
    @PostMapping("/create")
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public ResponseEntity<Object> createBox(@RequestBody Box box) {
        return boxService.createBox(box);
    }
    
    @PostMapping("/update")
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public ResponseEntity<Object> updateBox(@RequestBody Box box) {
        return boxService.updateBox(box);
    }


    @GetMapping("/{boxId}")
    public Box readBoxById(@PathVariable String boxId) {
        try {
            return boxService.findById(boxId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
    
 

    @PreAuthorize("hasAuthority('DISPATCHER')")
    @DeleteMapping("/{boxId}")
    public void deleteBoxById(@PathVariable String boxId) {
        boxService.deleteById(boxId);
    }

    @GetMapping("")
    public List<Box> readAllBoxes() {
        return boxService.findAll();
    }
    
    @GetMapping("/search/{text}")
    @PreAuthorize("hasAuthority('DISPATCHER')")
    public List<Box> searchByText(@PathVariable String text) {
        return boxService.searchByIdOrNameOrAddress(text);
    }
    
    @GetMapping("/customer/{id}") 
    public List<Box> findBoxesByCustomerId(@PathVariable String id){
        return boxService.searchByCustomerId(id);
    }
    
    @GetMapping("/deliverer/{id}") 
    public List<Box> findBoxesByDelivererId(@PathVariable String id){
        return boxService.searchByDelivererId(id);
    }
    //TODO 

}
