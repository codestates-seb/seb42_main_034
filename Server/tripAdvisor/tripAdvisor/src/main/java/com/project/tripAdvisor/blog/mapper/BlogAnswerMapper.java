package com.project.tripAdvisor.blog.mapper;

import com.project.tripAdvisor.blog.dto.BlogAnswerDto;
import com.project.tripAdvisor.blog.entity.BlogAnswer;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BlogAnswerMapper {
    default BlogAnswer blogAnswerPostToBlogAnswer(BlogAnswerDto.Post requestBody){
        if(requestBody==null){
            return null;
        }
        Member member = new Member();
        member.setId(requestBody.getMemberId());

        BlogAnswer blogAnswer = new BlogAnswer();
        blogAnswer.setMember(member);
        blogAnswer.setContent(requestBody.getContent());

        return blogAnswer;
    }

    default BlogAnswer blogAnswerPatchToBlogAnswer(BlogAnswerDto.Patch requestBody){
        if(requestBody==null){
            return null;
        }
        Member member = new Member();
        member.setId(requestBody.getMemberId());

        BlogAnswer blogAnswer = new BlogAnswer();
        blogAnswer.setId(requestBody.getBlogAnswerId());
        blogAnswer.setMember(member);
        blogAnswer.setContent(requestBody.getContent());

        return blogAnswer;
    }

    default BlogAnswerDto.Response blogAnswerToBlogAnswerResponse(BlogAnswer blogAnswer,List<BlogAnswerComment.Response> comments){
        BlogAnswerDto.Response blogAnswerResponseDto = new BlogAnswerDto.Response(blogAnswer.getMember().getNickName(), blogAnswer.getContent(),
                                                                                    blogAnswer.getCreatedAt(),comments);
        return blogAnswerResponseDto;
    }

    default List<BlogAnswerDto.Response> blogAnswersToBlogAnswerResponses(List<BlogAnswer> blogAnswers){
        if(blogAnswers==null){
            return null;
        }
        List<BlogAnswerDto.Response> list = new ArrayList<>(blogAnswers.size());
        for(BlogAnswer blogAnswer : blogAnswers){
            List<BlogAnswerComment> comments = blogAnswer.getComments();
            list.add(blogAnswerToBlogAnswerResponse(blogAnswer,blogAnswerCommentsToBlogAnswerCommentResponses(comments)));
        }
    }
}
