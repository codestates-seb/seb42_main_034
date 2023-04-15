package com.project.tripAdvisor.question.entity;

import com.project.tripAdvisor.audit.Auditable;
import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.question.TimeStamped;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Answer extends Auditable {

    @Id
    @Column(name = "answer_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String Content; // 답변 글 내용

    @Column(nullable = false)
    private boolean isChecked; // 답변 채택 여부

    @Column(columnDefinition = "integer default 0")
    private int likeCnt; // 답변 글 좋아요 수

//    @Column(nullable = false)
//    private String location; // 지역 구분



    @JoinColumn(name = "member_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    public void addMember(Member member) {
        this.member = member;
    }

    @JoinColumn(name = "question_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Question question;

    public void addQuestion(Question question) {
        this.question = question;
    }

    @Setter(AccessLevel.NONE)
    @OneToMany(mappedBy = "answer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<AnswerComment> comments = new ArrayList<>(); // 대댓글

}