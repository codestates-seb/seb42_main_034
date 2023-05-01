package com.project.tripAdvisor.member.service;

import com.project.tripAdvisor.blog.entity.Blog;
import com.project.tripAdvisor.blog.service.BlogService;
import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.question.entity.Question;
import com.project.tripAdvisor.question.service.QuestionService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class MemberFindService {

    private final QuestionService questionService;
    private final MemberService memberService;
    private final BlogService blogService;

    public MemberFindService(QuestionService questionService, MemberService memberService,
                             BlogService blogService) {
        this.questionService = questionService;
        this.memberService = memberService;
        this.blogService = blogService;
    }

    @Transactional
    public Member updateMember(Member member, String email){
        return memberService.updateMember(member, email);
    }

    @Transactional
    public Page<Question> findMyQuestions(String email, int page, int size){
        Member member = memberService.findMemberByEmail(email);


//        PageRequest pageRequest = PageRequest.of(page, size,
//                Sort.by("createdAt").descending());

        return questionService.findMemberQuestions(member.getId(), page-1, size);
    }

    @Transactional
    public void deleteMember(String email){
        Member member = memberService.findMemberByEmail(email);
        memberService.deleteMember(member);
    }

    public Page<Blog> findMyBlogs(String email, int page, int size){
        Member member = memberService.findMemberByEmail(email);
        return blogService.findMemberBlogs(member.getId(), page -1 ,size);
    }

    public Member findMyProfile(String email){
        Member member = memberService.findMemberByEmail(email);
        return memberService.findMember(member.getId());
    }
}