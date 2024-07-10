package com.example.Hotel_management.entity;

import com.example.Hotel_management.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "_booking")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Booking {
    @Id
    @GeneratedValue

    private Integer Id;
    @NotNull(message = "check in date is required")
    private LocalDate checkInDate;

    @NotNull(message = "check in date is required")
    @Future(message = "check out must be in future")
    private LocalDate checkOutDate;


    @Min(value = 1, message = "number of adults must be not less than  1")
    private int numOfAdults;


    @Min(value = 0, message = "number of children must be not less than  0")
    private int numOfChildren;

    private int totalNumOfGuest;


    private String bookingConfirmationCode;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id" )
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id" )
    private Room room;


    public void calculateTotalNumberOfGuest(){
        this.totalNumOfGuest= this.numOfAdults+ this.numOfAdults;

    }

    public void setNumOfAdults(int numOfAdults) {
        this.numOfAdults = numOfAdults;
        calculateTotalNumberOfGuest();
    }

    public void setNumOfChildren(int numOfChildren) {
        this.numOfChildren = numOfChildren;
        calculateTotalNumberOfGuest();
    }

    @Override
    public String toString() {
        return "Booking{" +
                "Id=" + Id +
                ", checkInDate=" + checkInDate +
                ", checkOutDate=" + checkOutDate +
                ", numOfAdults=" + numOfAdults +
                ", numOfChildren=" + numOfChildren +
                ", totalNumOfGuest=" + totalNumOfGuest +
                ", bookingConfigurationCode='" + bookingConfirmationCode + '\'' +

                '}';
    }
}
