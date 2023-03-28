package com.project.tripAdvisor.blog.repository;

import com.project.tripAdvisor.blog.entity.BlogAnswer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface BlogAnswerRepository extends JpaRepository<BlogAnswer, Long> {
    Page<BlogAnswer> findByBlogId(@Param("blogId")Long blogId, Pageable pageable);
}