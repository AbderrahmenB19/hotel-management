package com.example.Hotel_management.repository;

import com.example.Hotel_management.entity.Booking;
import jdk.dynalink.linker.LinkerServices;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking,Integer> {

    Optional<Booking> findByBookingConfirmationCode(String confirmationCode);

    @Query("""
            SELECT B FROM Booking B WHERE B.user.id= :userId
            
            """)

    Page<Booking> findBookingByUserId(Pageable pageable,Integer userId);
}
