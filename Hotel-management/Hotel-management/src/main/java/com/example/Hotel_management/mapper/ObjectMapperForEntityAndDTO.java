package com.example.Hotel_management.mapper;

import com.example.Hotel_management.dto.BookingDTO;
import com.example.Hotel_management.dto.RoomDTO;
import com.example.Hotel_management.dto.UserDTO;
import com.example.Hotel_management.entity.Booking;
import com.example.Hotel_management.entity.Room;
import com.example.Hotel_management.file.FileUtils;
import com.example.Hotel_management.user.User;

import java.util.List;
import java.util.stream.Collectors;

public class ObjectMapperForEntityAndDTO {
    public static UserDTO mapUserEntityToUserDTO(User user){
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getFullName())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRoles())
                .build();
    }
    public static UserDTO mapUserEntityToUSerDTOPlusBookingAndRoom(User user){
        UserDTO userDTO= UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getFullName())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRoles())
                .build();
        if(!user.getBookings().isEmpty()){
            userDTO.setBookings(user.getBookings().stream().map(
                    booking -> mapBookingEntityToBookingDtoPlusBookedRooms(booking,false)
            ).collect(Collectors.toList()));
        }
        return userDTO;

    }

    public static BookingDTO mapBookingEntityToBookingDtoPlusBookedRooms(Booking booking, boolean mapUser) {
        booking.calculateTotalNumberOfGuest();
        BookingDTO bookingDTO= BookingDTO.builder()
                .Id(booking.getId())
                .bookingConfigurationCode(booking.getBookingConfirmationCode())
                .checkOutDate(booking.getCheckOutDate())
                .checkInDate(booking.getCheckInDate())
                .numOfAdults(booking.getNumOfAdults())
                .totalNumOfGuest(booking.getTotalNumOfGuest())
                .numOfChildren(booking.getId())
                .totalNumOfGuest(booking.getTotalNumOfGuest())


                .build();
        if(mapUser){
            bookingDTO.setUser(mapUserEntityToUserDTO(booking.getUser()));
        }
        if(booking.getRoom() != null){
            bookingDTO.setRoom(mapRoomEntityToRoomDTO(booking.getRoom()));
        }
        return bookingDTO;

    }

    public static BookingDTO mapBookingEntityToBookingDto(Booking booking) {
        booking.calculateTotalNumberOfGuest();

        return BookingDTO.builder()
                .Id(booking.getId())
                .bookingConfigurationCode(booking.getBookingConfirmationCode())
                .checkOutDate(booking.getCheckOutDate())
                .checkInDate(booking.getCheckInDate())
                .numOfAdults(booking.getNumOfAdults())
                .totalNumOfGuest(booking.getTotalNumOfGuest())
                .numOfChildren(booking.getId())


                .build();
    }

    public static RoomDTO mapRoomEntityToRoomDTO(Room room) {
        return RoomDTO.builder()
                .id(room.getId())
                .roomDescription(room.getRoomDescription())
                .roomType(room.getRoomType())
                .roomPhoto(FileUtils.readFile(room.getRoomPhotoUrl()))
                .roomPrice(room.getRoomPrice())

                .build();
    }
    public static RoomDTO mapRoomEntityToRoomDTOPlusBooking(Room room) {
        RoomDTO roomDTO= RoomDTO.builder()
                .id(room.getId())
                .roomDescription(room.getRoomDescription())
                .roomType(room.getRoomType())
                .roomPhoto(FileUtils.readFile(room.getRoomPhotoUrl()))
                .roomPrice(room.getRoomPrice())

                .build();
        if(!room.getBookings().isEmpty()){

            roomDTO.setBookings(room.getBookings().stream().map(ObjectMapperForEntityAndDTO::mapBookingEntityToBookingDto).collect(Collectors.toList()));

        }
        return roomDTO;
    }

    public static List<UserDTO> mapUserListEntityToUserListDTO(List<User> userList) {
        return userList.stream().map(ObjectMapperForEntityAndDTO::mapUserEntityToUserDTO).collect(Collectors.toList());
    }

    public static List<RoomDTO> mapRoomListEntityToRoomListDTO(List<Room> roomList) {
        return roomList.stream().map(ObjectMapperForEntityAndDTO::mapRoomEntityToRoomDTO).collect(Collectors.toList());
    }

    public static List<BookingDTO> mapBookingListEntityToBookingListDTO(List<Booking> bookingList) {
        return bookingList.stream().map(ObjectMapperForEntityAndDTO::mapBookingEntityToBookingDto).collect(Collectors.toList());
    }

}
