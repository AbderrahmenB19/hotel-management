package com.example.Hotel_management.controller;

import com.example.Hotel_management.dto.BookingDTO;
import com.example.Hotel_management.dto.PageResponse;
import com.example.Hotel_management.service.implementaion.BookingService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/booking")
@RequiredArgsConstructor
@Tag(name = "Booking ")
public class BookingController {
    private final BookingService bookingService;

    @PostMapping("/book-room/{roomId}/{userId}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public ResponseEntity<Map<String,String>> saveBooking(
            @PathVariable(name = "roomId") Integer roomId,
            @PathVariable(name = "userId") Integer userId,
            @RequestBody BookingDTO bookingDTO
    ) {
        String message = bookingService.saveBooking(roomId, userId, bookingDTO);
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get-by-confirmation-code/{confirmationCode}")
    public ResponseEntity<BookingDTO> findBookingByConfirmationCode(
            @PathVariable(name = "confirmationCode") String confirmationCode
    ){
        return new ResponseEntity<>(bookingService.findBookingByConfirmationCode(confirmationCode), HttpStatus.OK);

    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<PageResponse<BookingDTO>> getAllBookings(
            @RequestParam(name = "page" ,defaultValue = "0", required = false) int page,
            @RequestParam(name = "size" ,defaultValue = "0", required = false) int size
    )
    {
        return new ResponseEntity<>(bookingService.getAllBookings(page, size),HttpStatus.OK);
    }
    @DeleteMapping("/cancel/{bookingId}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public ResponseEntity<Map<String,String>> cancelBooking(
            @PathVariable(name = "bookingId") Integer bookingId
    ){
         bookingService.cancelBooking(bookingId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "booking cancelled with success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }



}
