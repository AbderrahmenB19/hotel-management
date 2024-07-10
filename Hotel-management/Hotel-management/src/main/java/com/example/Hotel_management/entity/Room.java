package com.example.Hotel_management.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Table(name = "_room")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Room {
    @Id
    @GeneratedValue
    private Integer id ;
    private String BookingConfirmationCode;
    private String roomPhotoUrl;
    private String roomType;
    private String roomDescription;
    private Double roomPrice;
    @OneToMany(mappedBy = "room" ,fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    private List<Booking> bookings= new ArrayList<>();

    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", BookingConfirmationCode='" + BookingConfirmationCode + '\'' +
                ", roomPhotoUrl='" + roomPhotoUrl + '\'' +
                ", roomDescription='" + roomDescription + '\'' +
                ", roomPrice=" + roomPrice +
                '}';
    }
}
