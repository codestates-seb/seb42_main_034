package com.project.tripAdvisor.blog.controller;

import com.project.tripAdvisor.blog.dto.BlogAnswerDto;
import com.project.tripAdvisor.blog.entity.BlogAnswer;
import com.project.tripAdvisor.blog.mapper.BlogAnswerMapper;
import com.project.tripAdvisor.blog.service.BlogAnswerService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("/blog/answer")
public class BlogAnswerController {
    private final BlogAnswerMapper blogAnswerMapper;
    private final BlogAnswerService blogAnswerService;

    public BlogAnswerController(BlogAnswerMapper blogAnswerMapper, BlogAnswerService blogAnswerService) {
        this.blogAnswerMapper = blogAnswerMapper;
        this.blogAnswerService = blogAnswerService;
    }

    @PostMapping("/{blog-id}")
    public ResponseEntity postBlogAnswer(@PathVariable("blog-id") Long blogId,
                                         @RequestBody BlogAnswerDto.Post requestBody){
        BlogAnswer blogAnswer = blogAnswerMapper.blogAnswerPostToBlogAnswer(requestBody);
        blogAnswerService.createBlogAnswer(blogAnswer,blogId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{answer-id}")
    public ResponseEntity patchBlogAnswer(@PathVariable("answer-id")Long blogAnswerId,
                                          @RequestBody BlogAnswerDto.Patch requestBody){
        requestBody.setBlogAnswerId(blogAnswerId);

        BlogAnswer blogAnswer = blogAnswerMapper.blogAnswerPatchToBlogAnswer(requestBody);
        blogAnswerService.updateBlogAnswer(blogAnswer,blogAnswer.getMember().getId());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteBlogAnswer(@PathVariable("answer-id")Long blogAnswerId,
                                           @RequestParam Long memberId){
        blogAnswerService.deleteBlogAnswer(blogAnswerId,memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{blog-id}")
    public ResponseEntity getBlogAnswer(@PathVariable("blog-id")Long blogId,
                                        @RequestParam int page){
        Page<BlogAnswer> pageBlogAnswer = blogAnswerService.findBlogAnswers(blogId,page-1);
        List<BlogAnswer> blogAnswers = pageBlogAnswer.getContent();
        return new ResponseEntity<>(new BlogAnswerDto.MultiResponse((blogAnswerMapper.blogAnswersToBlogAnswerResponses(blogAnswers)),pageBlogAnswer),HttpStatus.OK);
    }
}
