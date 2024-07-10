package com.example.Hotel_management.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record LoginRequest(
        @NotBlank(message = "email is required ")
        @NotEmpty(message = "email is required ")
        @Email
        String email,
        @NotBlank(message = "password is required ")
        @NotEmpty(message = "password is required ")
        @Size(min = 8,max=15, message = "password length should be between 8 and 15 ")
        String password
) {
}
