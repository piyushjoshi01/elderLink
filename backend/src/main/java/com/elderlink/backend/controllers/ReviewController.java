package com.elderlink.backend.controllers;

import com.elderlink.backend.domains.dto.ReviewDto;
import com.elderlink.backend.domains.entities.ReviewEntity;
import com.elderlink.backend.mappers.Mapper;
import com.elderlink.backend.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
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
    public ResponseEntity<ReviewDto> createReview(){

    }

}
