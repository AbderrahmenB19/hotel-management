package com.example.Hotel_management.dto;

import com.example.Hotel_management.entity.Booking;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder

public class RoomDTO {

    private Integer id;
    @NotNull(message="100")
    @NotEmpty(message = "100")
    private String roomType;


    private byte[] roomPhoto;
    @NotNull(message="100")
    @NotEmpty(message = "100")
    private String roomDescription;
    @NotNull(message="100")
    @NotEmpty(message = "100")
    @Positive(message = "price should be positive")
    private Double roomPrice;

    private List<BookingDTO> bookings= new ArrayList<>();
}
