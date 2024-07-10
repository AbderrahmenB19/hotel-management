package com.example.Hotel_management.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);

    @Query("""
            SELECT U FROM User U WHERE U.id=:userId AND  U.enabled=true
            """)


    Optional<User> findByIdEnabledUser(Integer userId);

    @Query("""
            SELECT U FROM User U WHERE U.accountLocked=false AND U.enabled= true
            """)
    Page<User> getAllEnabledUsers(Pageable page);
}
