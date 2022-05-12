package com.ssafy.alta.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.alta.dto.request.ReadmeUpdateRequest;
import com.ssafy.alta.entity.*;
import com.ssafy.alta.exception.DataNotFoundException;
import com.ssafy.alta.gitutil.GitEmailAPI;
import com.ssafy.alta.gitutil.GitReadmeAPI;
import com.ssafy.alta.repository.*;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

/**
 * packageName 	: com.ssafy.alta.service
 * fileName 	: readmeService
 * author 	    : 김유진
 * date		    : 2022-05-06
 * description	:
 * ===========================================================
 * DATE 		    AUTHOR 		        NOTE
 * -----------------------------------------------------------
 * 2022-05-06	        김유진  		        최초 생성
 */
@Service
public class ReadmeService {
    private GitEmailAPI gitEmailAPI = new GitEmailAPI();
    private GitReadmeAPI gitReadmeAPI = new GitReadmeAPI();
    @Autowired
    private RedisService redisService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudyJoinInfoRepository studyJoinInfoRepository;
    @Autowired
    private StudyRepository studyRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private UserService userService;

    @Autowired
    private CodeRepository codeRepository;
    @Autowired
    private ProblemRepository problemRepository;

    public String updateReadme(Long study_id) {
        String user_id = userService.getCurrentUserId();
        Optional<User> optUser = Optional.ofNullable(userRepository.findById(user_id)
                .orElseThrow(DataNotFoundException::new));
        User user = optUser.get();
//        Study study = studyRepository.getById(40L);
        Study study = studyRepository.getById(study_id);
        int maxPeople =  study.getMaxPeople();
        StringBuilder sb = new StringBuilder();
        String NL = "   \n";
        sb.append("# 스터디 이름 : " + study.getName()).append(NL);
        List<StudyJoinInfo> joinList = studyJoinInfoRepository.findByStudyStudyIdAndStateOrderByUserId(study.getStudyId(), "가입");
        String studyZZang = "";
        List<String> studyZZul = new ArrayList<>();
        for (StudyJoinInfo tmp : joinList) {
            if (tmp.getPosition().equals("그룹장"))
                studyZZang = tmp.getUser().getName();
            else
                studyZZul.add(tmp.getUser().getName());
        }

        sb.append("## 참여인원 ( " + joinList.size() + " / " + maxPeople + ")").append(NL);
        System.out.println(sb);
        System.out.println("studyZZang : " + studyZZang);

        sb.append("스터디장 : "+studyZZang ).append(NL).append("스터디원 : ");
        for (String member : studyZZul) {
            sb.append(member + ", ");
        }
        sb.deleteCharAt(sb.length() - 1).deleteCharAt(sb.length() - 1).append(NL);
        sb.append("## 문제 풀이 내역").append(NL);
        List<Schedule> scheduleList = scheduleRepository.findByStudyStudyIdOrderByStartDateAsc(study.getStudyId());
        int roundIdx = 0;
        for (Schedule schedule : scheduleList) {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            String startDate = formatter.format(schedule.getStartDate());
            String endDate = formatter.format(schedule.getEndDate());
            sb.append(++roundIdx + " 회차 : ").append(startDate).append(" ~ ").append(endDate).append(NL);
            sb.append("|"+"<center>"+"문제"+"</center>"+"|");
            String tableNext = "|:---:|";
            for(int idx = 0; idx < maxPeople; idx++){
                sb.append(idx < joinList.size() ? "<center>"+joinList.get(idx).getUser().getName()+"</center>" + "|" : "-|");
                tableNext += ":---:|";
            }
            sb.append(NL);
            sb.append(tableNext).append(NL);
            List<Problem> problemList = problemRepository.findByScheduleIdOrderById(schedule.getId());

            for (Problem problem : problemList) {
                sb.append("|"+"<center>"+problem.getName()+"</center>").append("|");
                List<Code> codeList = codeRepository.findByProblem_IdOrderByUserId(problem.getId());

                for(int i = 0; i < maxPeople; i++){
                    if(codeList != null && codeList.size() > i)
                    System.out.println(codeList.get(i).toString());
                    if (codeList != null && codeList.size() > i && joinList.get(i).getUser().getId().equals(codeList.get(i).getUser().getId())) {
                        sb.append(joinList.get(i).getUser().getName()).append("|");
                    } else {
                        sb.append("-").append("|");
                    }
                }
                sb.append(NL);
            }

            sb.append("---").append(NL);

        }
        System.out.println(sb);

        // 테스트 진행
        String token = redisService.getAccessToken();
        String sha = gitReadmeAPI.selectReadmeSHA(token, user.getName(), study.getRepositoryName());
        HashMap<String, String> committer = new HashMap<>();
        committer.put("name", user.getName());
        committer.put("email", gitEmailAPI.selectGithubEmail(redisService.getAccessToken()));
        ReadmeUpdateRequest readmeUpdateRequest = new ReadmeUpdateRequest();
        readmeUpdateRequest.setMessage("update Readme " + user.getName() + " " + LocalDate.now());
        readmeUpdateRequest.setContent(sb.toString());
        readmeUpdateRequest.setSha(sha);
        readmeUpdateRequest.setCommitter(committer);

        String returnCode = null;
        try {
            returnCode = gitReadmeAPI.updateReadme(token, user.getName(), study.getRepositoryName(), readmeUpdateRequest).toString();
            System.out.println(returnCode);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }


        return returnCode;
    }
}