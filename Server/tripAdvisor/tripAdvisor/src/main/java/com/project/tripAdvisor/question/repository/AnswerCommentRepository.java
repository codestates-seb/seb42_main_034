package com.project.tripAdvisor.question.repository;

import com.project.tripAdvisor.question.entity.AnswerComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerCommentRepository extends JpaRepository<AnswerComment, Long> {
}
