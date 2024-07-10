package com.example.Hotel_management.service.inteface;

import com.example.Hotel_management.dto.BookingDTO;
import com.example.Hotel_management.dto.PageResponse;
import com.example.Hotel_management.entity.Booking;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;

public interface IBooking {
    String saveBooking(Integer roomId, Integer userId, BookingDTO bookingRequest);

    BookingDTO findBookingByConfirmationCode(String confirmationCode);

    PageResponse<BookingDTO> getAllBookings(int page , int size);

    void cancelBooking(Integer bookingId);
}
