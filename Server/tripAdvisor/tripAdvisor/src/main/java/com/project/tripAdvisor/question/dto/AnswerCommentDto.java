package com.project.tripAdvisor.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class AnswerCommentDto {

    @Getter
    @NoArgsConstructor
    public static class Post{

//        private Long memberId;

        @NotBlank(message = "내용을 입력하세요.")
        private String content;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch {

//        private Long memberId;

        private Long commentId;

        @NotBlank(message = "내용을 입력하세요.")
        private String content;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response {


        private Long commentId;

        private String content;

        private String createdAt;



    }
}
