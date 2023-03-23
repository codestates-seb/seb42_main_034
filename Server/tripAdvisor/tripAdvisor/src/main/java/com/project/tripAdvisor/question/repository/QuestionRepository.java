package com.project.tripAdvisor.question.repository;

import com.project.tripAdvisor.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    Page<Question> findByTitleOrContent(String title, String content, Pageable pageable);

    Page<Question> findByIdIn(List<Long> ids, Pageable pageable);

    Page<Question> findByMemberId(Long memberId, Pageable pageable);

    Page<Question> findAllByCategory(String category, Pageable pageable);
}
