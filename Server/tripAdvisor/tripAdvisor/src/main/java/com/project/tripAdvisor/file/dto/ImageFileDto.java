package com.project.tripAdvisor.file.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

@Getter
@AllArgsConstructor
public class ImageFileDto {
    private String fileName;
    private String uuid;
    private String folderPath;

    public String getImageURL(){
        try{
            return URLEncoder.encode(folderPath+"/" +uuid + fileName,"UTF-8");
        }catch(UnsupportedEncodingException e){
            e.printStackTrace();
        }
        return "";
    }
}
