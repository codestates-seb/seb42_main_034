package com.project.tripAdvisor.tag.entity;

import com.project.tripAdvisor.blog.entity.Blog;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Entity
@Setter
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
