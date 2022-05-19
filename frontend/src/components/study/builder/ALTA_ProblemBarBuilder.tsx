import { Button, Grid, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import styled from '@emotion/styled';

import { StudyMember, Problem, Code } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { blackColor, mainColor } from '../../../modules/colorChart';

import ALTA_Tooltip from '../../common/ALTA_Tooltip';
import { generateError } from '../../../modules/generateAlert';

type FilperProps = {
  fliper: () => void;
};

export const problemBarFrontBuilder = (
  problem: Problem,
  members: StudyMember[],
  language: string,
  maxPeople: number,
  studyId: number,
) =>
  function Front({ fliper }: FilperProps) {
    const findCodeId = (nickname: string, codes: Code[]): number | null => {
      for (const code of codes) {
        if (code.nickname === nickname) return code.id;
      }
      return null;
    };

    return (
      <Grid container sx={tableBodyStyle}>
        <Grid item xs={4} sx={sellStyle}>
          <Button sx={problemEditBtnStyle} onClick={fliper}>
            <ALTA_Tooltip title="문제 수정하기">
              <EditIcon />
            </ALTA_Tooltip>
          </Button>
          <Typography sx={ellipsisStyle}>
            <A href={problem.link} target="_blank">
              {problem.name}
            </A>
          </Typography>
        </Grid>
        <Grid item xs={8} sx={sellStyle}>
          <Grid container>
            {members.map(
              (member: StudyMember, i: number): JSX.Element => (
                <Grid item key={`${i}-${member.nickname}`} xs={12 / maxPeople} sx={sellStyle}>
                  <Typography>
                    {member.nickname ? (
                      <SellBtn
                        codeId={findCodeId(member.nickname, problem.codes)}
                        problem={problem}
                        memberName={member.nickname}
                        studyId={studyId}
                        language={language}
                      />
                    ) : (
                      '-'
                    )}
                  </Typography>
                </Grid>
              ),
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  };

type SellBtnProps = {
  codeId: number | null;
  problem: Problem;
  memberName: string;
  studyId: number;
  language: string;
};

function SellBtn({ codeId, problem, memberName, studyId, language }: SellBtnProps) {
  const navigate = useNavigate();
  const userData = localStorage.getItem('UserData');

  const goCodeSumbit = (): void => {
    if (userData && JSON.parse(userData).nickname !== memberName) {
      generateError('다른 사람의 제출 버튼을 누르셨습니다', '');
    } else {
      const problemId = problem.id;
      navigate(`/study/${studyId}/${problemId}/${problem.name}/0/code-submit/${language}`);
    }
  };

  const goCodeDetail = (): void => {
    if (codeId) navigate(`/study/${studyId}/${problem.name}/code/${codeId}/${language}`);
  };

  return (
    <>
      {codeId ? (
        <a>
          <Button onClick={goCodeDetail}>코드 보기</Button>
        </a>
      ) : (
        <a>
          <Button sx={omisstionBtnStyle} onClick={goCodeSumbit}>
            코드 제출
          </Button>
        </a>
      )}
    </>
  );
}
const tableBodyStyle = {
  'height': '40px',
  '&:nth-of-type(even)': {
    backgroundColor: 'rgba(224, 212, 194, 0.3)',
  },
};

const sellStyle = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const ellipsisStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const omisstionBtnStyle = {
  color: 'error.main',
};

const problemEditBtnStyle = {
  'position': 'absolute',
  'minWidth': '20px',
  'padding': 0.5,
  'left': 2,
  'cursor': 'pointer',
  'color': blackColor,
  '&:hover': {
    color: 'primary.main',
  },
  '*': {
    fontSize: '20px',
  },
};

const A = styled.a`
  all: unset;
  cursor: pointer;
  &:hover {
    color: ${mainColor};
  }
`;
