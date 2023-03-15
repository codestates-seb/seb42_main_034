package com.project.tripAdvisor.blog.dto;

import com.project.tripAdvisor.blog.entity.BlogAnswer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

public class BlogAnswerDto {
    @Getter
    @AllArgsConstructor
    public static class Post {

        private Long memberId;
        private String content;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch{
        private Long memberId;
        private Long blogAnswerId;
        private String content;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response{
        private String writer;
        private String content;
        private LocalDateTime createdAt;
        private List<BlogAnswerCommentDto.Response> comments;
    }


    /**
     * 추후 공통으로 빼실꺼면 말씀해주시고 공통으로 빼셔도 됩니다.
     */

    @Getter
    @Setter
    @AllArgsConstructor
    public static class MultiResponse{
        private List<BlogAnswerDto.Response> answers;
        private PageInfo pageInfo;
        public MultiResponse(List<BlogAnswerDto.Response> answers, Page<BlogAnswer> page) {
            this.answers = answers;
            this.pageInfo = new PageInfo(page.getTotalElements(),
                    page.getSize(), page.getNumber() + 1, page.getTotalPages());
        }
    }
    @AllArgsConstructor
    @Getter
    public static class PageInfo {
        private long totalCnt;
        private int size;
        private int page;
        private int totalPages;
    }
}
