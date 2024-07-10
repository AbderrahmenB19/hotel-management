package com.example.Hotel_management.user;

import com.example.Hotel_management.entity.Booking;
import com.example.Hotel_management.role.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static jakarta.persistence.FetchType.EAGER;
import static java.util.Arrays.stream;

@Entity
@SuperBuilder
@Table(name = "_user")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)


public class User implements UserDetails, Principal {
    @Id
    @GeneratedValue
    private Integer id ;

    private String firstName;
    private String lastName;
    private String password;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    @Column(unique = true)
    private String email ;
    private boolean accountLocked;
    private boolean enabled;

    @CreatedDate
    @Column(updatable = false,nullable = false)

    private LocalDateTime createdDate;
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime LastModifyDate;
    @ManyToMany(fetch = EAGER)
    private List<Role> roles;
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    List<Booking> bookings= new ArrayList<>();

    @Override
    public String getName() {
        return email;
    }
    @Override
    public boolean isCredentialsNonExpired(){
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !this.accountLocked;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }
    public String getFullName(){
        return this.firstName+" "+this.lastName;
    }
}
