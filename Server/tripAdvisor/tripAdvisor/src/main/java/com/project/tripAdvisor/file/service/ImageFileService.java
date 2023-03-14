package com.project.tripAdvisor.file.service;

import com.project.tripAdvisor.file.entity.ImageFile;
import com.project.tripAdvisor.file.repository.ImageFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageFileService {
    @Autowired
    ImageFileRepository imageFileRepository;

    /**
     *  추후 s3 저장소 경로 예정
     */
    private final Path saveLocation=Paths.get("C:\\Users\\ANY\\photo");

    public ImageFile save(MultipartFile file) throws Exception {
        try{
            if(file.isEmpty()){
                throw new Exception("Failed to store empty file "+file.getOriginalFilename());
            }
            String saveFileName = fileSave(saveLocation.toString(),file);
            ImageFile saveFile = new ImageFile();
            saveFile.setFileName(file.getOriginalFilename());
            saveFile.setSaveFileName(saveFileName);
            saveFile.setContentType(file.getContentType());
            saveFile.setFileSize(file.getResource().contentLength());
            saveFile.setFilePath(saveLocation.toString().replace(File.separatorChar, '/') +'/' + saveFileName);
            imageFileRepository.save(saveFile);

            return saveFile;
        }catch (IOException e){
            throw new Exception("Failed to store file " + file.getOriginalFilename(), e);
        }
    }

    public ImageFile load(Long fileId){
        return imageFileRepository.findById(fileId).get();
    }

    /**
     * uuid는 파일명 중복을 방지하기 위함입니다!
     *
     */
    public String fileSave(String saveLocation, MultipartFile file) throws IOException {
        File saveDir = new File(saveLocation);
        if(!saveDir.exists()){
            saveDir.mkdirs();
        }
        // saveFileName 생성
        UUID uuid = UUID.randomUUID();
        String saveFileName = uuid.toString()+file.getOriginalFilename();
        File saveFile = new File(saveLocation,saveFileName);
        FileCopyUtils.copy(file.getBytes(), saveFile);

        return saveFileName;
    }
}
