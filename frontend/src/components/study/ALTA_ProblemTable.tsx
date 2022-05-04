import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box } from '@mui/system';
import styled from '@emotion/styled';

import { Member, Problem, Code } from '../../types/StudyType';
import { blackColor, subColor, whiteColor } from '../../modules/colorChart';
import { generateError } from '../../modules/generateAlert';

import ALTA_AddBar from '../common/ALTA_AddBar';
import { postRequest } from '../../api/request';
import { StudyDetailStore } from '../../context/StudyDetailContext';

type Props = {
  problems: Problem[];
  members: Member[];
  maxPeople: number;
  studyId: number;
  scheduleId: number;
};

export default function ALTA_ProblemTable({
  problems,
  members,
  maxPeople,
  studyId,
  scheduleId,
}: Props) {
  const findCode = (nickname: string, codes: Code[]): string | null => {
    for (const code of codes) {
      if (code.nickname === nickname) return code.path;
    }
    return null;
  };

  return (
    <Box sx={tableStyle}>
      <Box>
        <Box>
          <Grid container sx={tableHeaderStyle}>
            <Grid item xs={4} sx={sellStyle}>
              <Typography>제목</Typography>
            </Grid>
            <Grid item xs={8} sx={sellStyle}>
              <Grid container>
                {members.map((member, i) => (
                  <Grid item key={i} xs={12 / maxPeople} sx={sellStyle}>
                    <Typography sx={ellipsisStyle}>
                      {member.nickname ? member.nickname : '-'}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box>
        {problems.length > 0 ? (
          problems.map((problem) => (
            <Box key={problem.id}>
              <Box>
                <Grid container sx={tableBodyStyle}>
                  <Grid item xs={4} sx={sellStyle}>
                    <Typography sx={ellipsisStyle}>
                      <A href={problem.link} target="_blank">
                        {problem.name}
                      </A>
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sx={sellStyle}>
                    <Grid container>
                      {members.map((member, i) => (
                        <Grid item key={i} xs={12 / maxPeople} sx={sellStyle}>
                          <Typography>
                            {member.nickname ? (
                              <SellBtn
                                path={findCode(member.nickname, problem.codes)}
                                problem={problem}
                                memberName={member.nickname}
                                studyId={studyId}
                              />
                            ) : (
                              '-'
                            )}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          ))
        ) : (
          <></>
        )}
      </Box>
      <ALTA_AddBar
        height="40px"
        front={<Front />}
        back={
          <Back studyId={studyId} problems={problems} scheduleId={scheduleId} />
        }
      />
    </Box>
  );
}

function Front() {
  return <AddCircleIcon sx={{ color: blackColor, opacity: '0.5' }} />;
}

function Back({
  studyId,
  problems,
  scheduleId,
}: {
  studyId: number;
  problems: Problem[];
  scheduleId: number;
}) {
  const { getReadmeContents } = useContext(StudyDetailStore);

  const [problemName, setPropblemName] = useState<string>('');
  const [problemLink, setPropblemLink] = useState<string>('');

  const addProblem = async () => {
    //unix 시간을 비교하여 시작 > 마감의 경우 예외 처리
    if (!problemName && !problemLink) {
      generateError('문제 이름과 링크를 입력해주세요', '');
      return;
    }

    const requestBody = {
      problems: [
        ...problems,
        {
          name: problemName,
          link: problemLink,
        },
      ],
      scheduleId,
    };

    console.log(requestBody);

    await postRequest(`/api/study/${studyId}/problem`, requestBody);
    getReadmeContents(studyId);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'inherit',
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '0 20px' }}>
          <Typography sx={{ marginRight: '10px' }}>문제 이름</Typography>
          <Input
            type="text"
            value={problemName}
            onChange={(e) => setPropblemName(e.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '0 20px' }}>
          <Typography sx={{ marginRight: '10px' }}>링크</Typography>
          <Input
            type="text"
            value={problemLink}
            style={{ width: '300px' }}
            onChange={(e) => setPropblemLink(e.target.value)}
          />
        </Box>
      </Box>
      <Button onClick={addProblem}>추가</Button>
    </Box>
  );
}

type SellBtnProps = {
  path: string | null;
  problem: Problem;
  memberName: string;
  studyId: number;
};
function SellBtn({ path, problem, memberName, studyId }: SellBtnProps) {
  const navigate = useNavigate();

  const submitCode = () => {
    const problemId = problem.id;
    const fileName = `${problem.name}/${problem.name}_${memberName}.txt`;
    navigate('/code-submit', { state: { problemId, fileName, studyId } });
  };
  return (
    <>
      {path ? (
        <Button>코드 보기</Button>
      ) : (
        <Button sx={omisstionBtnStyle} onClick={submitCode}>
          코드 제출
        </Button>
      )}
    </>
  );
}

const tableStyle = {
  marginTop: '10px',
};

const tableHeaderStyle = {
  height: '40px',
  backgroundColor: subColor,
};

const tableBodyStyle = {
  'height': '40px',
  '&:nth-of-type(even)': {
    backgroundColor: 'rgba(224, 212, 194, 0.3)',
  },
};

const sellStyle = {
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

const Input = styled.input`
  all: unset;
  width: 200px;
  font-size: 14px;
  font-weight: 400;
  padding: 0 5px;
  box-sizing: border-box;
  border-bottom: 1px solid ${subColor};
  background-color: ${whiteColor};
`;

const A = styled.a`
  all: unset;
  cursor: pointer;
`;
