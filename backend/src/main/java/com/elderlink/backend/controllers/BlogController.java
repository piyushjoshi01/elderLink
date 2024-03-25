package com.elderlink.backend.controllers;

import com.elderlink.backend.domains.dto.BlogDto;
import com.elderlink.backend.domains.entities.BlogEntity;
import com.elderlink.backend.mappers.Mapper;
import com.elderlink.backend.repositories.BlogRepository;
import com.elderlink.backend.services.BlogService;
import com.elderlink.backend.utils.IsUserAuthorized;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blog")
public class BlogController {
    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private IsUserAuthorized isUserAuthorized;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private Mapper<BlogEntity, BlogDto> blogMapper;
    @Autowired
    private BlogService blogService;

    @PostMapping("/create")
    public ResponseEntity<Object> createBlog(@Valid @RequestBody BlogDto blogDto) {
        BlogEntity blogEntity = blogMapper.toEntity(blogDto);
        BlogEntity createdBlog = blogService.createBlog(blogEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(blogMapper.toDto(createdBlog));
    }

    @PatchMapping("/{blogId}")
    public ResponseEntity<BlogDto> updateBlog(
            @Valid @PathVariable Long blogId,
            @Valid @RequestBody BlogDto updateBlogDto
    ){
        BlogEntity blogEntity = blogMapper.toEntity (updateBlogDto);
        BlogEntity updatedBlog = blogService.updateBlog(blogId,blogEntity);
        return ResponseEntity.status (HttpStatus.OK).body (blogMapper.toDto(updatedBlog));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteBlog(@Valid @PathVariable("id") Long blogId){
        blogService.deleteBlog(blogId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}