import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { checkLogin } from '../../modules/LoginTokenChecker';
import { Member } from '../../types/StudyType';
import { StudyDetailStore } from '../../context/StudyDetailContext';
import { memberListApi } from '../../api/apis';

import ALTA_StudyMemberCard from './ALTA_StudyMemberCard';

export default function ALTA_StudyMembers({ studyId }: { studyId: number }) {
  const { members } = useContext(StudyDetailStore);
  const navigate = useNavigate();

  const [showMemberManagement, setShowMemberManagement] =
    useState<boolean>(false);

  // const getMembers = async () => {
  //   if (!(await checkLogin())) navigate('/');
  //   try {
  //     const response = await memberListApi(studyId);

  //     //최대 인원 수까지 빈 멤버 추가
  //     const tmpMember = [...response.members];
  //     while (tmpMember.length < response.studyMaxPeople)
  //       tmpMember.push({
  //         nickname: '',
  //         email: '',
  //         state: '',
  //         position: '',
  //         resistrationData: '',
  //       });

  //     setMembers(tmpMember);
  //     setMaxPeople(response.studyMaxPeople);
  //     if (response.isLeader) setShowMemberManagement(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const goToManagement = (studyId: number) => {
    navigate('/study/member', { state: { studyId } });
  };

  // useEffect(() => {
  //   getMembers();
  // }, []);

  return (
    <div>
      {members.map((member: Member, i: number) => (
        <ALTA_StudyMemberCard
          key={`${i}-${member.nickname}-${member.email}`}
          member={member}
        />
      ))}
      {showMemberManagement && (
        <Link onClick={() => goToManagement(studyId)}>
          <Button sx={btnStyle}>멤버 관리</Button>
        </Link>
      )}
    </div>
  );
}

const Link = styled.a`
  float: right;
  margin-top: 10px;
  cursor: pointer;
`;

const btnStyle = {
  'color': '#000',
  '&:hover': {
    transform: 'scale(1.03)',
  },
  '&:active': {
    transform: 'scale(.97)',
  },
};
