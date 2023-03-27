package com.project.tripAdvisor.tag.service;

import com.project.tripAdvisor.blog.entity.Blog;
import com.project.tripAdvisor.blog.repository.BlogRepository;
import com.project.tripAdvisor.exception.BusinessLogicException;
import com.project.tripAdvisor.exception.ExceptionCode;
import com.project.tripAdvisor.question.entity.Question;
import com.project.tripAdvisor.question.repository.QuestionRepository;
import com.project.tripAdvisor.tag.entity.BlogTag;
import com.project.tripAdvisor.tag.entity.QuestionTag;
import com.project.tripAdvisor.tag.entity.Tag;
import com.project.tripAdvisor.tag.repository.BlogTagRepository;
import com.project.tripAdvisor.tag.repository.QuestionTagRepository;
import com.project.tripAdvisor.tag.repository.TagRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TagService {
    private final TagRepository tagRepository;
    private final BlogRepository blogRepository;
    private final BlogTagRepository blogTagRepository;
    private final QuestionTagRepository questionTagRepository;

    private final QuestionRepository questionRepository;

    public TagService(TagRepository tagRepository, BlogRepository blogRepository, BlogTagRepository blogTagRepository, QuestionTagRepository questionTagRepository, QuestionRepository questionRepository) {
        this.tagRepository = tagRepository;
        this.blogRepository = blogRepository;
        this.blogTagRepository = blogTagRepository;
        this.questionTagRepository = questionTagRepository;
        this.questionRepository = questionRepository;
    }

    public List<BlogTag> createBlogTag(List<String> tags, Long blogId){
        List<BlogTag> blogTags = new ArrayList<>();
        for(String tagName : tags){
            Tag tag = tagRepository.findByName(tagName);
            if(tag==null){
                tag=new Tag(tagName);
                tagRepository.save(tag);
            }
            BlogTag blogTag = new BlogTag();
            Optional<Blog> optionalBlog =
                    blogRepository.findById(blogId);
            Blog findBlog=
                    optionalBlog.orElseThrow(()->
                            new BusinessLogicException(ExceptionCode.BLOG_NOT_FOUND));
            blogTag.setBlog(findBlog);
            blogTag.setTag(tag);
            blogTagRepository.save(blogTag);
            blogTags.add(blogTag);
        }
        return blogTags;

        /**
         * blogRepository.save는 blogService 단에서 한번에 처리하시면 될 듯합니다.
         */
    }

    public List<BlogTag> updateBlogTag(List<String> tags, Long blogId){
        List<BlogTag> blogTags = new ArrayList<>();
        blogTagRepository.deleteAllByBlog_Id(blogId);
        for(String tagName : tags){
            Tag tag = tagRepository.findByName(tagName);
            if(tag==null){
                tag=new Tag(tagName);
                tagRepository.save(tag);
            }
            BlogTag blogTag = new BlogTag();
            Optional<Blog> optionalBlog =
                    blogRepository.findById(blogId);
            Blog findBlog=
                    optionalBlog.orElseThrow(()->
                            new BusinessLogicException(ExceptionCode.BLOG_NOT_FOUND));
            blogTag.setBlog(findBlog);
            blogTag.setTag(tag);
            blogTagRepository.save(blogTag);
            blogTags.add(blogTag);
        }
        return blogTags;
    }

    public List<QuestionTag> createQuestionTag(List<String> tags, Long questionId){
        List<QuestionTag> questionTags = new ArrayList<>();
        questionTagRepository.deleteAllByQuestion_Id(questionId);
        for(String tagName : tags){
            Tag tag = tagRepository.findByName(tagName);
            if(tag==null){
                tag=new Tag(tagName);
                tagRepository.save(tag);
            }
            QuestionTag questionTag = new QuestionTag();
            Optional<Question> optionalQuestion =
                    questionRepository.findById(questionId);
            Question findQuestion =
                    optionalQuestion.orElseThrow(() ->
                            new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
            questionTag.setQuestion(findQuestion);
            questionTag.setTag(tag);
            questionTagRepository.save(questionTag);
            questionTags.add(questionTag);
        }
        return questionTags;
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
