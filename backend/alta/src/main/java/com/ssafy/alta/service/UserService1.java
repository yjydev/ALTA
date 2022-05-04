package com.ssafy.alta.service;

import com.ssafy.alta.dto.response.UserResponse;
import com.ssafy.alta.entity.Alert;
import com.ssafy.alta.entity.Study;
import com.ssafy.alta.entity.StudyJoinInfo;
import com.ssafy.alta.entity.User;
import com.ssafy.alta.exception.DataNotFoundException;
import com.ssafy.alta.repository.AlertRepository;
import com.ssafy.alta.repository.StudyJoinInfoRepository;
import com.ssafy.alta.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UserService1 {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private StudyJoinInfoRepository studyJoinInfoRepository;

    public UserResponse selectUser(String jwt) {
        String user_id = userService.getCurrentUserId();

        Optional<User> optUser = Optional.ofNullable(userRepository.findById(user_id)
                .orElseThrow(DataNotFoundException::new));

        User user = optUser.get();

        UserResponse userResponse = new UserResponse();
        userResponse.setUserData(new HashMap<>());
        userResponse.setJwt(jwt.split(" ")[1]);

        List<Alert> alertList = alertRepository.findByReceiver_IdOrderByIdAsc(user.getId());
        List<StudyJoinInfo> sjiList = studyJoinInfoRepository.findByUserId(user.getId());
        Integer emailAlert = user.getEmailAlert();
        Integer siteAlert = user.getSiteAlert();

        boolean[] alertChk = {emailAlert / 2 == 1 ? true : false,
                emailAlert % 2 == 1 ? true : false,
                siteAlert / 2 == 1 ? true : false,
                siteAlert % 2 == 1 ? true : false};

        ArrayList<HashMap<String, Object>> arrayAlertList = new ArrayList<>();

        for (Alert alert : alertList) {
            int type = alert.getType();
            if (!alertChk[type])
                continue;
            HashMap<String, Object> tmp = new HashMap<>();
            tmp.put("id", alert.getId());
            tmp.put("contents", alert.getContent());
            tmp.put("read", alert.getIsChecked() == 0 ? false : true);
            arrayAlertList.add(tmp);
        }

        ArrayList<HashMap<String, Object>> arrayStudyList = new ArrayList<>();
        for (StudyJoinInfo sji : sjiList) {
            HashMap<String, Object> tmp = new HashMap<>();
            Study tmpStudy = sji.getStudy();
            tmp.put("id", sji.getId());
            tmp.put("name", tmpStudy.getName());
            tmp.put("introduction", tmpStudy.getIntroduction());
            tmp.put("language", tmpStudy.getLanguage());
            tmp.put("maxPeople", tmpStudy.getMaxPeople());
            tmp.put("joined", studyJoinInfoRepository.countStudyJoinInfoByUserIdAndStudyStudyId(sji.getUser().getId(), tmpStudy.getStudyId()));
            arrayStudyList.add(tmp);
        }

        userResponse.getUserData().put("nickname", user.getNickname());
        userResponse.getUserData().put("githubMail", ""); // 유저 github 정보로부터 이메일 가져오기
        userResponse.getUserData().put("email", user.getEmail());
        userResponse.getUserData().put("alertList", arrayAlertList);
        userResponse.getUserData().put("introduction", user.getIntroduction());
        userResponse.getUserData().put("time", user.getActivityTime());
        userResponse.getUserData().put("languageList", user.getLanguage());
        userResponse.getUserData().put("profileUrl", user.getImage());
        userResponse.getUserData().put("studyList", arrayStudyList);

        return userResponse;
    }

}
