package com.elderlink.backend.controllers;

import com.elderlink.backend.domains.dto.ReviewDto;
import com.elderlink.backend.domains.entities.ReviewEntity;
import com.elderlink.backend.mappers.Mapper;
import com.elderlink.backend.services.ReviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/review")
public class ReviewController{

    @Autowired
    private Mapper<ReviewEntity, ReviewDto> reviewMapper;

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/create")
    public ResponseEntity<ReviewDto> createReview(
            @Valid @RequestBody ReviewDto reviewDto
    ){
        ReviewEntity reviewEntity = reviewMapper.toEntity(reviewDto);
        ReviewEntity createdReview = reviewService.createReview(reviewEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(reviewMapper.toDto(createdReview));
    }

}
