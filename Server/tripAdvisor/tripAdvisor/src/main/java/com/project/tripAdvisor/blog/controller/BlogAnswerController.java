package com.project.tripAdvisor.blog.controller;

import com.project.tripAdvisor.blog.dto.BlogAnswerCommentPatchDto;
import com.project.tripAdvisor.blog.dto.BlogAnswerCommentPostDto;
import com.project.tripAdvisor.blog.dto.BlogAnswerDto;
import com.project.tripAdvisor.blog.entity.Blog;
import com.project.tripAdvisor.blog.entity.BlogAnswer;
import com.project.tripAdvisor.blog.entity.BlogAnswerComment;
import com.project.tripAdvisor.blog.mapper.BlogAnswerCommentMapper;
import com.project.tripAdvisor.blog.mapper.BlogAnswerMapper;
import com.project.tripAdvisor.blog.service.BlogAnswerService;
import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.member.service.MemberFindService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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
    private final MemberFindService memberFindService;

    public BlogAnswerController(BlogAnswerMapper blogAnswerMapper, BlogAnswerService blogAnswerService, BlogAnswerCommentMapper blogAnswerCommentMapper, MemberFindService memberFindService) {
        this.blogAnswerMapper = blogAnswerMapper;
        this.blogAnswerService = blogAnswerService;
        this.blogAnswerCommentMapper = blogAnswerCommentMapper;
        this.memberFindService = memberFindService;
    }

    @PostMapping("/{blog-id}")
    public ResponseEntity postBlogAnswer(@PathVariable("blog-id")@Positive Long blogId,
                                         Principal principal,
                                         @RequestBody BlogAnswerDto.Post requestBody){
        BlogAnswer blogAnswer = blogAnswerMapper.blogAnswerPostToBlogAnswer(requestBody);
        Member member = memberFindService.findMyProfile(principal.getName());
        blogAnswer.setMember(member);
        blogAnswerService.createBlogAnswer(blogAnswer,blogId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{answer-id}")
    public ResponseEntity patchBlogAnswer(Principal principal,
                                          @PathVariable("answer-id")@Positive Long blogAnswerId,
                                          @RequestBody BlogAnswerDto.Patch requestBody){
        requestBody.setBlogAnswerId(blogAnswerId);

        BlogAnswer blogAnswer = blogAnswerMapper.blogAnswerPatchToBlogAnswer(requestBody);
        blogAnswerService.updateBlogAnswer(blogAnswer,memberFindService.findMyProfile(principal.getName()).getId());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteBlogAnswer(Principal principal,
                                           @PathVariable("answer-id")@Positive Long blogAnswerId){
        blogAnswerService.deleteBlogAnswer(blogAnswerId,memberFindService.findMyProfile(principal.getName()).getId());

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
    public ResponseEntity postBlogAnswerComment(Principal principal,
                                                @PathVariable("answer-id")@Positive Long blogAnswerId,
                                                @RequestBody BlogAnswerCommentPostDto requestBody){
        BlogAnswerComment blogAnswerComment = blogAnswerCommentMapper.blogAnswerCommentPostDtoToBlogAnswerComment(requestBody);
        Member member = memberFindService.findMyProfile(principal.getName());
        blogAnswerComment.setMember(member);
        blogAnswerService.createBlogAnswerComment(blogAnswerComment,blogAnswerId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/comments/{comment-id}")
    public ResponseEntity patchBlogAnswerComment(Principal principal,
                                                 @PathVariable("comment-id")@Positive Long blogAnswerCommentId,
                                                 @RequestBody BlogAnswerCommentPatchDto requestBody){
        requestBody.setCommentId(blogAnswerCommentId);

        BlogAnswerComment blogAnswerComment = blogAnswerCommentMapper.blogAnswerCommentPatchDtoToBlogAnswerComment(requestBody);
        blogAnswerService.updateBlogAnswerComment(blogAnswerComment,memberFindService.findMyProfile(principal.getName()).getId());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/comments/{comment-id}")
    public ResponseEntity deleteBlogAnswerComment(Principal principal,
                                                  @PathVariable("comment-id")@Positive Long blogAnswerCommentId){
        blogAnswerService.deleteBlogAnswerComment(blogAnswerCommentId,memberFindService.findMyProfile(principal.getName()).getId());

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}