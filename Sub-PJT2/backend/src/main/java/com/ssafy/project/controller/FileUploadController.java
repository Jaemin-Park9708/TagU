package com.ssafy.project.controller;

import com.ssafy.project.service.ImageService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
@Tag(name = "태스트용, 프런트에서 안쓰이는 API임!) 파일 업로드", description = "")
public class FileUploadController {

    private final ImageService imageService;

    @PostMapping("/uploadTest")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            return ResponseEntity.ok(imageService.saveImageInS3(file, file.getOriginalFilename()));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}