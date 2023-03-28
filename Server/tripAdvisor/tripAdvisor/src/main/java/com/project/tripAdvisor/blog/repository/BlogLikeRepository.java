package com.project.tripAdvisor.blog.repository;

import com.project.tripAdvisor.blog.entity.BlogLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BlogLikeRepository extends JpaRepository<BlogLike, Long> {
    @Query("SELECT a FROM member_blog_like a "+
            "WHERE a.member.id = :memberId and a.blog.id = :blogId")
    Optional<BlogLike> findByMemberAndBlog(@Param("memberId")Long memberId,
                                           @Param("blogId")Long blogId);
}