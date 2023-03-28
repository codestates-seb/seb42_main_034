package com.project.tripAdvisor.blog.dto;

import com.project.tripAdvisor.blog.entity.BlogAnswer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

public class BlogAnswerDto {
    @Getter
    @Setter
    public static class Post {

        //private Long memberId;
        private String content;
        public Post(String content) {
            this.content = content;
        }

        public Post(){}

    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch{
        //private Long memberId;
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
        private List<BlogAnswerCommentResponseDto> comments;
    }


    /**
     * 추후 공통으로 빼실꺼면 말씀해주시고 공통으로 빼셔도 됩니다.
     */

    @Getter
    @Setter
    @AllArgsConstructor
    public static class MultiResponse{
        private List<Response> answers;
        private PageInfo pageInfo;
        public MultiResponse(List<Response> answers, Page<BlogAnswer> page) {
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