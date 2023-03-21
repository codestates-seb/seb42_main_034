package com.project.tripAdvisor.blog.service;

import com.project.tripAdvisor.blog.dto.BlogAnswerCommentPatchDto;
import com.project.tripAdvisor.blog.entity.Blog;
import com.project.tripAdvisor.blog.entity.BlogAnswer;
import com.project.tripAdvisor.blog.entity.BlogAnswerComment;
import com.project.tripAdvisor.blog.repository.BlogAnswerCommentRepository;
import com.project.tripAdvisor.blog.repository.BlogAnswerRepository;
import com.project.tripAdvisor.exception.BusinessLogicException;
import com.project.tripAdvisor.exception.ExceptionCode;
import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.member.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class BlogAnswerService {
    private final BlogAnswerRepository blogAnswerRepository;
    private final BlogService blogService;
    private final MemberService memberService;
    private final BlogAnswerCommentRepository blogAnswerCommentRepository;
    /**
     * 추후 규격보고 수정하면 됩니다.
     * 저는 일단 '15'로 설정해두었습니다.
     */
    private final int size = 15;

    public BlogAnswerService(BlogAnswerRepository blogAnswerRepository, BlogService blogService, MemberService memberService, BlogAnswerCommentRepository blogAnswerCommentRepository) {
        this.blogAnswerRepository = blogAnswerRepository;
        this.blogService = blogService;
        this.memberService = memberService;
        this.blogAnswerCommentRepository = blogAnswerCommentRepository;
    }

    @Transactional
    public BlogAnswer createBlogAnswer(BlogAnswer blogAnswer, Long blogId){
        /**
         * 1. pathVariable로 받은 blogId를 통해 blog 조회
         * 2. blogAnswer에 있는 memberId를 통해 member 조회
         * 3. blogAnswer에 각각 부여 -> blogAnswer.setBlog(blog);, blogAnswer.setMember(member);
         * 4. blog에서 조회할 수 있도록 (양방향 매핑 편의를 위해) blog.setBlogAnswer(blog);
         */
        Blog blog = blogService.findVerifyBlog(blogId);
        Member member = memberService.findVerifiedMember(blogAnswer.getMember().getId());
        int commentCnt = blog.getCommentCnt();
        blogAnswer.setMember(member);
        blogAnswer.setBlog(blog);
        blog.setBlogAnswer(blogAnswer);
        blog.setCommentCnt(commentCnt+1);
        return blogAnswerRepository.save(blogAnswer);
    }
    public BlogAnswer updateBlogAnswer(BlogAnswer blogAnswer, Long memberId){
        BlogAnswer findBlogAnswer = findVerifiedBlogAnswer(blogAnswer.getId());
        /**
         * memberId와 answer이 동일한 사람인지 확인
         * ->verifiedAuthorization(findBlogAnswer, memberId);
         */
        if (findBlogAnswer.getMember().getId()!=memberId) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }
        Optional.ofNullable(blogAnswer.getContent())
                .ifPresent(content->findBlogAnswer.setContent(content));

        return blogAnswerRepository.save(findBlogAnswer);
    }
    @Transactional
    public void deleteBlogAnswer(Long blogAnswerId,Long memberId){
        BlogAnswer blogAnswer = findVerifiedBlogAnswer(blogAnswerId);
        Blog blog = blogService.findVerifyBlog(blogAnswer.getBlog().getId());
        int commentCnt = blog.getCommentCnt();
        blog.setCommentCnt(commentCnt-1);
        /**
         * memberId와 answer이 동일한 사람인지 확인
         * ->verifiedAuthorization(findBlogAnswer, memberId);
         */
        if (blogAnswer.getMember().getId()!=memberId) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }
        blogAnswerRepository.delete(blogAnswer);
    }

    public Page<BlogAnswer> findBlogAnswers (Long blogId,int page){
        return blogAnswerRepository.findByBlogId(blogId, PageRequest.of(page,size));
    }

    public BlogAnswer findVerifiedBlogAnswer(Long blogAnswerId){

        Optional<BlogAnswer> optionalBlogAnswer =
                blogAnswerRepository.findById(blogAnswerId);
        BlogAnswer findBlogAnswer=
                optionalBlogAnswer.orElseThrow(()->
                        new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findBlogAnswer;
    }

    /**
     * 대댓글 관련 서비스
     */
    @Transactional
    public BlogAnswerComment createBlogAnswerComment(BlogAnswerComment blogAnswerComment,Long blogAnswerId){
        BlogAnswer blogAnswer = findVerifiedBlogAnswer(blogAnswerId);
        blogAnswerComment.setBlogAnswer(blogAnswer);
        Member member = memberService.findVerifiedMember(blogAnswerComment.getMember().getId());
        blogAnswerComment.setMember(member);
        Blog blog = blogAnswer.getBlog();
        int commentCnt = blog.getCommentCnt();
        blog.setCommentCnt(commentCnt+1);

        return blogAnswerCommentRepository.save(blogAnswerComment);
    }

    public BlogAnswerComment updateBlogAnswerComment(BlogAnswerComment blogAnswerComment, Long memberId){
        BlogAnswerComment findBlogAnswerComment = findVerifiedBlogAnswerComment(blogAnswerComment.getId());
        if (blogAnswerComment.getMember().getId()!=memberId) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }

        Optional.ofNullable(blogAnswerComment.getContent())
                .ifPresent(content->findBlogAnswerComment.setContent(content));

        return blogAnswerCommentRepository.save(findBlogAnswerComment);
    }

    public void deleteBlogAnswerComment(Long commentId,Long memberId){
        BlogAnswerComment blogAnswerComment = findVerifiedBlogAnswerComment(commentId);
        if (blogAnswerComment.getMember().getId()!=memberId) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }

        BlogAnswer blogAnswer = findVerifiedBlogAnswer(blogAnswerComment.getBlogAnswer().getId());
        Blog blog = blogAnswer.getBlog();
        int commentCnt = blog.getCommentCnt();
        blog.setCommentCnt(commentCnt-1);

        blogAnswerCommentRepository.delete(blogAnswerComment);
    }

    public BlogAnswerComment findVerifiedBlogAnswerComment(Long commentId){
        Optional<BlogAnswerComment> optionalAnswerComment =
                blogAnswerCommentRepository.findById(commentId);
        BlogAnswerComment findAnswerComment=
                optionalAnswerComment.orElseThrow(()->
                        new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findAnswerComment;
    }
}
