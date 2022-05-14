package com.ssafy.alta.controller;

import com.ssafy.alta.dto.request.CommentUpdateSolvedRequest;
import com.ssafy.alta.dto.response.AlertResponse;
import com.ssafy.alta.service.AlertService;
import com.ssafy.alta.service.NotificationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

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
    private final NotificationService notificationService;

    @GetMapping
    @ApiOperation(value = "알림 리스트 조회", notes = "알림 리스트를 조회합니다.")
    public ResponseEntity selectAlertList() {
        List<AlertResponse> alertResponse = alertService.selectAlertUnChecked();
        return new ResponseEntity<>(alertResponse, HttpStatus.OK);
    }

    @PutMapping("/checked")
    @ApiOperation(value = "알림 모두 읽음으로 변경", notes = "알림을 모두 읽음 상태로 변경합니다")
    public ResponseEntity updateAlertListChecked() {
        alertService.updateAlertListChecked();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{alert_id}/checked")
    @ApiOperation(value = "특정 알림을 읽음으로 변경", notes = "특정한 알림을 읽음으로 변경합니다.")
    public ResponseEntity updateAlertChecked(@PathVariable("alert_id") Long alertId) {
        alertService.updateAlertChecked(alertId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(produces = "text/event-stream")
    @ApiOperation(value = "서버와 sse 연결 요청", notes = "서버와 sse 연결을 맺습니다.")
    public SseEmitter subscribe() {
        return notificationService.subscribe();
    }

}
