package com.project.tripAdvisor.question.repository;

import com.project.tripAdvisor.question.entity.Answer;
import com.project.tripAdvisor.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {

    Page<Answer> findByQuestionId(@Param("questionId") Long questionId, Pageable pageable);

    List<Answer> findAllById(Question verifiedQuestion, Sort createdAt);
}
