package com.project.tripAdvisor.tag.repository;

import com.project.tripAdvisor.tag.entity.BlogTag;
import com.project.tripAdvisor.tag.entity.QuestionTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface QuestionTagRepository extends JpaRepository<QuestionTag,Long> {
    List<QuestionTag> findByTag_Id(Long tagId);

    @Transactional
    void deleteAllByQuestion_Id(Long questionId);
}
