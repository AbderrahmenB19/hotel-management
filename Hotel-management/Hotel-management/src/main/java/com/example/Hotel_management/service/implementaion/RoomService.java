package com.example.Hotel_management.service.implementaion;

import com.example.Hotel_management.dto.PageResponse;
import com.example.Hotel_management.dto.RoomDTO;
import com.example.Hotel_management.dto.RoomRegistrationRequest;
import com.example.Hotel_management.entity.Room;
import com.example.Hotel_management.file.FileStorageService;
import com.example.Hotel_management.mapper.ObjectMapperForEntityAndDTO;
import com.example.Hotel_management.repository.RoomRepository;
import com.example.Hotel_management.service.inteface.IRoomService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService implements IRoomService {
    private final RoomRepository roomRepository;
    private final FileStorageService fileStorageService;


    @Override
    public Integer saveRoom( RoomRegistrationRequest roomRegistrationRequest ) {

        Room room= Room.builder()
                .roomDescription(roomRegistrationRequest.roomDescription())
                .roomPrice(roomRegistrationRequest.roomPrice())
                .roomType(roomRegistrationRequest.roomType())
                .build();

        return roomRepository.save(room).getId();



    }
    @Override
    public void updateRoomPhoto(MultipartFile image, int roomId) {
        Room room= roomRepository.findById(roomId).orElseThrow(()-> new EntityNotFoundException("the are no room with Id "+roomId));
        var imageUrl=fileStorageService.saveFile(image,roomId);
        room.setRoomPhotoUrl(imageUrl);
        roomRepository.save(room);
    }

    @Override
    public List<String> getAllRoomsTypes() {
        return roomRepository.findDistincsRoomByTpe();
    }

    @Override
    public Integer deleteRoom(Integer roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(()->new EntityNotFoundException("Room not found"));
        roomRepository.deleteById(roomId);
        return roomId;
    }



    @Override
    public RoomDTO getRoomById(Integer roomId) {
        Room room= roomRepository.findById(roomId).
                orElseThrow(()->new EntityNotFoundException("Room not foun with id "+roomId));
        return ObjectMapperForEntityAndDTO.mapRoomEntityToRoomDTOPlusBooking(room);
    }

    @Override
    public PageResponse<RoomDTO> getAllRooms(int page , int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("roomPrice").descending());
        Page<Room> roomPage = roomRepository.findAll(pageable);
        List<RoomDTO> rooms= roomPage.stream().map(ObjectMapperForEntityAndDTO::mapRoomEntityToRoomDTO).toList();
        return PageResponse.<RoomDTO>builder()
                .content(rooms)
                .isFirst(roomPage.isFirst())
                .isLast(roomPage.isLast())
                .number(roomPage.getNumber())
                .totalElements(roomPage.getTotalElements())
                .size(roomPage.getSize())
                .totalPages(roomPage.getTotalPages())
                .build();


    }

    @Override
    public PageResponse<RoomDTO> getAllAvailableRoomsByDateAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType, int page , int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("roomPrice").descending());
        Page<Room> roomPage = roomRepository.getAllAvailableRoomByDatesAndType(checkInDate,checkOutDate,roomType,pageable);
        List<RoomDTO> rooms= roomPage.stream().map(ObjectMapperForEntityAndDTO::mapRoomEntityToRoomDTO).toList();
        return PageResponse.<RoomDTO>builder()
                .content(rooms)
                .isFirst(roomPage.isFirst())
                .isLast(roomPage.isLast())
                .number(roomPage.getNumber())
                .totalElements(roomPage.getTotalElements())
                .size(roomPage.getSize())
                .totalPages(roomPage.getTotalPages())

                .build();
    }

    @Override
    public PageResponse<RoomDTO> getAllAvailableRooms(int page , int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("roomPrice").descending());
        Page<Room> roomPage = roomRepository.getAllRoomAvailable(pageable);
        List<RoomDTO> rooms= roomPage.stream().map(ObjectMapperForEntityAndDTO::mapRoomEntityToRoomDTO).toList();
        return PageResponse.<RoomDTO>builder()
                .content(rooms)
                .isFirst(roomPage.isFirst())
                .isLast(roomPage.isLast())
                .number(roomPage.getNumber())
                .totalElements(roomPage.getTotalElements())
                .size(roomPage.getSize())
                .totalPages(roomPage.getTotalPages())

                .build();
    }

}
