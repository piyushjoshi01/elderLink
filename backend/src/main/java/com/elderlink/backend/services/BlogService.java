package com.elderlink.backend.services;

import com.elderlink.backend.domains.entities.BlogEntity;

import java.util.Optional;

public interface BlogService {
    public boolean doesBlogExistById(Long id);

    public Optional<BlogEntity> doesBlogExistByTitle(String title);

    public BlogEntity createBlog(BlogEntity blogEntity);
    public BlogEntity updateBlog(Long id, BlogEntity blogEntity);
    public String deleteBlog(Long id);

}
