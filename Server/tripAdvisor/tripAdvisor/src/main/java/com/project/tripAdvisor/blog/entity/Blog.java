package com.project.tripAdvisor.blog.entity;

import com.project.tripAdvisor.audit.Auditable;
import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.tag.entity.BlogTag;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Setter
@Getter
@Entity
public class Blog extends Auditable {
    @Id
    @Column(name = "blog_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String title;

    @Column(length = 200)
    private String image_path;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int viewCnt = 0;

    @Column(nullable = false)
    private int CommentCnt;

    @Column(nullable = false)
    private int likeCnt;

//    @Formula("(SELECT COUNT(1) FROM comment a WHERE a.blog_id = blog_id)")
//    private int commentCnt;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    // 1:N

    @Setter(AccessLevel.NONE)
    @OneToMany(mappedBy = "blog", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BlogAnswer> blogAnswers = new ArrayList<>();

//    @Setter(AccessLevel.NONE)
//    @OneToMany(mappedBy = "blog", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    private List<BlogLike> memberLikes = new ArrayList<>();

    @Setter(AccessLevel.NONE)
    @OneToMany(mappedBy = "blog", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BlogTag> blogTags = new ArrayList<>();

    // 양방향
    public void setBlogAnswer(BlogAnswer bloganswer) {
        this.blogAnswers.add(bloganswer);
        this.blogAnswers.add(bloganswer);
        if (bloganswer.getBlog() != this) {
            bloganswer.setBlog(this);
        }
    }

//    public void setMemberLikes(BlogLike blogLike) {
//        this.memberLikes.add(blogLike);
//        if (blogLike.getBlog() != this) {
//            blogLike.setBlog(this);
//        }
//    }

    public void setBlogTags(BlogTag blogTag) {
        this.blogTags.add(blogTag);
        if (blogTag.getBlog() != this) {
            blogTag.setBlog(this);
        }
    }

    public void plusViewCount() {
        this.viewCnt++;
    }


}