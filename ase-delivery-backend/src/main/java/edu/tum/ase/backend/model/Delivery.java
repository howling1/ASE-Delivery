package edu.tum.ase.backend.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mongodb.lang.NonNull;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "deliveries")
public class Delivery {

    @Id
    private String id;

    @NonNull
    private String customerId;

    @NonNull
    private String delivererId;

    @NonNull
    private String boxId;

    @CreatedDate
    private Date createdAt;

    private DeliveryStatus status;

    @JsonCreator
    public Delivery(@JsonProperty(value = "customerId") String customerId,@JsonProperty(value = "delivererId") String delivererId, @JsonProperty(value = "boxId")String boxId){
        this.customerId = customerId;
        this.delivererId = delivererId;
        this.boxId = boxId;
        this.status = DeliveryStatus.CREATED;
        this.createdAt = new Date();
    }

    public String getId() {
        return id;
    }

    public String getCustomerId() {
        return customerId;
    }

    public String getDelivererId() {
        return delivererId;
    }

    public String getBoxId() {
        return boxId;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public DeliveryStatus getStatus() {
        return status;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public void setDelivererId(String delivererId) {
        this.delivererId = delivererId;
    }

    public void setBoxId(String boxId) {
        this.boxId = boxId;
    }

    public void setStatus(DeliveryStatus status) {
        this.status = status;
    }
}