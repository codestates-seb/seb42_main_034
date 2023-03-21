package com.project.tripAdvisor.blog.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BlogAnswerCommentResponseDto {

    private Long commentId;
    private String content;
    private String createdAt;

}


