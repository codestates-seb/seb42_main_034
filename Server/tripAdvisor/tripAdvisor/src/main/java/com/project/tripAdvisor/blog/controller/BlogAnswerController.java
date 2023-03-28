package com.project.tripAdvisor.blog.controller;

import com.project.tripAdvisor.blog.dto.BlogAnswerCommentPatchDto;
import com.project.tripAdvisor.blog.dto.BlogAnswerCommentPostDto;
import com.project.tripAdvisor.blog.dto.BlogAnswerDto;
import com.project.tripAdvisor.blog.entity.BlogAnswer;
import com.project.tripAdvisor.blog.entity.BlogAnswerComment;
import com.project.tripAdvisor.blog.mapper.BlogAnswerCommentMapper;
import com.project.tripAdvisor.blog.mapper.BlogAnswerMapper;
import com.project.tripAdvisor.blog.service.BlogAnswerService;
import com.project.tripAdvisor.blog.service.BlogService;
import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.member.sevice.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/blogs/answer")
public class BlogAnswerController {
    private final BlogAnswerMapper blogAnswerMapper;
    private final BlogAnswerService blogAnswerService;
    private final BlogAnswerCommentMapper blogAnswerCommentMapper;
    private final MemberService memberService;
    private final BlogService blogService;

    public BlogAnswerController(BlogAnswerMapper blogAnswerMapper, BlogAnswerService blogAnswerService, BlogAnswerCommentMapper blogAnswerCommentMapper, MemberService memberService, BlogService blogService) {
        this.blogAnswerMapper = blogAnswerMapper;
        this.blogAnswerService = blogAnswerService;
        this.blogAnswerCommentMapper = blogAnswerCommentMapper;
        this.memberService = memberService;
        this.blogService = blogService;
    }

    @PostMapping("/{blog-id}")
    public ResponseEntity postBlogAnswer(@PathVariable("blog-id")@Positive Long blogId,
                                         @RequestBody BlogAnswerDto.Post requestBody, Principal principal){
        BlogAnswer blogAnswer = blogAnswerMapper.blogAnswerPostToBlogAnswer(requestBody);
        Member member = memberService.findMemberByEmail(principal.getName());
        blogAnswer.setMember(member);

        blogAnswerService.createBlogAnswer(blogAnswer,blogId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{answer-id}")
    public ResponseEntity patchBlogAnswer(@PathVariable("answer-id")@Positive Long blogAnswerId,
                                          @RequestBody BlogAnswerDto.Patch requestBody, Principal principal){
        requestBody.setBlogAnswerId(blogAnswerId);

        BlogAnswer blogAnswer = blogAnswerMapper.blogAnswerPatchToBlogAnswer(requestBody);
        Member member = memberService.findMemberByEmail(principal.getName());
        blogAnswer.setMember(member);
        Long memberId = member.getId();
        blogAnswerService.updateBlogAnswer(blogAnswer,principal);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteBlogAnswer(@PathVariable("answer-id")@Positive Long blogAnswerId,
                                           Principal principal){

        Member member = memberService.findMemberByEmail(principal.getName());
        Long memberId = member.getId();

        blogAnswerService.deleteBlogAnswer(blogAnswerId,principal);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{blog-id}")
    public ResponseEntity getBlogAnswer(@PathVariable("blog-id")@Positive Long blogId,
                                        @RequestParam int page){
        Page<BlogAnswer> pageBlogAnswer = blogAnswerService.findBlogAnswers(blogId,page-1);
        List<BlogAnswer> blogAnswers = pageBlogAnswer.getContent();
        return new ResponseEntity<>(new BlogAnswerDto.MultiResponse((blogAnswerMapper.blogAnswersToBlogAnswerResponses(blogAnswers)),pageBlogAnswer),HttpStatus.OK);
    }

    /**
     * 대댓글 post, patch delete
     */
    @PostMapping("/comments/{answer-id}")
    public ResponseEntity postBlogAnswerComment(@PathVariable("answer-id")@Positive Long blogAnswerId,
                                                @RequestBody BlogAnswerCommentPostDto requestBody, Principal principal){
        BlogAnswerComment blogAnswerComment = blogAnswerCommentMapper.blogAnswerCommentPostDtoToBlogAnswerComment(requestBody);
        Member member = memberService.findMemberByEmail(principal.getName());
        blogAnswerComment.setMember(member);

        blogAnswerService.createBlogAnswerComment(blogAnswerComment,blogAnswerId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/comments/{comment-id}")
    public ResponseEntity patchBlogAnswerComment(@PathVariable("comment-id")@Positive Long blogAnswerCommentId,
                                                 @RequestBody BlogAnswerCommentPatchDto requestBody, Principal principal){
        requestBody.setCommentId(blogAnswerCommentId);

        BlogAnswerComment blogAnswerComment = blogAnswerCommentMapper.blogAnswerCommentPatchDtoToBlogAnswerComment(requestBody);
        Member member = memberService.findMemberByEmail(principal.getName());
        blogAnswerComment.setMember(member);
        Long memberId = member.getId();

        blogAnswerService.updateBlogAnswerComment(blogAnswerComment,principal);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/comments/{comment-id}")
    public ResponseEntity deleteBlogAnswerComment(@PathVariable("comment-id")@Positive Long blogAnswerCommentId,
                                                  Principal principal){

        Member member = memberService.findMemberByEmail(principal.getName());
        Long memberId = member.getId();

        blogAnswerService.deleteBlogAnswerComment(blogAnswerCommentId,principal);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}