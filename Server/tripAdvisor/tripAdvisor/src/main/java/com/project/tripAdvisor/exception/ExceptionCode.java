package com.project.tripAdvisor.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ExceptionCode {

    MEMBER_EXISTS(409,"이미 존재하는 email 입니다."),
    MEMBER_NOT_EXISTS(404, "존재하지 않는 회원입니다."),

    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다.");
    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message){
        this.status = code;
        this.message = message;
    }
}
