package com.project.tripAdvisor.question.repository;

import com.project.tripAdvisor.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    Page<Question> findByTitleOrContent(String title, String content, Pageable pageable);
}