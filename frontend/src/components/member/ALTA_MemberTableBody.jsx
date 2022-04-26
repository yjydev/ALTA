import { TableBody, TableRow, TableCell } from '@mui/material';

export default function ALTA_MemberTableBody({ member, columns }) {
  return (
    <TableBody sx={bodyStyle}>
      <TableRow hover>
        {columns.map((column) => (
          <TableCell key={column.id}>{member[column.id]}</TableCell>
        ))}
      </TableRow>
    </TableBody>
  );
}

const bodyStyle = {
  // '&:nth-child(even)': {
  //   backgroundColor: '#f2f2f2',
  // },
};
