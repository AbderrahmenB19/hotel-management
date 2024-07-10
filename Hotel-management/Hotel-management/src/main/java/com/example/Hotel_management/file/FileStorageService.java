package com.example.Hotel_management.file;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import static java.io.File.separator;
@Slf4j
@Service
public class FileStorageService {
    @Value("${application.file-upload-path}")
    private String fileUploadPath;
    public String saveFile(
            MultipartFile file ,
            Integer roomId
    ){
        String subPath= "rooms"+ separator + roomId;
        return uploadFile(subPath , file);


    }

    private String uploadFile(String subPath, MultipartFile file) {
        final String finalUploadFile= this.fileUploadPath+ separator + subPath;
        File targetFolder = new File(finalUploadFile);
        if(!targetFolder.exists()){
            boolean FolderIsCreated= targetFolder.mkdirs();
            if (!FolderIsCreated){
                log.warn("Failed to create the target folder ");
                return null;
            }
        }
        final String extension = extractExtension(file.getOriginalFilename());
        final String targetUploadFile= finalUploadFile+separator+System.currentTimeMillis()+extension;
        log.info(targetUploadFile);
        Path targetFile=Path.of(targetUploadFile);

        try{
            Files.write(targetFile,file.getBytes());

            log.info("file was upload successfully");

            return targetUploadFile;
        } catch (IOException e) {
            log.error("file was not saved ");
        }
        return null;
    }

    private String extractExtension(String originalFilename) {
        if (StringUtils.isEmpty(originalFilename)){
            return "";
        }
        int indexOfDot = originalFilename.lastIndexOf(".");
        return originalFilename.substring(indexOfDot);

    }
}
