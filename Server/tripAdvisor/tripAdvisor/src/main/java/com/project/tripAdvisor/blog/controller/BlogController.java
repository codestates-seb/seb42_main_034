package com.project.tripAdvisor.blog.controller;

import com.project.tripAdvisor.auth.handler.MemberAuthenticationFailureHandler;
import com.project.tripAdvisor.blog.dto.BlogDto;
import com.project.tripAdvisor.blog.entity.Blog;
import com.project.tripAdvisor.blog.mapper.BlogAnswerMapper;
import com.project.tripAdvisor.blog.mapper.BlogMapper;
import com.project.tripAdvisor.blog.repository.BlogRepository;
import com.project.tripAdvisor.blog.service.BlogService;
import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.member.service.MemberFindService;
import com.project.tripAdvisor.member.service.MemberService;
import com.project.tripAdvisor.response.MultiResponseDto;
import com.project.tripAdvisor.response.SingleResponseDto;
import com.project.tripAdvisor.tag.entity.BlogTag;
import com.project.tripAdvisor.tag.service.TagService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/blogs")
@Validated
//@CrossOrigin("*") // 좀 더 알아보기

public class BlogController {

    private final BlogService blogService;
    private final MemberService memberService;
    private final TagService tagService;
    private final BlogRepository blogRepository;
    private final BlogMapper mapper;
    private final BlogAnswerMapper answerMapper;
    private final MemberFindService memberFindService;

    public BlogController(BlogService blogService, MemberService memberService, TagService tagService, BlogRepository blogRepository, BlogMapper mapper, BlogAnswerMapper answerMapper, MemberFindService memberFindService) {
        this.blogService = blogService;
        this.memberService = memberService;
        this.tagService = tagService;
        this.blogRepository = blogRepository;
        this.mapper = mapper;
        this.answerMapper = answerMapper;
        this.memberFindService = memberFindService;
    }

    //블로그 포스팅 등록

    /**
     * category는 어딧어요?..
     * -> 추가함
     */

    @PostMapping
    public ResponseEntity postBlog(Principal principal, @Valid @RequestBody BlogDto.Request requestBody) {

        Blog blog = mapper.blogRequestToBlog(requestBody);
        Member member = memberFindService.findMyProfile(principal.getName());
        blog.setMember(member);
        // 검증된 member 찾아서 넣기
//        addMemberToBlog(requestBody, blog);

        blogService.createBlog(blog);

        tagService.setTags(requestBody,blog);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    //블로그 포스팅 수정

    @PatchMapping("/{blog-id}")
    public ResponseEntity patchBlog(Principal principal,
                                    @PathVariable("blog-id") @Positive Long blogId,
                                    @Valid @RequestBody BlogDto.Patch requestBody) {

        Blog blog = mapper.blogPatchDtoToBlog(requestBody);
        blog.setId(blogId);

        Blog updatedBlog = blogService.updateBlog(blog, memberFindService.findMyProfile(principal.getName()).getId());
        tagService.setTags(requestBody,updatedBlog);

        return new ResponseEntity(HttpStatus.OK);
    }

    // 블로그 포스팅 삭제

    @DeleteMapping("{blog-id}")
    public ResponseEntity deleteBlog(@PathVariable("blog-id") @Positive Long blogId,
                                     Principal principal) {
        blogService.deleteBlog(blogId, memberFindService.findMyProfile(principal.getName()).getId());

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    // 포스트 조회 및 필터링


    /**
     * sortedBy default value 추가 예정
     * @param category
     * @param page
     * @param sortedBy
     * @return
     */
//    @CrossOrigin("*")
    @GetMapping
    public ResponseEntity getBlogs(@RequestParam String category,
                                   @Positive @RequestParam int page,
                                   @RequestParam String sortedBy) {
        Page<Blog> pageBlog = blogService.findBlog(category,page - 1, sortedBy);
        List<Blog> blogList = pageBlog.getContent();

        List<BlogDto.searchResponse> searchResponses = mapper.blogToSearchResponses(blogList);

        return new ResponseEntity<>(
                new MultiResponseDto<>(searchResponses, pageBlog), HttpStatus.OK);
    }

    /**
     * 블로그 상세 조회
     */
    @GetMapping("/{blog-id}")
    public ResponseEntity getBlog(@PathVariable("blog-id") @Positive Long blogId){
//        Blog blog = blogService.findVerifyBlog(blogId);
        Blog blog = blogService.viewBlog(blogId);
        BlogDto.Response response = mapper.blogToBlogResponse(blog);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response),HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity searchBlog(@RequestParam String keyword,
                                     @RequestParam(defaultValue = "none")String type,
                                     @Positive @RequestParam int page) {

        Page<Blog> pageBlog = blogService.searchBlog(page - 1, keyword, type);
        List<Blog> blogList = pageBlog.getContent();

        List<BlogDto.searchResponse> searchResponses = mapper.blogToSearchResponses(blogList);

        return new ResponseEntity<>(
                new MultiResponseDto<>(searchResponses, pageBlog), HttpStatus.OK);

    }
    @PostMapping("/like/{blog-id}")
    public ResponseEntity postBlogLike(@Positive @PathVariable("blog-id") Long blogId,
                                       Principal principal) {

        blogService.switchLike(blogId, memberFindService.findMyProfile(principal.getName()).getId());

        return new ResponseEntity(HttpStatus.CREATED);
    }

//    private void addMemberToBlog(BlogDto.Request requestBody, Blog blog) {
//        Member member = memberService.findVerifiedMember(requestBody.getMemberId());
//        blog.setMember(member);
//    }

}