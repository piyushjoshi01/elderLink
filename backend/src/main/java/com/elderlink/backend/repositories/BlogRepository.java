package com.elderlink.backend.repositories;

import com.elderlink.backend.domains.entities.BlogEntity;
import com.elderlink.backend.domains.entities.RefreshTokenEntity;
import com.elderlink.backend.domains.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<BlogEntity,Long> {
    Optional<BlogEntity> findByTitle(String title);
}
