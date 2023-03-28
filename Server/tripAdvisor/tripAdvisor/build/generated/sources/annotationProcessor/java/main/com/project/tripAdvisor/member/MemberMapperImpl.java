package com.project.tripAdvisor.member;

import com.project.tripAdvisor.blog.entity.Blog;
import com.project.tripAdvisor.member.MemberDto.MemberBlogResponse;
import com.project.tripAdvisor.member.MemberDto.MemberInfo;
import com.project.tripAdvisor.member.MemberDto.MemberQuestionResponse;
import com.project.tripAdvisor.member.MemberDto.Patch;
import com.project.tripAdvisor.member.MemberDto.Post;
import com.project.tripAdvisor.member.MemberDto.Response;
import com.project.tripAdvisor.question.entity.Question;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-29T01:14:44+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.1.jar, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member MemberPostToMember(Post memberPost) {
        if ( memberPost == null ) {
            return null;
        }

        Member member = new Member();

        member.setEmail( memberPost.getEmail() );
        member.setPassword( memberPost.getPassword() );
        member.setNickname( memberPost.getNickname() );

        return member;
    }

    @Override
    public Member MemberPatchToMember(Patch memberPatch) {
        if ( memberPatch == null ) {
            return null;
        }

        Member member = new Member();

        member.setPassword( memberPatch.getPassword() );
        member.setNickname( memberPatch.getNickname() );
        member.setLocation( memberPatch.getLocation() );

        return member;
    }

    @Override
    public Response MemberToMemberResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }

        Response response = new Response();

        response.setEmail( member.getEmail() );
        response.setNickname( member.getNickname() );
        response.setLocation( member.getLocation() );
        response.setMemberStatus( member.getMemberStatus() );
        response.setCreatedAt( member.getCreatedAt() );
        response.setModifiedAt( member.getModifiedAt() );

        return response;
    }

    @Override
    public List<MemberQuestionResponse> QuestionsToMemberQuestionsResponseDtos(List<Question> questions) {
        if ( questions == null ) {
            return null;
        }

        List<MemberQuestionResponse> list = new ArrayList<MemberQuestionResponse>( questions.size() );
        for ( Question question : questions ) {
            list.add( questionToMemberQuestionResponse( question ) );
        }

        return list;
    }

    @Override
    public List<MemberBlogResponse> BlogsToMemberBlogsResponseDtos(List<Blog> blogs) {
        if ( blogs == null ) {
            return null;
        }

        List<MemberBlogResponse> list = new ArrayList<MemberBlogResponse>( blogs.size() );
        for ( Blog blog : blogs ) {
            list.add( blogToMemberBlogResponse( blog ) );
        }

        return list;
    }

    @Override
    public MemberInfo MemberToMemberInfoDto(Member member) {
        if ( member == null ) {
            return null;
        }

        String email = null;
        String nickname = null;
        String location = null;
        LocalDateTime createdAt = null;

        email = member.getEmail();
        nickname = member.getNickname();
        location = member.getLocation();
        createdAt = member.getCreatedAt();

        MemberInfo memberInfo = new MemberInfo( email, nickname, location, createdAt );

        return memberInfo;
    }

    protected MemberQuestionResponse questionToMemberQuestionResponse(Question question) {
        if ( question == null ) {
            return null;
        }

        String title = null;

        title = question.getTitle();

        MemberQuestionResponse memberQuestionResponse = new MemberQuestionResponse( title );

        return memberQuestionResponse;
    }

    protected MemberBlogResponse blogToMemberBlogResponse(Blog blog) {
        if ( blog == null ) {
            return null;
        }

        String title = null;

        title = blog.getTitle();

        MemberBlogResponse memberBlogResponse = new MemberBlogResponse( title );

        return memberBlogResponse;
    }
}
