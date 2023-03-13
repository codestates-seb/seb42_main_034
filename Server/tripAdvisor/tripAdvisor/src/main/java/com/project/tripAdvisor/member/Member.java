package com.project.tripAdvisor.member;

import com.project.tripAdvisor.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;

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

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(nullable = false)
    private String location;

//    @OneToMany(mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<Question> questions = new ArrayList<>();

//    @OneToMany(mappedBy = "member",cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<Answer> answers = new ArrayList<>();

//    @OneToMany(mappedBy = "member",cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<Blog> blogs = new ArrayList<>();

//    @OneToMany(mappedBy = "member",cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private MemberAnswerLike memberAnswerLike = new MemberAnswerLike;

    @Enumerated(value = EnumType.STRING)
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
