package com.project.tripAdvisor.blog.repository;

import com.project.tripAdvisor.blog.entity.Blog;
import com.project.tripAdvisor.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {

    //포스트 검색용 method

    Page<Blog> findByTitleLikeOrContentLike(String title, String content, Pageable pageable);

    Page<Blog> findByIdIn(List<Long> Ids, Pageable pageable);

    Page<Blog> findByMemberId(Long memberId, Pageable pageable);

    Page<Blog> findAllByCategory(String category,Pageable pageable);

    Page<Blog> findAllByMemberId(Long memberId, Pageable pageable);

}
