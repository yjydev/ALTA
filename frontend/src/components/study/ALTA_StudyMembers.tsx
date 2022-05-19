import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import { StudyMember } from '../../types';
import { StudyDetailStore } from '../../context/StudyDetailContext';
import { blackColor, subColor } from '../../modules/colorChart';

import ALTA_StudyMemberCard from './ALTA_StudyMemberCard';
import ALTA_Tooltip from '../common/ALTA_Tooltip';

type Params = {
  studyId: string | undefined;
};

export default function ALTA_StudyMembers() {
  const { studyId } = useParams<Params>();
  const { members, isLeader } = useContext(StudyDetailStore);
  const navigate = useNavigate();
  const goMemberManagement = (): void => navigate(`/study/${studyId}/member`);

  const RenderCardList = () => {
    const tmp: (StudyMember | null)[] = [...members];

    while (tmp.length < 6) tmp.push(null);

    return tmp.map(
      (member: StudyMember | null, i: number): JSX.Element => (
        <ALTA_StudyMemberCard key={`${i}-${JSON.stringify(member)}`} member={member} />
      ),
    );
  };

  return (
    <Box sx={membersWrapper}>
      <h1>스터디 멤버 목록</h1>
      <Box sx={titleStyle}>멤버 목록</Box>
      <Box sx={listStyle}>
        <Box sx={titleStyle}>
          멤버 목록
          {isLeader && (
            <Button sx={btnStyle} onClick={(): void => goMemberManagement()}>
              <ALTA_Tooltip title="멤버 관리하기">
                <PeopleAltIcon />
              </ALTA_Tooltip>
            </Button>
          )}
        </Box>
        {RenderCardList()}
      </Box>
    </Box>
  );
}

const membersWrapper = {
  width: '100%',
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
  padding: 1,
  margin: 2,
  borderRadius: '5px',
  boxSizing: 'border-box',
  backgroundColor: subColor,
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

const btnStyle = {
  'position': 'absolute',
  'right': 5,
  'top': 5,
  'minWidth': '20px',
  'padding': 0.5,
  'cursor': 'pointer',
  'color': blackColor,
  '&:hover': {
    color: 'primary.main',
  },
  '*': {
    fontSize: '20px',
  },
};
