package com.example.Hotel_management.controller;

import com.example.Hotel_management.dto.PageResponse;
import com.example.Hotel_management.dto.RoomDTO;
import com.example.Hotel_management.dto.RoomRegistrationRequest;
import com.example.Hotel_management.file.FileStorageService;
import com.example.Hotel_management.service.implementaion.RoomService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/rooms")
@Tag(name="room")
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;

    @PostMapping(value = "/addNewRoom")
    public ResponseEntity<Integer> addNewRoom(
            @Valid @RequestBody  RoomRegistrationRequest roomRegistrationRequest
            )
    {
        return ResponseEntity.ok(roomService.saveRoom(roomRegistrationRequest));

    }
    @GetMapping("/Types")
    public ResponseEntity<List<String>> getAllRoomType(){
        return ResponseEntity.ok(roomService.getAllRoomsTypes());
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/deleteRoom/{roomId}")
    public ResponseEntity<Integer> deleteRoomById(@PathVariable(name = "roomId") Integer roomId){
        return ResponseEntity.ok(roomService.deleteRoom(roomId));

    }

    @GetMapping("room-by-id/{roomId}")
    public ResponseEntity<RoomDTO> getRoomById(@PathVariable(name = "roomId") Integer roomId){
        return ResponseEntity.ok(roomService.getRoomById(roomId));

    }

    @GetMapping("/all")
    public ResponseEntity<PageResponse<RoomDTO>> getAllRooms(
            @RequestParam(name = "page" ,defaultValue = "0" , required = false) int page,
            @RequestParam(name = "size" ,defaultValue = "0" , required = false) int size
            )
    {
        return ResponseEntity.ok(roomService.getAllRooms(page, size));

    }
    @GetMapping("/available-rooms-by-date-and-type")
    public ResponseEntity<PageResponse<RoomDTO>> getAllRoomsByDateAndType(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            @RequestParam(required = false) @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate checkInDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate checkOutDate,
            @RequestParam(required = false) String roomType) {
        return ResponseEntity.ok(roomService.getAllAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType, page, size));
    }
    @GetMapping("/all-available-rooms")
    public ResponseEntity<PageResponse<RoomDTO>> getAllAvailableRoom(
            @RequestParam(name = "page" ,defaultValue = "0" , required = false) int page,
            @RequestParam(name = "size" ,defaultValue = "0" , required = false) int size
    )
    {
        return ResponseEntity.ok(roomService.getAllAvailableRooms(page, size));

    }



    @PostMapping(value = "/updateRoomPhoto/{roomId}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateRoomPhoto(
            @Parameter()
            @RequestPart(name = "file") MultipartFile file,
            @PathVariable("roomId") Integer roomId

    )
    {
        roomService.updateRoomPhoto(file, roomId);
        return ResponseEntity.accepted().build();

    }











}
