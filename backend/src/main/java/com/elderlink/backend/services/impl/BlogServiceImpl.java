package com.elderlink.backend.services.impl;

import com.elderlink.backend.domains.entities.BlogEntity;
import com.elderlink.backend.repositories.BlogRepository;
import com.elderlink.backend.repositories.UserRepository;
import com.elderlink.backend.services.BlogService;
import com.elderlink.backend.services.UserService;
import com.elderlink.backend.utils.IsUserAuthorized;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogServiceImpl implements BlogService {

    Logger logger = LoggerFactory.getLogger(BlogService.class);
    private static final Logger log = LoggerFactory.getLogger(BlogService.class);

    @Autowired
    private UserService userService;
    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private IsUserAuthorized isUserAuthorized;
    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean doesBlogExistById(Long id) {
        try {
            return blogRepository.existsById(id);
        } catch (Exception e) {
            logger.error("An error occurred while checking if blog exists or not!. -> {}", e.getMessage());
            throw new RuntimeException("An error occurred while checking if blog exists or not.");
        }
    }

    @Override
    public Optional<BlogEntity> doesBlogExistByTitle(String title) {
        try {
            return blogRepository.findByTitle(title);
        } catch (Exception e) {
            logger.error("An error occurred while checking if blog exists or not!. -> {}", e.getMessage());
            throw new RuntimeException("An error occurred while checking if blog exists or not.");
        }
    }

    @Override
    public BlogEntity updateBlog(Long id, BlogEntity blogEntity) {
        try {
            if (!doesBlogExistById(id)) {
                throw new RuntimeException("Blog with this id, does not exists.");
            }

            BlogEntity existingBlog = blogRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Blog doesn't exists!"));

            modelMapper.getConfiguration().setSkipNullEnabled(true);
            modelMapper.map(blogEntity, existingBlog);
            modelMapper.getConfiguration().setSkipNullEnabled(false);

            return blogRepository.save(existingBlog);

        } catch (RuntimeException e) {
            logger.error("An error occurred while updating the user. -> {}", e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public BlogEntity createBlog(BlogEntity blogEntity) {
        try {
//            Long userId = blogEntity.getUser().getId();
//
//            if(!userService.isUserExisted(userId)){
//                throw new EntityNotFoundException("User with this id does not exist!");
//            }
//
//            isUserAuthorized.checkUserAuthority(userId);

            if (!userService.isUserExisted(blogEntity.getUser().getId())) {
                throw new EntityNotFoundException("User with this id doesn't exist!");
            }


            String title = blogEntity.getTitle();
            String body = blogEntity.getBody();

            if (title.length() == 0 || title.isEmpty() || title.isBlank() || body.length() == 0 || body.isEmpty() || body.isBlank()) {
                throw new IllegalArgumentException("Blog must have a title and a body!");
            }

            BlogEntity blog = blogRepository.save(blogEntity);
            logger.info("Blog Created successfully.");
            return blog;
        } catch (IllegalArgumentException e) {
            logger.error(e.getMessage());
            throw new IllegalArgumentException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while creating a blog! " + e.getMessage());
        }
    }

    public void deleteBlog(Long id) {
        try {
            if (!doesBlogExistById(id)) {
                throw new RuntimeException("Blog with this id, does not exists.");
            }
            blogRepository.deleteById(id);

            log.info("Blog deleted successfully.");
        } catch (RuntimeException e) {
            logger.error("An error occurred while updating the blog. -> {}", e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    public List<BlogEntity> getBlogs() {
        try {
            return blogRepository.findAll ();
        }catch (Exception e){
            throw new RuntimeException (e.getMessage ());
        }
    }
}
