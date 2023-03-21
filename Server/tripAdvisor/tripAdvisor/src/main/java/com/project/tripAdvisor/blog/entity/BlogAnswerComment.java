package com.project.tripAdvisor.blog.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.tripAdvisor.audit.Auditable;
import com.project.tripAdvisor.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class BlogAnswerComment extends Auditable {
    @Id
    @Column(name = "answer_comment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000, nullable = false)
    private String content;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blogAnswer_id")
    private BlogAnswer blogAnswer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public BlogAnswerComment(Long id, String content, BlogAnswer blogAnswer, Member member) {
        this.id = id;
        this.content = content;
        this.blogAnswer = blogAnswer;
        this.member = member;
    }
}