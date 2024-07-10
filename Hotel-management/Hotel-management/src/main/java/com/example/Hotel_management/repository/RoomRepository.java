package com.example.Hotel_management.repository;

import com.example.Hotel_management.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Integer> {

    Optional<Room> findById(Integer integer);
    @Query(""" 
            SELECT DISTINCT r.roomType FROM Room r
            """)
    List<String> findDistincsRoomByTpe();

    @Query("""
            SELECT r FROM Room r 
            WHERE r.roomType LIKE %:roomType% AND r.id NOT IN (
            SELECT b.room.id FROM Booking b
            WHERE (b.checkInDate <= :checkInDate) AND (b.checkOutDate >= :checkOutDate)
             )
            """)
    Page<Room> getAllAvailableRoomByDatesAndType(LocalDate checkInDate , LocalDate checkOutDate, String roomType , Pageable pageable);
    @Query("""
            SELECT r FROM Room r 
            WHERE r.id NOT IN (SELECT b.room.id FROM Booking b )
            """)
    Page<Room> getAllRoomAvailable(Pageable pageable);

}
