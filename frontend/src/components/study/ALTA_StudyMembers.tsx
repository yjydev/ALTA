import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { StudyMember } from '../../types';
import { StudyDetailStore } from '../../context/StudyDetailContext';
import { subColor } from '../../modules/colorChart';

import ALTA_StudyMemberCard from './ALTA_StudyMemberCard';

type Params = {
  studyId: string | undefined;
};

export default function ALTA_StudyMembers() {
  const { studyId } = useParams<Params>();
  const { members, isLeader } = useContext(StudyDetailStore);
  const navigate = useNavigate();

  const goMemberManagement = (): void => navigate(`/study/${studyId}/member`);

  return (
    <Box sx={wrapper}>
      <h1>스터디 멤버 목록</h1>
      <Box sx={titleStyle}>멤버 목록</Box>
      <Box sx={listStyle}>
        {members.map(
          (member: StudyMember, i: number): JSX.Element => (
            <ALTA_StudyMemberCard key={`${i}-${member.nickname}-${member.email}`} member={member} />
          ),
        )}
      </Box>
      {isLeader && (
        <StyledLink onClick={(): void => goMemberManagement()}>
          <Button sx={btnStyle}>멤버 관리</Button>
        </StyledLink>
      )}
    </Box>
  );
}

const wrapper = {
  width: '90%',
};

const titleStyle = {
  position: 'relative',
  marginBottom: '10px',
  padding: '5px 10px',
  boxSizing: 'border-box',
  borderBottom: '1px solid black',
  fontSize: '20px',
  textAlign: 'center',
};

const listStyle = {
  padding: 2,
  margin: 2,
  boxSizing: 'border-box',
  backgroundColor: subColor,
};

const StyledLink = styled.a`
  float: right;
  margin-right: 20px;
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
