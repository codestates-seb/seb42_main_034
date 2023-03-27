package com.project.tripAdvisor.blog.mapper;

import com.project.tripAdvisor.blog.dto.BlogAnswerCommentPatchDto;
import com.project.tripAdvisor.blog.dto.BlogAnswerCommentPostDto;
import com.project.tripAdvisor.blog.dto.BlogAnswerCommentResponseDto;
import com.project.tripAdvisor.blog.entity.BlogAnswerComment;
import com.project.tripAdvisor.member.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BlogAnswerCommentMapper {
    default BlogAnswerComment blogAnswerCommentPostDtoToBlogAnswerComment(BlogAnswerCommentPostDto blogAnswerCommentPostDto){
        if(blogAnswerCommentPostDto==null){
            return null;
        }

        Member member = new Member();
        member.setId(blogAnswerCommentPostDto.getMemberId());

        BlogAnswerComment blogAnswerComment = new BlogAnswerComment();
        blogAnswerComment.setMember(member);
        blogAnswerComment.setContent(blogAnswerCommentPostDto.getContent());

        return blogAnswerComment;
    }
    default BlogAnswerComment blogAnswerCommentPatchDtoToBlogAnswerComment(BlogAnswerCommentPatchDto blogAnswerCommentPatchDto){
        if(blogAnswerCommentPatchDto==null){
            return null;
        }
        Member member = new Member();
        member.setId(blogAnswerCommentPatchDto.getMemberId());

        BlogAnswerComment blogAnswerComment = new BlogAnswerComment();
        blogAnswerComment.setId(blogAnswerCommentPatchDto.getCommentId());
        blogAnswerComment.setMember(member);
        blogAnswerComment.setContent(blogAnswerCommentPatchDto.getContent());

        return blogAnswerComment;
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

    default List<BlogAnswerCommentResponseDto> blogAnswerCommentsToBlogAnswerCommentResponses(List<BlogAnswerComment> comments) {
        List<BlogAnswerCommentResponseDto> list = new ArrayList<>( comments.size() );
        for ( BlogAnswerComment comment : comments ) {
            list.add( blogAnswerCommentToBlogAnswerCommentResponseDto(comment) );
        }

        return list;
    }
}