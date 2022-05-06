import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { getRequest } from '../../api/request';

import { Member } from '../../types/StudyType';
import { StudyDetailStore } from '../../context/StudyDetailContext';

import ALTA_StudyMemberCard from './ALTA_StudyMemberCard';
import ALTA_MembersSkeleton from '../skeleton/ALTA_MembersSkeleton';

export default function ALTA_StudyMembers({ studyId }: { studyId: number }) {
  const { members, setMembers, setMaxPeople } = useContext(StudyDetailStore);

  const [loading, setLoading] = useState<boolean>(true);

  const getMembers = async () => {
    try {
      const response = await getRequest(`/api/study/${studyId}/members`);

      //최대 인원 수까지 빈 멤버 추가
      const tmpMember = [...response.members];
      while (tmpMember.length < response.study_max_people)
        tmpMember.push({
          nickname: '',
          email: '',
          state: '',
          position: '',
          resistrationData: '',
        });
      setLoading(false);
      setMembers(tmpMember);
      setMaxPeople(response.study_max_people);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <>
      {loading && <ALTA_MembersSkeleton />}
      {!loading &&
        members.map((member: Member, i: number) => (
          <ALTA_StudyMemberCard
            key={`${i}-${member.nickname}-${member.email}`}
            member={member}
          />
        ))}
      <Link>
        <Button sx={btnStyle}>멤버 관리</Button>
      </Link>
    </>
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
