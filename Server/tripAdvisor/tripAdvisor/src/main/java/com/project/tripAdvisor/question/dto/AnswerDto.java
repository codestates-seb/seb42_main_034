package com.project.tripAdvisor.question.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class AnswerDto {

    @Getter
    @Setter
    public static class Post{



        @NotBlank(message = "내용을 입력하세요.")
        private String content;

        public Post(String content) {
            this.content = content;
        }

        public Post(){}


    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch{

//        private Long memberId;

        private Long answerId;

        @NotBlank(message = "내용을 입력하세요.")
        private String content;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response{

//        private Long memberId;

        private Long questionId;

        private Long answerId;

        private String content;

        private int likeCnt;

        private boolean isChecked;

        private String location;

    }
}
