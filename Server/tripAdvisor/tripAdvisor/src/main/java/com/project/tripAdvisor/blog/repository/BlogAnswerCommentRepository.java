package com.project.tripAdvisor.blog.repository;

import com.project.tripAdvisor.blog.entity.BlogAnswerComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogAnswerCommentRepository extends JpaRepository<BlogAnswerComment,Long>  {
}