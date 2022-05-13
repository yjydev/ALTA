package com.ssafy.alta.controller;

import com.ssafy.alta.dto.request.CommentUpdateSolvedRequest;
import com.ssafy.alta.dto.response.AlertResponse;
import com.ssafy.alta.service.AlertService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * packageName 	: com.ssafy.alta.controller
 * fileName 	: AlertController
 * author 	    : 우정연
 * date		    : 2022-05-13
 * description	: 알림 관련 Controller
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-13	    우정연  		    최초 생성
 */

@Api("알림 관련 기능")
@RestController
@RequestMapping("/api/user/alert")
@RequiredArgsConstructor
public class AlertController {
    private final AlertService alertService;

    @GetMapping("/unchecked")
    @ApiOperation(value = "아직 확인하지 않은 알림 리스트 조회", notes = "아직 확인하지 않은 알림 리스트를 조회합니다.")
    public ResponseEntity selectAlertUnChecked() {
        List<AlertResponse> alertResponse = alertService.selectAlertUnChecked();
        return new ResponseEntity<>(alertResponse, HttpStatus.OK);
    }

}
