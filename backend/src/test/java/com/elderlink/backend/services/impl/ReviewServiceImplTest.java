package com.elderlink.backend.services.impl;

import com.elderlink.backend.domains.entities.ReviewEntity;
import com.elderlink.backend.domains.entities.UserEntity;
import com.elderlink.backend.repositories.ReviewRepository;
import com.elderlink.backend.repositories.UserRepository;
import com.elderlink.backend.utils.IsUserAuthorized;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.when;

public class ReviewServiceImplTest{

    @Mock
    private IsUserAuthorized isUserAuthorized;
    @Mock
    private UserRepository userRepository;
    @Mock
    private UserServiceImpl userService;
    @Mock
    private ReviewRepository reviewRepository;
    @InjectMocks
    private ReviewServiceImpl reviewService;

    private UserEntity volunteer;

    private UserEntity elderPerson;

    private ReviewEntity review;

    @BeforeEach
    public void setUp(){
        MockitoAnnotations.openMocks (this);

        volunteer = mock(UserEntity.class);

        elderPerson = mock(UserEntity.class);

        review = mock(ReviewEntity.class);
        when(review.getVolunteer ()).thenReturn (volunteer);
        when(review.getElderPerson ()).thenReturn (elderPerson);
    }

    @Test
    void testCreateReviewSuccess(){

        //Arrange
        when(review.getVolunteer ().getId ()).thenReturn (1L);
        when(review.getElderPerson ().getId ()).thenReturn (2L);
        when(review.getRating ()).thenReturn (3);

        when(userRepository.existsById (anyLong ())).thenReturn (true);
        when(userService.isUserExisted (anyLong ())).thenReturn (true);

        doNothing().when(isUserAuthorized).checkUserAuthority(anyLong());

        when(reviewRepository.save (any (ReviewEntity.class))).thenReturn (review);

        //Act
        ReviewEntity result = reviewService.createReview (review);

        //Assert
        assertEquals (review,result);

    }

    @Test
    void testCreateReviewThrowsIllegalArgumentException(){

        //Arrange
        when(review.getVolunteer ().getId ()).thenReturn (1L);
        when(review.getElderPerson ().getId ()).thenReturn (2L);
        when(review.getRating ()).thenReturn (0);

        when(userRepository.existsById (anyLong ())).thenReturn (true);
        when(userService.isUserExisted (anyLong ())).thenReturn (true);

        doNothing().when(isUserAuthorized).checkUserAuthority(anyLong());

        assertThrows (IllegalArgumentException.class,()-> reviewService.createReview (review));

    }

    @Test
    void testCreateReviewThrowsEntityNotFoundExceptionForVolunteer(){

        //Arrange
        when(review.getVolunteer ().getId ()).thenReturn (1L);

        when(userRepository.existsById (volunteer.getId ())).thenReturn (false);
        when(userService.isUserExisted (volunteer.getId ())).thenReturn (false);

        doNothing().when(isUserAuthorized).checkUserAuthority(anyLong());

        assertThrows (EntityNotFoundException.class,()-> reviewService.createReview (review));

    }

    @Test
    void testCreateReviewThrowsEntityNotFoundExceptionForElderPerson(){

        //Arrange
        when(review.getVolunteer ().getId ()).thenReturn (1L);
        when(review.getElderPerson ().getId ()).thenReturn (2L);

        when(userRepository.existsById (volunteer.getId ())).thenReturn (true);
        when(userService.isUserExisted (volunteer.getId ())).thenReturn (true);

        when(userRepository.existsById (elderPerson.getId ())).thenReturn (false);
        when(userService.isUserExisted (elderPerson.getId ())).thenReturn (false);

        doNothing().when(isUserAuthorized).checkUserAuthority(anyLong());

        assertThrows (EntityNotFoundException.class,()-> reviewService.createReview (review));

    }


}
