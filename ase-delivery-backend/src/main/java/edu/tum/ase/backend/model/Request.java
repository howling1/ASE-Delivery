package edu.tum.ase.backend.model;

import com.mongodb.lang.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "requests")
public class Request {

    @Id
    private String id;

    @Indexed(unique = true)
    @NonNull
    private String email;

    @NonNull
    private Role role;

    protected Request() {
    }

    public Request(String email, Role role) {
        this.email = email;
        this.role = role;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }
}
