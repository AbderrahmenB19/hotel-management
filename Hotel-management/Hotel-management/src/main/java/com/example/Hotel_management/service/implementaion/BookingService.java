package com.example.Hotel_management.service.implementaion;

import com.example.Hotel_management.dto.BookingDTO;
import com.example.Hotel_management.dto.PageResponse;
import com.example.Hotel_management.dto.RoomDTO;
import com.example.Hotel_management.entity.Booking;
import com.example.Hotel_management.entity.Room;
import com.example.Hotel_management.exception.OurException;
import com.example.Hotel_management.mapper.ObjectMapperForEntityAndDTO;
import com.example.Hotel_management.repository.BookingRepository;
import com.example.Hotel_management.repository.RoomRepository;
import com.example.Hotel_management.service.inteface.IBooking;
import com.example.Hotel_management.user.User;
import com.example.Hotel_management.user.UserRepository;
import com.example.Hotel_management.utility.Utils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
@Service
@RequiredArgsConstructor
public class BookingService implements IBooking {
    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    @Override
    public String saveBooking(Integer roomId , Integer userId, BookingDTO bookingRequest) {
        User user = userRepository.findById(userId).orElseThrow(()-> new OurException("user not found with id :"+userId));
        Room room = roomRepository.findById(roomId).orElseThrow(()-> new EntityNotFoundException("no room with id "+roomId));
        if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
            throw new IllegalArgumentException("Check in date must come after check out date");
        }
        List<Booking> existingBookings= room.getBookings();
        if (!roomIsAvailable(bookingRequest, existingBookings)) {
            throw new OurException("Room not Available for selected date range");
        }

        Booking booking = Booking.builder()
                .numOfChildren(bookingRequest.getNumOfChildren())
                .checkOutDate(bookingRequest.getCheckOutDate())
                .numOfAdults(bookingRequest.getNumOfAdults())
                .checkInDate(bookingRequest.getCheckInDate())
                .room(room)
                .user(user)
                .bookingConfirmationCode(Utils.generateRandomAlphanumeric(6))
                .build();
        booking.setNumOfAdults(bookingRequest.getNumOfAdults());
        return bookingRepository.save(booking).getBookingConfirmationCode();

    }

    private boolean roomIsAvailable(BookingDTO bookingRequest, List<Booking> existingBookings) {
        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                                || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                                || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
                );
    }

    @Override
    public BookingDTO findBookingByConfirmationCode(String confirmationCode) {
        Booking booking= bookingRepository.findByBookingConfirmationCode(confirmationCode).orElseThrow(
                ()-> new OurException("booking not found with confirmation code"+confirmationCode));
        return ObjectMapperForEntityAndDTO.mapBookingEntityToBookingDtoPlusBookedRooms(booking,true);




    }

    @Override
    public PageResponse<BookingDTO> getAllBookings(int page, int size) {
        Pageable pageable= PageRequest.of(page,size);
        Page<Booking> bookingPage= bookingRepository.findAll(pageable);
        List<BookingDTO> bookingDTOS= bookingPage.stream().map(ObjectMapperForEntityAndDTO::mapBookingEntityToBookingDto).toList();
        return PageResponse.<BookingDTO>builder()
                .content(bookingDTOS)
                .isFirst(bookingPage.isFirst())
                .isLast(bookingPage.isLast())
                .number(bookingPage.getNumber())
                .totalElements(bookingPage.getTotalElements())
                .size(bookingPage.getSize())
                .totalPages(bookingPage.getTotalPages())

                .build();
    }

    @Override
    public void cancelBooking(Integer bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(()-> new OurException("booking not found"));
        bookingRepository.deleteById(bookingId);
    }
}
