package com.elderlink.backend.domains.dto;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

public class BlogDto {
    private Long id;

//    @NotBlank(message = "Blog title is required")
    private String title;

//    @NotBlank(message = "Blog body is required")
    private String body;
}
