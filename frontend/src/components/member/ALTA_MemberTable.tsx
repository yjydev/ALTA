import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';

import scrollStyle from '../../modules/scrollStyle';

import { Member } from '../../types/StudyType';

import ALTA_MemberTableBody from './ALTA_MemberTableBody';

export default function ALTA_MemberTable({
  members,
  studyCode,
}: {
  members: Member[];
  studyCode: string;
}) {
  // gmail 은 도메인 제외 최대 30자 제한 + 기본적으론 도메인 제외 최대 64자
  const columns = [
    { id: 'nickname', label: '닉네임', width: 30 },
    { id: 'email', label: '이메일', width: 150 },
    { id: 'registrationDate', label: '가입일', width: 40 },
    // { id: 'score', label: '점수', width: 15 },
  ];

  // 스터디 그룹장이면 강퇴 버튼, 상태 출력
  if (studyCode !== null) {
    // columns.push({ id: 'out', label: '강퇴', width: 30 });
    columns.push({ id: 'state', label: '상태', width: 15 });
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
                  borderBottom: '1px solid #6d9886',
                }}
                align="left"
                variant="head"
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
