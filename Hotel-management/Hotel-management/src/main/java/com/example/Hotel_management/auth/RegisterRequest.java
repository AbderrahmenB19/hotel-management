package com.example.Hotel_management.auth;


import jakarta.validation.constraints.*;
import lombok.NonNull;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record RegisterRequest (
        @NotBlank(message = "first name is required")
        @NotEmpty(message = "first name is required")
        String firstName,
        @NotBlank(message = "lastname name is required")
        @NotEmpty(message = "lastname name is required")
        String lastName,
        @NotBlank(message = "phone number name is required")
        @NotEmpty(message = "phone number name is required")
        String phoneNumber,

        @Size (min = 8 , max = 15 , message = "password should be between 8 and 15 ")
        String password,
        LocalDate dateOfBirth,
        @NotBlank(message = "email name is required")
        @NotEmpty(message = "email name is required")
        @Email
        String email
){
}
