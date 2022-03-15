package edu.tum.ase.backend.service;

import edu.tum.ase.backend.model.AseUser;
import edu.tum.ase.backend.model.Role;
import edu.tum.ase.backend.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public AseUser saveUser(AseUser user) {
        if(user.getRole() == Role.DISPATCHER) {
            user.setRfid(null);
        }
        return userRepository.save(user);
    }

    public AseUser findById(String id) throws Exception {
        return userRepository.findById(id).orElseThrow(() -> new Exception("No user with id " + id));
    }

    public void deleteById(String id) {
        userRepository.deleteById(id);
    }

    public List<AseUser> findAll() {
        return userRepository.findAll();
    }

    
    public AseUser findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    
    public List<AseUser> searchByIdOrEmail(String text) {
        return userRepository.findAllByIdOrEmailContaining(text, text);
    }

    //TODO: add more functions
}
