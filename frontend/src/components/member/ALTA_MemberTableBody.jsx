import { TableBody, TableRow, TableCell, Button } from '@mui/material';

export default function ALTA_MemberTableBody({ member, columns }) {
  return (
    <TableBody sx={bodyStyle}>
      <TableRow hover>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            style={{
              width: column.width,
              padding: '10px 0px 10px 10px',
              fontSize: '12px',
            }}
            align="left"
          >
            {column.id === 'out' ? (
              <Button sx={outBtn} variant="contained">
                강퇴
              </Button>
            ) : (
              <span sx={cellStyle}>{member[column.id]}</span>
            )}
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

const cellStyle = {
  maxWidth: 10,
  textOverflow: 'ellipsis',
};

const outBtn = {
  padding: '0px',
  backgroundColor: 'error.main',
  color: '#000000',
  fontSize: '12px',
};
