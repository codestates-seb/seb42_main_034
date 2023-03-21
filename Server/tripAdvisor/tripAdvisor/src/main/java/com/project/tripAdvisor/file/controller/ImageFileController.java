package com.project.tripAdvisor.file.controller;

import com.project.tripAdvisor.file.entity.ImageFile;
import com.project.tripAdvisor.file.service.ImageFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;

@Controller
public class ImageFileController {
    @Autowired
    ImageFileService imageFileService;

    @Autowired
    ResourceLoader resourceLoader;

    /**
     * post할 때 지정한 위치에 image 파일 저장되는 건 확인했습니다. 추후 다 merge한 이후에 작동 정상적으로 하게끔
     * 로직 설정하면 될 듯 합니다.
     */
    @PostMapping("/image")
    public ResponseEntity<?> postImageFile(@RequestParam("file") MultipartFile file){
        try{
            ImageFile imageFile = imageFileService.save(file);
            return ResponseEntity.ok().body("/image/"+imageFile.getId());
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
    /**
    추후 blogId를 받아서 처리해야할듯? 그럼 블로그 상세조회에서 아마 해야하지 않을까 싶음.
     */
    @GetMapping("/image/{file-id}")
    public ResponseEntity<?> getImageFile(@PathVariable Long fileId){
        try{
            ImageFile imageFile = imageFileService.load(fileId);
            //resourceLoader 를 통해 파일의 경로를 가져옴
            Resource resource = resourceLoader.getResource("file:"+imageFile.getFilePath());
            return ResponseEntity.ok().body(resource);
        }catch (Exception e){
            //exception 발생 위치와 이유 알려줌
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

}
