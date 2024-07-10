package com.example.Hotel_management.controller;

import com.example.Hotel_management.dto.BookingDTO;
import com.example.Hotel_management.dto.PageResponse;
import com.example.Hotel_management.dto.UserDTO;
import com.example.Hotel_management.service.implementaion.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Tag(name = "users")
public class UserController {
    private final UserService userService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<PageResponse<UserDTO>> getAllUsers(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page
            , @RequestParam(name = "size", defaultValue = "5", required = false) int size
    ) {
        return new ResponseEntity<>(userService.getAllUsers(page, size), HttpStatus.OK);
    }

    @GetMapping("/get-by-id/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable("userId") Integer userId) {
        return new ResponseEntity<>(userService.getUserById(userId), HttpStatus.OK);
    }

    @DeleteMapping("/delete-by-id/{userId}")
    public ResponseEntity<Integer> deleteUserById(
            @PathVariable("userId") Integer userId) {
        return new ResponseEntity<>(userService.deleteUser(userId), HttpStatus.OK);
    }

    @GetMapping("/get-logged-In-profile-info")
    public ResponseEntity<UserDTO> getMyInfo(Authentication connectedUser) {
        return new ResponseEntity<>(userService.getMyInfo(connectedUser), HttpStatus.OK);
    }

    @GetMapping("/get-user-bookings/{userId}")
    public ResponseEntity<PageResponse<BookingDTO>> getUserBookingHistory(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "0", required = false) int size,
            @PathVariable("userId") Integer userId) {
        return new ResponseEntity<>(userService.getBookingHistoryByUserId(page, size, userId), HttpStatus.OK);
    }


}
