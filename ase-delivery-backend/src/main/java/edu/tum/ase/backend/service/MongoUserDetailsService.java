package edu.tum.ase.backend.service;

import edu.tum.ase.backend.model.AseUser;
import edu.tum.ase.backend.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


@Component
public class MongoUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    // username is the email
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        AseUser user = userRepository.findByEmail(username);

        if (user == null){
            throw new UsernameNotFoundException("AseUser not found");
        }

        return user.getUser();
    }
}
