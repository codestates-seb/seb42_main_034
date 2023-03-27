package com.project.tripAdvisor.tag.repository;

import com.project.tripAdvisor.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findByName(String name);
}