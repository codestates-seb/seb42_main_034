package com.project.tripAdvisor.question;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.userdetails.User;

import javax.validation.constraints.NotBlank;

public class QuestionDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post {

        private Long memberId;

        @NotBlank(message = "제목을 입력하세요.")
        private String title;

        @NotBlank(message = "내용을 입력하세요.")
        private String content;

        private String tag;

        @NotBlank
        private String category;

//        private User author;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {

        private Long questionId;

        private Long memberId;

        @NotBlank(message = "제목을 입력하세요.")
        private String title;

        @NotBlank(message = "내용을 입력하세요.")
        private String content;

        private String tag;

    }

    @Getter
    @AllArgsConstructor
    public static class Response { // 질문 상세 조회
        private int memberId;
        private String title;
        private String content;
        private String tag;
        // (추가) writer : 질문 작성자
        // (추가) createdAt : 작성 시간

    }

   /* @Getter
    @AllArgsConstructor
    public static class MemberQuestionResponse{
        private String title;
    }*/
}