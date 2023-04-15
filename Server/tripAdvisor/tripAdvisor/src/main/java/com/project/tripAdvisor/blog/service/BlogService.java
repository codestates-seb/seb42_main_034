package com.project.tripAdvisor.blog.service;

import com.project.tripAdvisor.blog.entity.Blog;
import com.project.tripAdvisor.blog.entity.BlogLike;
import com.project.tripAdvisor.blog.repository.BlogAnswerRepository;
import com.project.tripAdvisor.blog.repository.BlogLikeRepository;
import com.project.tripAdvisor.blog.repository.BlogRepository;
import com.project.tripAdvisor.exception.BusinessLogicException;
import com.project.tripAdvisor.exception.ExceptionCode;
import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.member.service.MemberService;
import com.project.tripAdvisor.tag.entity.Tag;
import com.project.tripAdvisor.tag.repository.BlogTagRepository;
import com.project.tripAdvisor.tag.repository.TagRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class BlogService {

    private final BlogRepository blogRepository;
    //    private final BlogLikeRepository blogLikeRepository;
    private final BlogTagRepository blogTagRepository;
    private final TagRepository tagRepository;
    private final BlogAnswerRepository blogAnswerRepository;
    private final MemberService memberService;
    private final BlogLikeRepository blogLikeRepository;

    public BlogService(BlogRepository blogRepository, BlogTagRepository blogTagRepository, TagRepository tagRepository, BlogAnswerRepository blogAnswerRepository, MemberService memberService, BlogLikeRepository blogLikeRepository) {
        this.blogRepository = blogRepository;
        this.blogTagRepository = blogTagRepository;
        this.tagRepository = tagRepository;
        this.blogAnswerRepository = blogAnswerRepository;
        this.memberService = memberService;
        this.blogLikeRepository = blogLikeRepository;
    }

    // 포스트 등록

    public Blog createBlog(Blog blog) {

        Blog savedBlog = blogRepository.save(blog);

        return savedBlog;
    }

    // 포스트 수정
    public Blog updateBlog(Blog blog,Long memberId) {

        Blog findBlog = findVerifyBlog(blog.getId());

        if (findBlog.getMember().getId() != memberId) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }
        Optional.ofNullable(blog.getTitle())
                .ifPresent(title->findBlog.setTitle(title));
        Optional.ofNullable(blog.getContent())
                .ifPresent(content->findBlog.setContent(content));

        return blogRepository.save(findBlog);

    }

    //포스트 삭제
    public void deleteBlog(Long blogId, Long memberId) {
        Blog findBlog = findVerifyBlog(blogId);

        if (findBlog.getMember().getId()!=memberId) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }

        blogRepository.delete(findBlog);

    }

    // 포스트 조회
    public Page<Blog> findBlog(String category, int page, String sortedBy) {
        sortedBy = sortedBy.toUpperCase();

        if (sortedBy.equals("HOT")) {
            return blogRepository.findAllByCategory(category,PageRequest.of(page, 15,
                    Sort.by("viewCnt").descending()));

        } else {

            return blogRepository.findAllByCategory(category,PageRequest.of(page, 15,
                    Sort.by("createdAt").descending()));
        }
    }

    // 포스트 상세 조회
    public Blog viewBlog(Long blogId) {
        Blog findBlog = findVerifyBlog(blogId);
        findBlog.plusViewCount();
        return findBlog;

    }

    // 좋아요
    public void switchLike(Long blogId, Long memberId) {
        Blog blog = findVerifyBlog(blogId);
        Member member = memberService.findVerifiedMember(memberId);
        BlogLike blogLike = new BlogLike();
        blogLike.setMember(member);
        blogLike.setBlog(blog);
        Optional<BlogLike> optionalBlogLike = blogLikeRepository.findByMemberAndBlog(memberId,blogId);
        int likeCnt = blog.getLikeCnt();

        if (optionalBlogLike.isEmpty()) {
            addBlogLike(blog, blogLike, likeCnt);
        } else {
            addBlogLikeIfLikeType(blog, optionalBlogLike, likeCnt);
        }
    }


    private void addBlogLikeIfLikeType(Blog blog, Optional<BlogLike> optionalBlogLike, int likeCnt) {
        BlogLike findBlogLike = optionalBlogLike.get();
        boolean likeType = findBlogLike.isLikeType();


        if(!likeType){
            likeCnt+=1;
            blog.setLikeCnt(likeCnt);
            findBlogLike.setLikeType(true);
            blogRepository.save(blog);
        }
    }


    private void addBlogLike(Blog blog, BlogLike blogLike, int likeCnt) {
        blogLike.setLikeType(true);
        likeCnt++;
        blog.setLikeCnt(likeCnt);
        blogLikeRepository.save(blogLike);
        blogRepository.save(blog);

    }

    // 포스트 검색

    public Page<Blog> searchBlog(int page, String keyword, String type) {
        type = type.toUpperCase();

        if (type.equals("USER")) {
            Long memberId = Long.valueOf(keyword);
            return blogRepository.findByMemberId(memberId, PageRequest.of(page, 15));
        } else if (type.equals("TAG")) {
            keyword = keyword.toUpperCase();

            Tag tag = tagRepository.findByName(keyword);

            List<Long> blogIds = tag.getBlogTags().stream()
                    .map(blogTag -> blogTag.getBlog().getId())
                    .collect(Collectors.toList());

            return blogRepository.findByIdIn(blogIds, PageRequest.of(page, 15));

        } else {
            keyword = "%" + keyword + "%";

            return blogRepository.findByTitleLikeOrContentLike(keyword, keyword, PageRequest.of(page, 15));
        }


    }

    public Blog findVerifyBlog(Long blogId) {
        Optional<Blog> optionalBlog = blogRepository.findById(blogId);
        Blog findBlog = optionalBlog
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.BLOG_NOT_FOUND));

        return findBlog;
    }

    public Page<Blog> findMemberBlogs(long id, int page, int size) {

        PageRequest pageRequest = PageRequest.of(page, size,
                Sort.by("createdAt").descending());
        return blogRepository.findAllByMemberId(id, pageRequest);
    }

//    public LikeType getLikeStatus(Long memberId, Long blogId) {
//        Optional<BlogLike> optionalBlogLike = blogikeRepository.findByMemberIdAndBlogId(memberId, blogId);
//
//        if (optionalBlogLike.isPresent()) {
//            return optionalBlogLike.get().getLikeType();
//        } else {
//            return null;
//        }
//    }
}