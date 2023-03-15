package com.project.tripAdvisor.member;

import com.project.tripAdvisor.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Email
    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false) //암호화 규칙에 따라서 password 길이는 달라질 수 있다.
    private String password;

    @Column(length = 100, nullable = false, unique = true)
    private String nickname;

    @Column(nullable = false)
    private String location;

    //USER의 권한 정보 테이블과 매핑되는 정보
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String > roles = new ArrayList<>();

//    @OneToMany(mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<Question> questions = new ArrayList<>();
    /*public void setQuestion(Question question) { //양방향 연관 관계를 안전하게 매핑하기 위한 solution코드
        this.questions.add(question);
        if (question.getMember() != this) {
            question.setMember(this);
        }
    }*/

//    @OneToMany(mappedBy = "member",cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<Answer> answers = new ArrayList<>();

    /*public void setAnswer(Answer answer) {//양방향 연관 관계를 안전하게 매핑하기 위한 solution코드
        this.answers.add(answer);
        if (answer.getMember() != this) {
            answer.setMember(this);
        }
    }*/

//    @OneToMany(mappedBy = "member",cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<Blog> blogs = new ArrayList<>();

/*    public void setBlog(Blog blog) { //양방향 연관 관계를 안전하게 매핑하기 위한 solution코드
        this.blogs.add(blog);
        if (blog.getMember() != this) {
            blog.setMember(this);
        }
    }*/

//    @OneToMany(mappedBy = "member",cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private MemberAnswerLike memberAnswerLike = new MemberAnswerLike;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    public enum MemberStatus{
        MEMBER_ACTIVE("활동중"),
//        MEMBER_SLEEP("휴면 상태");
        MEMBER_QUIT("탈퇴상태");

        @Getter
        private String status;

        MemberStatus(String status){
            this.status = status;
        }

    }
}
