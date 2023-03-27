package com.project.tripAdvisor.blog.mapper;

import com.project.tripAdvisor.blog.dto.BlogDto;
import com.project.tripAdvisor.blog.entity.Blog;
import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.member.MemberDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface BlogMapper {


    default Blog blogRequestToBlog(BlogDto.Request requestBody){
        if ( requestBody == null ) {
            return null;
        }

        Blog blog = new Blog();
        blog.setCategory(requestBody.getCategory());
        blog.setTitle( requestBody.getTitle() );
        blog.setContent( requestBody.getContent() );

        return blog;
    }
    @Mapping(source = "id", target = "blogId")
    @Mapping(source = "createdAt", target = "createdAt", dateFormat = "yyyy-MM-dd HH:mm")
    @Mapping(source = "modifiedAt", target = "modifiedAt", dateFormat = "yyyy-MM-dd HH:mm")
    default BlogDto.Response blogToBlogResponse(Blog blog){
        if ( blog == null ) {
            return null;
        }

        Long blogId = blog.getId();
        String title = blog.getTitle();
        String content = blog.getContent();
        int viewCnt = blog.getViewCnt();
        int likeCnt = blog.getLikeCnt();
        String createdAt = blog.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        String modifiedAt = DateTimeFormatter.ofPattern( "yyyy-MM-dd HH:mm" ).format( blog.getModifiedAt());
        String image = blog.getImage_path();

        BlogDto.Response response = new BlogDto.Response( blogId, title, content, image, viewCnt, likeCnt, createdAt, modifiedAt );

        return response;
    }
    default Blog blogPatchDtoToBlog(BlogDto.Patch requestbody){
        if(requestbody==null){
            return null;
        }
        Member member = new Member();
        member.setId(requestbody.getMemberId());

        Blog blog = new Blog();
        blog.setMember(member);
        blog.setTitle(requestbody.getTitle());
        blog.setContent(requestbody.getContent());

        return blog;
    }
    // 포스트 목록 조회 및 필터링, 검색 결과를 Response로 변환해주는 mapper

    default BlogDto.searchResponse blogToSearchResponse(Blog blog){
        return new BlogDto.searchResponse(
                blog.getId(),
                blog.getTitle(),
//                blog.getContent(),
                blog.getViewCnt(),
                blog.getLikeCnt(),
                blog.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")),
                blog.getModifiedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")),
                blog.getCommentCnt(),
                blog.getMember().getNickname(),
                blogToTagName(blog)
        );

    }
//
    default List<BlogDto.searchResponse> blogToSearchResponses(List<Blog> blogs) {
        if (blogs == null) {
            return null;
        }
        List<BlogDto.searchResponse> list = new ArrayList<>(blogs.size());
        for (Blog blog : blogs) {
            list.add(blogToSearchResponse(blog));
        }
        return list;
    }

  //  default List<BlogAnswerDto.Response> blogAnswersToBlogAnswerResponses(List<BlogAnswer> blogAnswers){
//        if(blogAnswers==null){
//            return null;
//        }
//        List<BlogAnswerDto.Response> list = new ArrayList<>(blogAnswers.size());
//        for(BlogAnswer blogAnswer : blogAnswers){
//            List<BlogAnswerComment> comments = blogAnswer.getComments();
//            list.add(blogAnswerToBlogAnswerResponse(blogAnswer,blogAnswerCommentsToBlogAnswerCommentResponses(comments)));
//        }
//    }
//
//    default BlogDto.resultResponse resultResponses(List<BlogDto.searchResponse> searchResponses){
//        return new BlogDto.resultResponse(
//                searchResponses
//        );
//    }
//
//
//    // 포스트 상세 조회 Response로 변환해주는 mapper
//
//    default BlogDto.getResponse blogToGetResponse(Blog blog, List<BlogCommentDto.Response> commentResponses, boolean isBookmarked, LikeType likeStatus) {
//        return new BlogDto.getResponse(
//                blogToBlogResponse(blog),
//                blogToTagResponses(blog),
//                commentResponses,
//                blogToMemberResponse(blog),
//                likeStatus
//        );
//    }
//
     //포스팅을 한 member의 Response DTO를 만들어주는 mapper
//    default MemberInfoDto.WriterResponse blogToMemberResponse(Blog blog) {
//        Member member = Blog.getMember();
//        return new MemberInfoDto.WriterResponse(
//                member.getId(),
//                member.getEmail(),
//                member.getDisplayName(),
//                member.getProfileImage()
//        );
////    }
//
    // Tag의 Response DTO를 만들어주는 mapper
    default List<String> blogToTagName(Blog blog) {
        return blog.getBlogTags().stream()
                .map(blogTag -> (blogTag.getTag().getName()))
                .collect(Collectors.toList());
    }

}
