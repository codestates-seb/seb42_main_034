package com.project.tripAdvisor.question.repository;

import com.project.tripAdvisor.question.entity.AnswerLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AnswerLikeRepository extends JpaRepository<AnswerLike, Long> {

    @Query("SELECT b FROM member_answer_like b "+
            "WHERE b.member.id = :memberId and b.answer.id = :answerId")
    Optional<AnswerLike> findByMemberAndAnswer(@Param("memberId")Long memberId,
                                               @Param("answerId")Long answerId);
}
