import { TableBody, TableRow, TableCell } from '@mui/material';

export default function ALTA_MemberTableBody({ member, columns }) {
  return (
    <TableBody sx={bodyStyle}>
      <TableRow hover>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            style={{ width: column.width }}
            align="center"
          >
            {member[column.id]}
          </TableCell>
        ))}
      </TableRow>
    </TableBody>
  );
}

const bodyStyle = {
  // '&:nth-child(even)': {
  //   backgroundColor: '#f2f2f2',
  // },
  borderLeft: '1px solid',
  borderColor: '#D9CAB3',
};
