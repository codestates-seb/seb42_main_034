package com.project.tripAdvisor.question.dto;

import com.project.tripAdvisor.member.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.jetbrains.annotations.Nullable;

import javax.validation.Valid;
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

        @Valid
        @Nullable
        private List<String> tags;

        @NotBlank
        private String category;

    }

    @Getter
    @NoArgsConstructor

    public static class Patch {

        private Long questionId;

        private Long memberId;

        @NotBlank(message = "제목을 입력하세요.")
        private String title;

        @NotBlank(message = "내용을 입력하세요.")
        private String content;

        @Valid
        @Nullable
        private List<String> tags;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response {
        private Long questionId;

        private String title;

        private List<String> tags;

        private String content;

        private String writer;

        private LocalDateTime createdAt;

        private int viewCnt;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class SearchResponse {
        private Long questionId;

        private String title;

        private int viewCnt;

        private List<String> tags;

        private String writer;

        private LocalDateTime createdAt;

        private LocalDateTime modifiedAt;

//        private int answerCnt;




    }
}
