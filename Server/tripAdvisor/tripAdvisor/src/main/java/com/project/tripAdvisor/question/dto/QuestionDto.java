package com.project.tripAdvisor.question.dto;

import com.project.tripAdvisor.member.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;


public class QuestionDto {

    @Getter
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
    public static class Response {
        private Long questionId;

        private String title;

        private String tag;

        private String content;

        private String writer;

//        private MemberDto.Response member;

        private LocalDateTime createdAt;

    }

    @Getter
    @AllArgsConstructor
    public static class SearchResponse {
        private Long questionId;

        private String title;

        private int viewCnt;

        private LocalDateTime createdAt;

        private LocalDateTime modifiedAt;

        private int answerCnt;

        private String writer;

        private List<String> tags;
    }
}
