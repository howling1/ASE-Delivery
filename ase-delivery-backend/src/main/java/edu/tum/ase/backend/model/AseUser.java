package edu.tum.ase.backend.model;

import com.mongodb.lang.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Arrays;
import java.util.List;

@Document(collection = "users")
public class AseUser { //implements UserDetails {

    @Id
    private String id;

    @Indexed(unique = true)
    @NonNull
    private String email;

    @NonNull
    private String password;

    @NonNull
    private Role role;

    @NonNull
    private UserStatus status;

    private String rfid; // is empty for dispatcher

    protected AseUser() {
    }

    public AseUser(String email, String password, Role role, UserStatus status, String rfid) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.status = status;
        this.rfid = rfid;
    }

    // getters and setters

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public String getRfid() {
        return rfid;
    }

    public void setRfid(String rfid) {
        this.rfid = rfid;
    }

    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }

    public List<SimpleGrantedAuthority> getAuthorities() {
        return Arrays.asList(new SimpleGrantedAuthority(role.toString()));
    }

    // this User implements UserDetails
    public User getUser() {
        return new User(email, password, getAuthorities());
    }
}
