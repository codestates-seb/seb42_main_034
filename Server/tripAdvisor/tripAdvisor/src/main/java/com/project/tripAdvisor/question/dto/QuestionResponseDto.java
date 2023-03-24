package com.project.tripAdvisor.question.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class QuestionResponseDto {
    private long questionId;
    private String title;
    private String category;
    private String content;
    private int viewCnt;

    @Builder
    public QuestionResponseDto(long questionId, String title, String category, String content, int viewCnt) {
        this.questionId = questionId;
        this.title = title;
        this.category = category;
        this.content = content;
        this.viewCnt = viewCnt;
    }
}
