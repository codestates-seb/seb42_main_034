package com.project.tripAdvisor.member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;

import java.security.Principal;
import java.util.Optional;


public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
//    Member findByEmail(String email);


    /*@Query(value = "SELECT * FROM QUESTION WHERE member_Id = :memberId")
    Member findByEmailForToken(String email);*/

/*    @Query(value = "SELECT * FROM Blog WHERE member_Id = :memberId")
    Page<Member> findByBlog(Pageable pageable);
    @Query(value = "SELECT * FROM Question WHERE member_Id = :memberId")
    Page<Member> findByQuestion(Pageable pageable);
    @Query(value = "SELECT * FROM Answer WHERE member_Id = :memberId")
    Page<Member> findByAnswer(Pageable pageable);*/
}
