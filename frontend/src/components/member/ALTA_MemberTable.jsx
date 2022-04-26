import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';

import scrollStyle from '../../modules/scrollStyle';

import ALTA_MemberTableBody from './ALTA_MemberTableBody';

export default function ALTA_MemberTable() {
  const test = {
    username: 'jyj',
    email: 'qweqweqweqweqweqweqweqweqweqwe@gmail.com',
    join_date: '-',
    state: '초대 대기',
    score: '270',
  };
  const members = new Array(5).fill(test);

  members.push({
    username: 'jyj',
    email: 'qwqqqqq1@gmail.com',
    join_date: '2022-04-19',
    state: '초대',
    score: '300',
  });

  const study_code = 'esfsad';
  // const study_code = null;

  // gmail 은 도메인 제외 최대 30자 제한 + 기본적으론 도메인 제외 최대 64자
  const columns = [
    { id: 'username', label: '닉네임', width: 30 },
    { id: 'email', label: '이메일', width: 150 },
    { id: 'join_date', label: '가입일', width: 30 },
    { id: 'score', label: '점수', width: 15 },
  ];

  // 스터디 그룹장이면 강퇴 버튼 출력
  if (study_code) {
    columns.push({ id: 'out', label: '강퇴', width: 30 });
  }

  return (
    <TableContainer sx={scrollStyle}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                style={{
                  width: column.width,
                  maxWidth: column.width,
                  padding: '10px 20px 10px 20px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  borderTop: '1px solid #6d9886',
                  borderBottom: '1px solid #6d9886',
                }}
                align="left"
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
      <TableContainer sx={[tableStyle, scrollStyle]}>
        <Table style={{ tableLayout: 'fixed' }}>
          {members.map((member, index) => {
            return (
              <ALTA_MemberTableBody
                key={index}
                member={member}
                columns={columns}
              />
            );
          })}
        </Table>
      </TableContainer>
    </TableContainer>
  );
}

const tableStyle = {
  maxHeight: '38vh',
};
