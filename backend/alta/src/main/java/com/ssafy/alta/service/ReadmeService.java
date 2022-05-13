package com.ssafy.alta.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.alta.dto.request.ReadmeUpdateRequest;
import com.ssafy.alta.entity.*;
import com.ssafy.alta.exception.DataNotFoundException;
import com.ssafy.alta.gitutil.GitEmailAPI;
import com.ssafy.alta.gitutil.GitReadmeAPI;
import com.ssafy.alta.repository.*;
import com.ssafy.alta.util.FileLanguageUtil;
import com.ssafy.alta.util.Language;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
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
@RequiredArgsConstructor
public class ReadmeService {
    private final GitEmailAPI gitEmailAPI = new GitEmailAPI();
    private final GitReadmeAPI gitReadmeAPI = new GitReadmeAPI();

    private final UserRepository userRepository;
    private final StudyJoinInfoRepository studyJoinInfoRepository;
    private final StudyRepository studyRepository;
    private final ScheduleRepository scheduleRepository;
    private final CodeRepository codeRepository;
    private final ProblemRepository problemRepository;

    private final RedisService redisService;
    private final UserService userService;

    private final FileLanguageUtil fileLanguageUtil = FileLanguageUtil.getInstanse();

    public String updateReadme(Long study_id) {
        String userId = userService.getCurrentUserId();
        Optional<User> optUser = Optional.ofNullable(userRepository.findById(userId)
                .orElseThrow(DataNotFoundException::new));
        User user = optUser.get();
        Study study = studyRepository.getById(study_id);
        int maxPeople = study.getMaxPeople();
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

        sb.append("스터디장 : " + studyZZang).append(NL).append("스터디원 : ");
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
            sb.append("|" + "<center>" + "문제" + "</center>" + "|");
            String tableNext = "|:---:|";
            for (int idx = 0; idx < maxPeople; idx++) {
                sb.append(idx < joinList.size() ? "<center>" + joinList.get(idx).getUser().getName() + "</center>" + "|" : "-|");
                tableNext += ":---:|";
            }
            sb.append(NL);
            sb.append(tableNext).append(NL);
            List<Problem> problemList = problemRepository.findByScheduleIdOrderById(schedule.getId());

            for (Problem problem : problemList) {
                String problemName = problem.getName();
                sb.append("|" + "<center>" + problemName + "</center>").append("|");

                for (int i = 0; i < maxPeople; i++) {
                    Optional<Code> codeOpt = codeRepository.findTopByProblem_IdAndUser_IdOrderByIdDesc(problem.getId(), i < joinList.size() ? joinList.get(i).getUser().getId() : "-1");

                    if (codeOpt.isEmpty())
                        sb.append("-").append("|");
                    else {
                        Code code = codeOpt.get();
                        String fileName = code.getFileName();
                        String userName = code.getUser().getName();
                        String problemLink = "";

                        try {
                            problemLink = URLEncoder.encode("풀이모음", "UTF-8") + "/"
                                    + URLEncoder.encode(problemName, "UTF-8") + "/"
                                    + URLEncoder.encode(userName, "UTF-8") + "/"
                                    + URLEncoder.encode(fileName, "UTF-8") + "." +
                                    fileLanguageUtil.getExtention(study.getLanguage());
                        } catch (UnsupportedEncodingException e) {
                            e.printStackTrace();
                        }
                        problemLink = problemLink.replaceAll("[+]", "%20");
                        System.out.println(code + ", " + fileName + ", " + userName + ", " + problemName);
                        sb.append("[" + fileName + "]").append("(" + problemLink + ")").append("|");
                    }

                }
                sb.append(NL);
            }

            sb.append("---").append(NL);

        }

        String token = redisService.getAccessToken(userId);
        String sha = gitReadmeAPI.selectReadmeSHA(token, user.getName(), study.getRepositoryName());
        HashMap<String, String> committer = new HashMap<>();
        committer.put("name", user.getName());
        committer.put("email", gitEmailAPI.selectGithubEmail(token));
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