import { useContext } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';

import scrollStyle from '../../modules/scrollStyle';

import { Member, Column } from '../../types/MemberType';
import { MemberStore } from '../../context/MemberContext';

import ALTA_MemberTableBody from './ALTA_MemberTableBody';

export default function ALTA_MemberTable({ members }: { members: Member[] }) {
  const { columns } = useContext(MemberStore);

  return (
    <TableContainer sx={scrollStyle}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column: Column) => (
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
          {members.map((member: Member, index: number) => {
            return <ALTA_MemberTableBody key={index} member={member} />;
          })}
        </Table>
      </TableContainer>
    </TableContainer>
  );
}

const tableStyle = {
  maxHeight: '38vh',
};
