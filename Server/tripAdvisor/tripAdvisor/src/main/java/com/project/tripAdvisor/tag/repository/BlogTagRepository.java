package com.project.tripAdvisor.tag.repository;

import com.project.tripAdvisor.tag.entity.BlogTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogTagRepository extends JpaRepository<BlogTag,Long> {
    List<BlogTag> findByTag_Id(Long tagId);
}
