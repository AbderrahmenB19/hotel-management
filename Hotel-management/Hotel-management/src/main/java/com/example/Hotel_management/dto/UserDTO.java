package com.example.Hotel_management.dto;

import com.example.Hotel_management.entity.Booking;
import com.example.Hotel_management.role.Role;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
    private Integer id;
    private String email;
    private String name;
    private List<Role> role;
    private String phoneNumber;
    private List<BookingDTO> bookings= new ArrayList<>();
}
