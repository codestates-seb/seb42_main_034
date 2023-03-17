package com.project.tripAdvisor.tag.contoroller;

import com.project.tripAdvisor.tag.entity.Tag;
import com.project.tripAdvisor.tag.repository.BlogTagRepository;
import com.project.tripAdvisor.tag.repository.QuestionTagRepository;
import com.project.tripAdvisor.tag.repository.TagRepository;
import com.project.tripAdvisor.tag.service.TagService;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/tags")
public class TagController {
    private final TagRepository tagRepository;
    private final TagService tagService;

    public TagController(TagRepository tagRepository, TagService tagService) {
        this.tagRepository = tagRepository;
        this.tagService = tagService;
    }

    /**
     * api -> 복수형으로 통일할까요..?
     * @param tagName -> validation으로 '#' 검증? 해야하겠죠..?
     * page부분 defaultValue를 준 이유는 초기 태그를 클릭했을 때 page값을 굳이 전달받을 필요가 없을 것같아
     * 처리하였고, 추후 페이지번호를 누를때 값을 넘겨받으면 해당 페이지를 조회할 수 있게끔 하면 됩니다.
     */
    //tag를 포함한 블로그 글 조회
    @GetMapping("/blog")
    public ResponseEntity getBlog(@RequestParam String tagName,
                                  @RequestParam(value="page", required = false,
                                          defaultValue = "1")int page){
        Tag tag = tagRepository.findByName(tagName);
        List<Blog> blogs = tagService.getBlogs(tag.getId());
        Pageable pageable = PageRequest.of(page-1, 15);
        Page<Blog> blogPage = new PageImpl<>(blogs,pageable,blogs.size());
        /**
         * 추후 Response에 대한 건 어차피 전체 목록 조회를 블로그, 질문단에서 할 예정이라 구현이 된 이후 여기 적용만
         * 하면 될 듯해서 비워뒀습니다.
         */
    }

    //tag를 포함한 질문 글 조회
    @GetMapping("/question")
    public ResponseEntity getQuestion(@RequestParam String tagName,
                                      @RequestParam(value="page", required = false,
                                              defaultValue = "1")int page){
        Tag tag = tagRepository.findByName(tagName);
        List<Question> questions = tagService.getQuestions(tag.getId());
        Pageable pageable = PageRequest.of(page-1, 15);
        Page<Question> questionPage = new PageImpl<>(questions,pageable,questions.size());
    }
}
