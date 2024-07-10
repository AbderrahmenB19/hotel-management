package com.example.Hotel_management.service.inteface;

import com.example.Hotel_management.dto.PageResponse;
import com.example.Hotel_management.dto.RoomDTO;
import com.example.Hotel_management.dto.RoomRegistrationRequest;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface IRoomService {
    void updateRoomPhoto(MultipartFile image, int roomId);
    Integer saveRoom(RoomRegistrationRequest roomRegistrationRequest);

    List<String> getAllRoomsTypes();

    Integer deleteRoom(Integer roomId);



    RoomDTO getRoomById(Integer roomId);

    PageResponse<RoomDTO> getAllRooms(int page , int size);
    PageResponse<RoomDTO> getAllAvailableRoomsByDateAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType , int page , int size);

    PageResponse<RoomDTO> getAllAvailableRooms(int page , int size);





}
