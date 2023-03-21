package com.project.tripAdvisor.tag.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    public Tag(String name) {
        this.name = name;
    }

    @OneToMany(mappedBy = "tag", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<BlogTag> blogTags=new ArrayList<>();
}
