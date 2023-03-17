package com.project.tripAdvisor.tag.service;

import com.project.tripAdvisor.tag.entity.BlogTag;
import com.project.tripAdvisor.tag.entity.QuestionTag;
import com.project.tripAdvisor.tag.entity.Tag;
import com.project.tripAdvisor.tag.repository.BlogTagRepository;
import com.project.tripAdvisor.tag.repository.QuestionTagRepository;
import com.project.tripAdvisor.tag.repository.TagRepository;

import java.util.ArrayList;
import java.util.List;

public class TagService {
    private final TagRepository tagRepository;
    private final BlogTagRepository blogTagRepository;
    private final QuestionTagRepository questionTagRepository;

    public TagService(TagRepository tagRepository, BlogTagRepository blogTagRepository, QuestionTagRepository questionTagRepository) {
        this.tagRepository = tagRepository;
        this.blogTagRepository = blogTagRepository;
        this.questionTagRepository = questionTagRepository;
    }

    public void createBlogTag(List<String> tags, Long blogId){
        List<Tag> tagList = new ArrayList<>();
        for(String tagName : tags){
            Tag tag = tagRepository.findByName(tagName);
            if(tag==null){
                tag=new Tag(tagName);
                tagRepository.save(tag);
            }
            tagList.add(tag);
        }
        Blog blog = blogRepository.findById(blogId);
        blog.setTags(tagList);
        /**
         * blogRepository.save는 blogService 단에서 한번에 처리하시면 될 듯합니다.
         */
    }

    public void createQuestionTag(List<String> tags,Long questionId){
        List<Tag> tagList = new ArrayList<>();
        for(String tagName : tags){
            Tag tag = tagRepository.findByName(tagName);
            if(tag==null){
                tag=new Tag(tagName);
                tagRepository.save(tag);
            }
            tagList.add(tag);
        }
        Question question = questionRepository.findById(questionId);
        question.setTags(tagList);
        /**
         * questionRepository.save는 questionService 단에서 한번에 처리하시면 될 듯합니다.
         */
    }

    public List<Blog> getBlogs(Long tagId){
        List<BlogTag> blogTags = blogTagRepository.findByTag_Id(tagId);
        List<Blog> blogs = new ArrayList<>();
        for(BlogTag blogTag : blogTags){
            Blog blog = blogTag.getBlog();
            blogs.add(blog);
        }
        return blogs;
    }

    public List<Question> getQuestions(Long tagId){
        List<QuestionTag> questionTags = questionTagRepository.findByTag_Id(tagId);
        List<Question> questions = new ArrayList<>();
        for(QuestionTag questionTag : questionTags){
            Question question = questionTag.getQuestion();
            questions.add(question);
        }
        return questions;
    }
}
