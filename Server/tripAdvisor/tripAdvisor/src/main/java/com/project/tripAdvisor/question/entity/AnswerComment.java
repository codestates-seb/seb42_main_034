package com.project.tripAdvisor.question.entity;

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
public class AnswerComment extends Auditable {

    @Id
    @Column(name = "comment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String content;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "answer_id")
    private Answer answer;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private Member member;

    public AnswerComment(Long id, String content, Answer answer, Member member) {
        this.id = id;
        this.content = content;
        this.answer = answer;
        this.member = member;
    }
}