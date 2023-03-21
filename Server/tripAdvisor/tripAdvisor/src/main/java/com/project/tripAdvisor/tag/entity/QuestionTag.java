package com.project.tripAdvisor.tag.entity;

import com.project.tripAdvisor.question.entity.Question;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class QuestionTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="question_id")
    private Question question;

    @ManyToOne
    @JoinColumn(name="tag_id")
    private Tag tag;
}
