package com.project.tripAdvisor.question;

import com.project.tripAdvisor.member.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;

import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    Page<Question> findByAuthor(Question author, Pageable pageable);

    Page<Question> findByMemberId(Long memberId, Pageable pageable);


}
