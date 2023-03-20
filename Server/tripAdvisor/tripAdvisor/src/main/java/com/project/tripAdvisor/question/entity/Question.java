package com.project.tripAdvisor.question.entity;

import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.question.TimeStamped;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Question extends TimeStamped {


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

    @Column(columnDefinition = "TEXT",nullable = false)
    private String content; // 질문 글 내용

    @Column(columnDefinition = "integer default 0")
    private int viewCnt; // 질문 글 조회수




    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member; // 멤버 ID
    public void addMember(Member member){
        this.member = member;
    }

    @Setter(AccessLevel.NONE)
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true )
    private List<Answer> Answers; // 질문 글에 달린 답변 리스트







}
