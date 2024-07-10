package com.example.Hotel_management.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record RoomRegistrationRequest(
        @NotEmpty(message = "room type is required")
        @NotBlank(message = "room type is required")
        String roomType,

        @NotNull(message = "room type is required")
        @Positive

        Double roomPrice,


        @NotEmpty(message = "room description is required")
        @NotBlank(message = "room description is required")
        String roomDescription
) {

}
