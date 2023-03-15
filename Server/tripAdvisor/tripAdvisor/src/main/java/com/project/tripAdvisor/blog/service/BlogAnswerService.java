package com.project.tripAdvisor.blog.service;

import com.project.tripAdvisor.blog.entity.BlogAnswer;
import com.project.tripAdvisor.blog.repository.BlogAnswerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BlogAnswerService {
    private final BlogAnswerRepository blogAnswerRepository;
    /**
     * 추후 규격보고 수정하면 됩니다.
     * 저는 일단 '15'로 설정해두었습니다.
     */
    private final int size = 15;

    public BlogAnswerService(BlogAnswerRepository blogAnswerRepository) {
        this.blogAnswerRepository = blogAnswerRepository;
    }

    public BlogAnswer createBlogAnswer(BlogAnswer blogAnswer, Long blogId){
        /**
         * 1. pathVariable로 받은 blogId를 통해 blog 조회
         * 2. blogAnswer에 있는 memberId를 통해 member 조회
         * 3. blogAnswer에 각각 부여 -> blogAnswer.setBlog(blog);, blogAnswer.setMember(member);
         * 4. blog에서 조회할 수 있도록 (양방향 매핑 편의를 위해) blog.setBlogAnswer(blog);
         */
        return blogAnswerRepository.save(blogAnswer);
    }

    public BlogAnswer updateBlogAnswer(BlogAnswer blogAnswer, Long memberId){
        BlogAnswer findBlogAnswer = findVerifiedBlogAnswer(blogAnswer.getId());
        /**
         * memberId와 answer이 동일한 사람인지 확인
         * ->verifiedAuthorization(findBlogAnswer, memberId);
         */

        Optional.ofNullable(blogAnswer.getContent())
                .ifPresent(content->findBlogAnswer.setContent(content));

        return blogAnswerRepository.save(findBlogAnswer);
    }

    public void deleteBlogAnswer(Long blogAnswerId,Long memberId){
        BlogAnswer blogAnswer = findVerifiedBlogAnswer(blogAnswerId);
        /**
         * memberId와 answer이 동일한 사람인지 확인
         * ->verifiedAuthorization(findBlogAnswer, memberId);
         */
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
                        new BusinessLogicException(ExceptionCode.BLOGANSWER_NOT_FOUND));
        return findBlogAnswer;
    }
}
