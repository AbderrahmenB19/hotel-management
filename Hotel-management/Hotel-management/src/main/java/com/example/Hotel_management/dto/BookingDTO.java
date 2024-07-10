package com.example.Hotel_management.dto;

import com.example.Hotel_management.entity.Room;
import com.example.Hotel_management.user.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookingDTO {
    private Integer Id;

    private LocalDate checkInDate;


    private LocalDate checkOutDate;


    private int numOfAdults;


    private int numOfChildren;

    private int totalNumOfGuest;


    private String bookingConfigurationCode;

    private UserDTO user;

    private RoomDTO room;
}
