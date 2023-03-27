package com.project.tripAdvisor.auth.handler;

import com.google.gson.Gson;
import com.project.tripAdvisor.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MemberAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException{
        //인증실패 시 에러로그를 기록하거나 error response를 전송할 수 있다.
        log.error("# Authentication failed: {}", exception.getMessage());

        sendErrorResponse(response);
    }

    private void sendErrorResponse(HttpServletResponse response) throws IOException{
        Gson gson = new Gson();
        //객체 생성 후 상태코드 전달 인증실패 코드
        ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED);
        //타입이 application_json 이라는 것을 클라이언트에게 알려줄 수있도록 헤더에 추가
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        //status가 401임을 클라이언트에게 알려줄 수 있도록 http Header에 추가함
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        //gson을이용해 JSON문자열로 변환 후 출력스트림 생성
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}