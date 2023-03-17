package com.project.tripAdvisor.tag.entity;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class BlogTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="blog_id")
    private Blog blog;

    @ManyToOne
    @JoinColumn(name="tag_id")
    private Tag tag;
}
