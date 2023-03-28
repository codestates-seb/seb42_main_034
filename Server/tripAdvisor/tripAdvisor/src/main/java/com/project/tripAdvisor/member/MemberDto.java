package com.project.tripAdvisor.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

public class MemberDto {

    @Getter
    public static class Post{
        @NotBlank
        @Email
        private String email;

        @NotBlank
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[₩~!@#$%^&*()_+,.<>/?:'])[A-Za-z\\d₩~!@#$%^&*()_+,.<>/?:']{8,}$"
                ,message = "8문자 이상이어야 하며 영어, 숫자, 특수문자(₩~!@#$%^&*()_+,.<>/?:')를 포함해야합니다")
        private String password;

        @Pattern(regexp = "^.{2,10}$", message = "두글자 이상 10글자 이하로 작성해주세요")
        private String nickname;

//        private String location;
    }

    @Setter
    @Getter
    public static class Patch{
        //@NotSpace 구현
        @Pattern(regexp = "^.{2,10}$", message = "두글자 이상 10글자 이하로 작성해주세요")
        private String nickname;

        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[₩~!@#$%^&*()_+,.<>/?:'])[A-Za-z\\d₩~!@#$%^&*()_+,.<>/?:']{8,}$"
                ,message = "8문자 이상이어야 하며 영어, 숫자, 특수문자(₩~!@#$%^&*()_+,.<>/?:')를 포함해야합니다")
        private String password;

        private String location;

        private long memberId;
    }

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private long memberId;
        private String email;
        private String nickname;
        private String location;
        private Member.MemberStatus memberStatus;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class MemberQuestionResponse{
        private String title;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class MemberBlogResponse{
        private String title;
    }

    @Getter
    @AllArgsConstructor
    public static class MemberInfo{
        private String email;
        private String nickname;
        private String location;
        private LocalDateTime createdAt;
    }
}