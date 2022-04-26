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
    email: 'qwqqqqqqqqwwwwwwwwwwwwwwwqqq1@gmail.com',
    join_date: '-',
    state: '초대 대기',
    score: '270',
  };
  const members = new Array(6).fill(test);

  const columns = [
    { id: 'username', label: '닉네임', width: 30 },
    { id: 'email', label: '이메일', width: 140 },
    { id: 'join_date', label: '가입일', width: 30 },
    { id: 'score', label: '점수', width: 30 },
    { id: 'out', label: '강퇴', width: 30 },
  ];

  return (
    <TableContainer sx={[entireTable, scrollStyle]}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                style={{
                  width: column.width,
                  minWidth: column.minWidth,
                  padding: '10px 0px 10px 10px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
                sx={cellStyle}
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

const entireTable = {
  borderBottom: '1px solid',
  borderColor: '#D9CAB3',
};

const cellStyle = {
  width: '70px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};
