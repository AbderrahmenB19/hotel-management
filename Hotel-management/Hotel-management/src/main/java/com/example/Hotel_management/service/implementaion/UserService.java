package com.example.Hotel_management.service.implementaion;

import com.example.Hotel_management.dto.BookingDTO;
import com.example.Hotel_management.dto.PageResponse;
import com.example.Hotel_management.dto.UserDTO;
import com.example.Hotel_management.entity.Booking;
import com.example.Hotel_management.mapper.ObjectMapperForEntityAndDTO;
import com.example.Hotel_management.repository.BookingRepository;
import com.example.Hotel_management.service.inteface.IUserService;
import com.example.Hotel_management.user.User;
import com.example.Hotel_management.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    @Override
    public PageResponse<UserDTO> getAllUsers(int page , int size ){

        Pageable pageable= PageRequest.of(page , size);
        Page<User> userPage= userRepository.getAllEnabledUsers(pageable);
        List<UserDTO> userDTOs= userPage.stream().map(ObjectMapperForEntityAndDTO::mapUserEntityToUserDTO).toList();
        return PageResponse.<UserDTO>builder()
                .content(userDTOs)
                .isFirst(userPage.isFirst())
                .isLast(userPage.isLast())
                .number(userPage.getNumber())
                .totalElements(userPage.getTotalElements())
                .size(userPage.getSize())
                .totalPages(userPage.getTotalPages())
                .build();

    }
    @Override
    public PageResponse<BookingDTO> getBookingHistoryByUserId(int page , int size , Integer userId){
        User user= userRepository.findById(userId).orElseThrow(()->new UsernameNotFoundException("there is no user with id "+userId));
        Pageable pageable = PageRequest.of(page , size);
        Page<Booking> bookingPage = bookingRepository.findBookingByUserId(pageable,user.getId());
        List<BookingDTO> bookingDTOS= bookingPage.stream().map(booking -> ObjectMapperForEntityAndDTO.mapBookingEntityToBookingDtoPlusBookedRooms(booking,true )).toList();
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
    public Integer deleteUser(int userId){
        //Best Practice Recommendation: Locking/Deactivating users
        //is generally the better practice compared to permanently deleting them.
        // This approach ensures that you retain valuable data
        //for analytics and compliance while still being able to respect user privacy and regulatory requirements.
        User user= userRepository.findById(userId).orElseThrow(()->new UsernameNotFoundException("there is no user with id "+userId));
        user.setEnabled(false);
        user.setAccountLocked(true);
        return userRepository.save(user).getId();

    }
    @Override
    public UserDTO getUserById(Integer userId){
        User user= userRepository.findByIdEnabledUser(userId).orElseThrow(()->new UsernameNotFoundException("there is no user with id "+userId));
        return ObjectMapperForEntityAndDTO.mapUserEntityToUserDTO(user);



    }
    @Override
    public UserDTO getMyInfo(Authentication connectedUser){
        String connectedUserEmail =((User)connectedUser.getPrincipal()).getName();
        User user = userRepository.findByEmail(connectedUserEmail)
                .orElseThrow(()->new UsernameNotFoundException("there is no user with Email "+connectedUserEmail));

        return ObjectMapperForEntityAndDTO.mapUserEntityToUSerDTOPlusBookingAndRoom(user);
    }
}
