package com.project.tripAdvisor.file.entity;

import com.project.tripAdvisor.blog.entity.Blog;
import com.project.tripAdvisor.question.entity.Answer;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
@Data
public class ImageFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="file_id")
    private Long id;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String saveFileName;

    @Column(nullable = false)
    private String filePath;

    @Column(nullable = false)
    private String contentType;

    private Long fileSize;


//    public void setBlog(Blog blog) {
//        this.blog = blog;
//        if(!blog.getImageFile().contains(this))
//            blog.getImageFile.add(this);
//    }
}