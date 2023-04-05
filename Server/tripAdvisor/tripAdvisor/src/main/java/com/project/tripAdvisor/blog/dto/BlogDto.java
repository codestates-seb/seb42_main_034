package com.project.tripAdvisor.blog.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.util.List;

public class BlogDto {

    // post, patch DTO

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Request {
//        @Positive
//        private Long memberId;

        /**
         * 위치 정보에 대한 처리가 완료되면 카테고리 규격화 할듯?
         */
        @NotBlank
        private String category;

        @NotBlank
        @Pattern(regexp = "^(\\S)+(\\s?\\S)*$",
                message = "제목은 공백이 아니어야 하고, 공백으로 시작 또는 끝날 수 없습니다.")
        private String title;

        @NotBlank(message = "내용은 공백이 아니어야 합니다.")
        private String content;

        @Valid
        @Nullable
        private List<String> tags;
    }
    @Getter
    public static class Patch{
//        @NotNull
//        @Positive
//        private Long memberId;
        private String title;
        private String content;
        private List<String> tags;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response {
        private Long blogId;
        private String title;
        private String content;
        private List<String> tags;
        private String image;
        private String writer;
        private int viewCnt;
        private int likeCnt;
        private String createdAt;
        private String modifiedAt;
    }


    // 질문 목록, 조회, 필터링, 검색 결과 DTO

    @Getter
    @AllArgsConstructor
    public static class searchResponse {
        private Long blogId;
        private String title;
        //        private String content;
//        private String imagePath;
        private int viewCnt;
        private int likeCnt;
        private String createdAt;
        private String modifiedAt;
        private int commentCnt;
        private String writer;
        private List<String> tags;
    }

    @Getter
    @AllArgsConstructor
    public static class resultResponse {
        private List<searchResponse> blog;
    }


    //질문 상세 조회 결과 DTO

    @Getter
    @AllArgsConstructor
    public static class getResponse {
        private Response blog;
        private List<String> tags;
        private List<BlogAnswerDto.Response> comments;
    }
}