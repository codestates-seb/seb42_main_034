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
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/blog/answer")
public class BlogAnswerController {
    private final BlogAnswerMapper blogAnswerMapper;
    private final BlogAnswerService blogAnswerService;
    private final BlogAnswerCommentMapper blogAnswerCommentMapper;

    public BlogAnswerController(BlogAnswerMapper blogAnswerMapper, BlogAnswerService blogAnswerService, BlogAnswerCommentMapper blogAnswerCommentMapper) {
        this.blogAnswerMapper = blogAnswerMapper;
        this.blogAnswerService = blogAnswerService;
        this.blogAnswerCommentMapper = blogAnswerCommentMapper;
    }

    @PostMapping("/{blog-id}")
    public ResponseEntity postBlogAnswer(@PathVariable("blog-id")@Positive Long blogId,
                                         @RequestBody BlogAnswerDto.Post requestBody){
        BlogAnswer blogAnswer = blogAnswerMapper.blogAnswerPostToBlogAnswer(requestBody);
        blogAnswerService.createBlogAnswer(blogAnswer,blogId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{answer-id}")
    public ResponseEntity patchBlogAnswer(@PathVariable("answer-id")@Positive Long blogAnswerId,
                                          @RequestBody BlogAnswerDto.Patch requestBody){
        requestBody.setBlogAnswerId(blogAnswerId);

        BlogAnswer blogAnswer = blogAnswerMapper.blogAnswerPatchToBlogAnswer(requestBody);
        blogAnswerService.updateBlogAnswer(blogAnswer,blogAnswer.getMember().getId());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteBlogAnswer(@PathVariable("answer-id")@Positive Long blogAnswerId,
                                           @RequestParam Long memberId){
        blogAnswerService.deleteBlogAnswer(blogAnswerId,memberId);

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
                                                @RequestBody BlogAnswerCommentPostDto requestBody){
        BlogAnswerComment blogAnswerComment = blogAnswerCommentMapper.blogAnswerCommentPostDtoToBlogAnswerComment(requestBody);
        blogAnswerService.createBlogAnswerComment(blogAnswerComment,blogAnswerId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/comments/{comment-id}")
    public ResponseEntity patchBlogAnswerComment(@PathVariable("comment-id")@Positive Long blogAnswerCommentId,
                                                 @RequestBody BlogAnswerCommentPatchDto requestBody){
        requestBody.setCommentId(blogAnswerCommentId);

        BlogAnswerComment blogAnswerComment = blogAnswerCommentMapper.blogAnswerCommentPatchDtoToBlogAnswerComment(requestBody);
        blogAnswerService.updateBlogAnswerComment(blogAnswerComment,blogAnswerComment.getMember().getId());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/comments/{comment-id}")
    public ResponseEntity deleteBlogAnswerComment(@PathVariable("comment-id")@Positive Long blogAnswerCommentId,
                                                  @RequestParam @Positive Long memberId){
        blogAnswerService.deleteBlogAnswerComment(blogAnswerCommentId,memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
