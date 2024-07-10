package com.example.Hotel_management.role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.expression.spel.ast.OpAnd;

import java.util.Optional;

public interface RoleRepository  extends JpaRepository<Role,Integer> {
    Optional<Role> findByName(String username);
}
