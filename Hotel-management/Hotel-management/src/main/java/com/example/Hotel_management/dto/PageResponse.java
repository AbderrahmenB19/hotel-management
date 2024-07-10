package com.example.Hotel_management.dto;

import lombok.*;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PageResponse <T>{
    private List<T> content;
    private int number;
    private long totalElements;

    private int size;
    private int totalPages;
    private boolean isFirst;
    private boolean isLast ;
}
