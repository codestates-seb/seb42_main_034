package com.project.tripAdvisor.blog.entity;

import com.project.tripAdvisor.common.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class BlogAnswer extends Auditable {
    @Id
    @Column(name="blog_answer_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name="member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name="blog_id")
    private Blog blog;

    @OneToMany(mappedBy = "blogAnswer")
    private List<BlogAnswerComment> comments = new ArrayList<>();
}
