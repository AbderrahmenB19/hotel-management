package com.example.Hotel_management.file;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
@Slf4j

public class FileUtils {
    public static byte[] readFile(
            String roomImageUrl
    ){
        if(StringUtils.isEmpty(roomImageUrl)){
            return null;
        }
        Path pathOfFile=new File(roomImageUrl).toPath();
        try {
            log.info("file read successfully ");
            return Files.readAllBytes(pathOfFile);

        } catch (IOException e) {

            log.warn("Nou file found in the path {}", roomImageUrl);
        }
        return null;
    }
}
