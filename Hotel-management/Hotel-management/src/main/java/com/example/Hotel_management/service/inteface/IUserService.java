package com.example.Hotel_management.service.inteface;

import com.example.Hotel_management.dto.BookingDTO;
import com.example.Hotel_management.dto.PageResponse;
import com.example.Hotel_management.dto.UserDTO;
import org.springframework.security.core.Authentication;

public interface IUserService {
    PageResponse<UserDTO> getAllUsers(int page, int size);

    PageResponse<BookingDTO> getBookingHistoryByUserId(int page, int size, Integer userId);

    Integer deleteUser(int userId);

    UserDTO getUserById(Integer userId);

    UserDTO getMyInfo(Authentication connectedUser);
}
