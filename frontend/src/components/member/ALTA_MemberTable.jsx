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
    email: 'qw1@gmail.com',
    join_date: '-',
    state: '초대 대기',
    score: '270',
  };
  const member_data = new Array(8).fill(test);

  const columns = [
    { id: 'username', label: '닉네임', minWidth: 50 },
    { id: 'email', label: '이메일', minWidth: 100 },
    { id: 'join_date', label: '가입일', minWidth: 70 },
    { id: 'score', label: '점수', minWidth: 50 },
  ];

  return (
    <TableContainer sx={[tableStyle, scrollStyle]}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                style={{
                  minWidth: column.minWidth,
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {member_data.map((member, index) => {
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
  );
}

const tableStyle = {
  maxHeight: 300,
};
