package com.project.tripAdvisor.question.entity;

import com.project.tripAdvisor.audit.Auditable;
import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.question.TimeStamped;
import com.project.tripAdvisor.tag.entity.QuestionTag;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@Entity
public class Question extends Auditable {


    @Id
    @Column(name = "question_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String category; // 질문 글이 속한 카테고리

    @Column(nullable = false)
    private boolean isChecked; // 질문 글 채택 여부

    @Column(nullable = false)
    private String title; // 질문 글 제목

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content; // 질문 글 내용

    @Column(columnDefinition = "integer default 0")
    private int viewCnt; // 질문 글 조회수

    @Column(columnDefinition = "integer default 0")
    private int answerCnt; // 댓글 수

    @Column
    private String writer; // 작성자


    /**
     * N:1
     **/
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member; // 멤버 ID

    /**
     * 1:N
     **/
    @Setter(AccessLevel.NONE)
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Answer> answers = new ArrayList<>(); // 질문 글에 달린 답변(댓글) 리스트

    /**
     * 태그 기능 구현
     **/
    @Setter(AccessLevel.NONE)
    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<QuestionTag> questionTags = new ArrayList<>();


    /**
     * 양방향 매핑 설정
     **/
    public void setAnswer(Answer answer) {
        this.answers.add(answer);
        if (answer.getQuestion() != this) {
            answer.setQuestion(this);
        }
    }

    public void setQuestionTags(QuestionTag questionTag) {
        this.questionTags.add(questionTag);
        if (questionTag.getQuestion() != this) {
            questionTag.setQuestion(this);
        }
    }
}