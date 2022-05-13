import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Member } from '../../types/StudyType';
import { StudyDetailStore } from '../../context/StudyDetailContext';

import ALTA_StudyMemberCard from './ALTA_StudyMemberCard';

type Props = {
  studyId: number;
};

export default function ALTA_StudyMembers({ studyId }: Props) {
  const { members, isLeader } = useContext(StudyDetailStore);
  const navigate = useNavigate();

  const goMemberManagement = (studyId: number): void => {
    navigate('/study/member', { state: { studyId } });
  };

  return (
    <div>
      {members.map(
        (member: Member, i: number): JSX.Element => (
          <ALTA_StudyMemberCard key={`${i}-${member.nickname}-${member.email}`} member={member} />
        ),
      )}
      {isLeader && (
        <StyledLink onClick={(): void => goMemberManagement(studyId)}>
          <Button sx={btnStyle}>멤버 관리</Button>
        </StyledLink>
      )}
    </div>
  );
}

const StyledLink = styled.a`
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
