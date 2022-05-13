import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { StudyMember } from '../../types';
import { StudyDetailStore } from '../../context/StudyDetailContext';

import ALTA_StudyMemberCard from './ALTA_StudyMemberCard';

type Params = {
  studyId: string | undefined;
};

export default function ALTA_StudyMembers() {
  const { studyId } = useParams<Params>();
  const { members, isLeader } = useContext(StudyDetailStore);
  const navigate = useNavigate();

  const goMemberManagement = (): void => {
    navigate(`/study/${studyId}/member`);
  };

  return (
    <div>
      {members.map(
        (member: StudyMember, i: number): JSX.Element => (
          <ALTA_StudyMemberCard key={`${i}-${member.nickname}-${member.email}`} member={member} />
        ),
      )}
      {isLeader && (
        <StyledLink onClick={(): void => goMemberManagement()}>
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
