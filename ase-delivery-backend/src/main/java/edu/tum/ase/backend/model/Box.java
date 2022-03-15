package edu.tum.ase.backend.model;

import com.mongodb.lang.NonNull;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "boxes")
public class Box {

    @Id
    private String id;

    @Indexed(unique = true)
    @NonNull
    private String name;

    @NonNull
    private String station_name;

    @NonNull
    private String address;

    private BoxStatus status;

    @NonNull
    private String raspberry;

    private List<String> deliveries;
    
    private String customerId;
    
    private String delivererId;

    protected Box() {
    }

    public Box(String name, String station_name, String address, String raspberry) {
        this.name = name;
        this.station_name = station_name;
        this.address = address;
        this.raspberry = raspberry;
        this.status = BoxStatus.AVAILABLE;
        this.deliveries = new ArrayList<String>();
        this.customerId = null;
    }

    // getters and setters

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStationName() {
        return station_name;
    }

    public void setStationName(String station_name) {
        this.station_name = station_name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRaspberry() {
        return raspberry;
    }

    public void setRasopberry(String raspberry) {
        this.raspberry = raspberry;
    }

    public List<String> getDeliveries() {
        return deliveries;
    }

    public void addDelivery(String deliveryId) {
        if (deliveries == null) {
            deliveries = new ArrayList<String>();
        }
        deliveries.add(deliveryId);
    }

    public void removeDelivery(String delivererId) {
        deliveries.remove(delivererId);
    }

    public String getCustomerId() {
        return customerId;
    }
    
    public void setCustomerId(String id) {
        this.customerId=id;
    }

    public BoxStatus getStatus() {
        return status;
    }

    public void setAvailable() {
        this.status = BoxStatus.AVAILABLE;
    }

    public void setFull() {
        this.status = BoxStatus.FULL;
    }
}

