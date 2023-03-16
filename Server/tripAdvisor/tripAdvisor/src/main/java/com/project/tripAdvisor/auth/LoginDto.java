package com.project.tripAdvisor.auth;

import lombok.Getter;

@Getter
public class LoginDto {
    //로그인 인증 정보 역직렬화를 위한 LoginDto클래스ㅇㅇ
    //클라이언트의 인증 정보를 수신함
    private String username;
    private String password;
}
