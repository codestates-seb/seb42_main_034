package com.project.tripAdvisor.blog.mapper;

import com.project.tripAdvisor.blog.dto.BlogAnswerCommentResponseDto;
import com.project.tripAdvisor.blog.dto.BlogAnswerDto;
import com.project.tripAdvisor.blog.entity.BlogAnswer;
import com.project.tripAdvisor.blog.entity.BlogAnswerComment;
import com.project.tripAdvisor.member.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BlogAnswerMapper {
    default BlogAnswer blogAnswerPostToBlogAnswer(BlogAnswerDto.Post requestBody){
        if(requestBody==null){
            return null;
        }

        BlogAnswer blogAnswer = new BlogAnswer();
        blogAnswer.setContent(requestBody.getContent());

        return blogAnswer;
    }

    default BlogAnswer blogAnswerPatchToBlogAnswer(BlogAnswerDto.Patch requestBody){
        if(requestBody==null){
            return null;
        }
//        Member member = new Member();
//        member.setId(requestBody.getMemberId());

        BlogAnswer blogAnswer = new BlogAnswer();
        blogAnswer.setId(requestBody.getBlogAnswerId());
//        blogAnswer.setMember(member);
        blogAnswer.setContent(requestBody.getContent());

        return blogAnswer;
    }

    default BlogAnswerDto.Response blogAnswerToBlogAnswerResponse(BlogAnswer blogAnswer,List<BlogAnswerCommentResponseDto> comments){
        BlogAnswerDto.Response blogAnswerResponseDto = new BlogAnswerDto.Response(blogAnswer.getId(),blogAnswer.getMember().getNickname(), blogAnswer.getContent(),
                blogAnswer.getCreatedAt(),comments,blogAnswer.getMember().getId());
        return blogAnswerResponseDto;
    }

    default List<BlogAnswerDto.Response> blogAnswersToBlogAnswerResponses(List<BlogAnswer> blogAnswers) {
        if (blogAnswers == null) {
            return null;
        }
        List<BlogAnswerDto.Response> list = new ArrayList<>(blogAnswers.size());
        for (BlogAnswer blogAnswer : blogAnswers) {
            List<BlogAnswerComment> comments = blogAnswer.getComments();
            list.add(blogAnswerToBlogAnswerResponse(blogAnswer, blogAnswerCommentsToBlogAnswerCommentResponses(comments)));
        }
        return list;
    }

    default List<BlogAnswerCommentResponseDto> blogAnswerCommentsToBlogAnswerCommentResponses(List<BlogAnswerComment> comments) {
        List<BlogAnswerCommentResponseDto> list = new ArrayList<>( comments.size() );
        for ( BlogAnswerComment comment : comments ) {
            list.add( blogAnswerCommentToBlogAnswerCommentResponseDto(comment) );
        }

        return list;
    }

    default BlogAnswerCommentResponseDto blogAnswerCommentToBlogAnswerCommentResponseDto(BlogAnswerComment blogAnswerComment) {
        if ( blogAnswerComment == null ) {
            return null;
        }

        Long commentId = blogAnswerComment.getId();
        String content = blogAnswerComment.getContent();
        String createdAt = blogAnswerComment.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));



        BlogAnswerCommentResponseDto blogAnswerCommentResponseDto = new BlogAnswerCommentResponseDto(commentId,content,createdAt);
        return blogAnswerCommentResponseDto;
    }
}