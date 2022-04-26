package com.ssafy.alta.controller;

import com.ssafy.alta.dto.StudyRequest;
import com.ssafy.alta.entity.Study;
import com.ssafy.alta.service.StudyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/study")
public class StudyController {
    @Autowired
    StudyService studyService;

    @PostMapping
    public ResponseEntity insertStudy(@RequestBody StudyRequest studyRequest) {
        studyService.insertStudy(studyRequest);
        return new ResponseEntity(HttpStatus.OK);
    }
}
