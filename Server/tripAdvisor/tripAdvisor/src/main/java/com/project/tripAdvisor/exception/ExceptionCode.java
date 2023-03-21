package com.project.tripAdvisor.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ExceptionCode {

    MEMBER_EXISTS(409,"이미 존재하는 email 입니다."),
    MEMBER_NOT_EXISTS(404, "존재하지 않는 회원입니다."),

    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),


    MEMBER_NOT_MATCH(404, "회원이 일치하지 않습니다."),

    UNAUTHORIZED_USER(403, "인가되지 않은 회원입니다."),

    QUESTION_NOT_FOUND(6000, "유효하지 않은 질문입니다."),
    QUESTION_TAG_NOT_FOUND(6001, "유효하지 않은 코멘트입니다."),
    TAG_NOT_FOUND(7000, "유효하지 않은 태그입니다."),

    ANSWER_NOT_FOUND(404,"존재하지 않는 답변 입니다."),
    COMMENT_NOT_FOUND(404, "존재하지 않는 댓글 입니다."),

    BLOG_NOT_FOUND(404,"존재하지 않는 블로그 글입니다."),


    MEMBER_UNAUTHORIZED(401,"인증되지않은 사용자입니다.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message){
        this.status = code;
        this.message = message;
    }
}
