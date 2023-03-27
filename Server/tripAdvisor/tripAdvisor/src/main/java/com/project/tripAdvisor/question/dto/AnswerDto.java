package com.project.tripAdvisor.question.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class AnswerDto {

    @Getter
    @AllArgsConstructor
    public static class Post{

        private Long memberId;

        @NotBlank(message = "내용을 입력하세요.")
        private String content;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch{

        private Long memberId;

        private Long answerId;

        @NotBlank(message = "내용을 입력하세요.")
        private String content;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response{

        private Long memberId;

        private Long questionId;

        private Long answerId;

        private String content;

        private int likeCnt;

        private boolean isChecked;

        private String location;

    }




//    private int id;
//
//    private String Content;
//
//    private boolean isChecked;
//
//    private int member_id;
//
//    private int question_id;
//
//    private String location;
}
