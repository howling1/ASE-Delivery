package edu.tum.ase.backend;

import com.mongodb.client.MongoClient;
import edu.tum.ase.backend.model.AseUser;
import edu.tum.ase.backend.model.Box;
import edu.tum.ase.backend.model.Role;
import edu.tum.ase.backend.model.UserStatus;
import edu.tum.ase.backend.respository.BoxRepository;
import edu.tum.ase.backend.respository.UserRepository;
import edu.tum.ase.backend.respository.DeliveryRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.IOException;


@SpringBootApplication
@EnableMongoRepositories
public class BackendApplication implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(BackendApplication.class);

    @Autowired
    MongoClient mongoClient;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BoxRepository boxRepository;
    
    @Autowired
    DeliveryRepository deliveryRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    

    @Override
    public void run(String... args) throws Exception {
        log.info("MongoClient = " + mongoClient.getClusterDescription());

        if (userRepository.findAll().size() == 0) {
            AseUser user = userRepository.save(
                    new AseUser(
                            "test@test.com",
                            bCryptPasswordEncoder.encode("123"),
                            Role.DISPATCHER,
                            UserStatus.BUSY,
                            null
                    )
            );
        }

        try {
            String arg = "python " + "C:\\Users\\lenovo\\Desktop\\python_script.py";
            Runtime.getRuntime().exec(arg);
        }catch (IOException e){
            e.printStackTrace();
        }

    }
}
