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

    /**
     * {
     * answers: [{ answerId:[Number], createdAt:[String], location:,
     * content:[String], image:이미지경로[String], likeStatus:좋아요상태[Bool likeCnt:좋아요개수[String] }],
     * writer:[{
     * memberId:답변 작성 회원 username:작성자이메일아 nickname:작성자닉넴[Strin }],
     * comments:[{ commentId:댓글 일련번호[ content:내용[String], nickname:
     * }]
     */


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
