package com.example.Hotel_management;

import com.example.Hotel_management.role.Role;
import com.example.Hotel_management.role.RoleRepository;
import com.example.Hotel_management.user.User;
import com.example.Hotel_management.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync
public class HotelManagementApplication {
	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(HotelManagementApplication.class, args);
	}



	@Bean
	public CommandLineRunner runner(RoleRepository roleRepository , UserRepository userRepository ){
		return args ->{
			if(roleRepository.findByName("USER").isEmpty()){
				roleRepository.save(
						Role.builder().name("USER").build()
				);
			}
            if(roleRepository.findByName("ADMIN").isEmpty()){
                roleRepository.save(
                        Role.builder().name("ADMIN").build()
                );
            }
            if(userRepository.findByEmail("user19@gmail.com").isEmpty()){
                userRepository.save(
                        User.builder()
                                .email("user19@gmail.com")
                                .password(passwordEncoder.encode("user1918"))
                                .lastName("bennacer")
                                .firstName("abderrahmen")
                                .roles(List.of(roleRepository.findByName("ADMIN").get()))
                                .enabled(true)
                                .accountLocked(false)
								.phoneNumber("+216 44 190 416")

                                .build()
                );
            }
		};
	}

}