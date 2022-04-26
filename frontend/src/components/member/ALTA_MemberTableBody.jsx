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
              maxWidth: column.width,
              padding: '10px 20px 10px 20px',
              fontSize: '12px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            align="left"
          >
            {column.id === 'out' ? (
              <Button sx={outBtn} variant="contained">
                강퇴
              </Button>
            ) : (
              member[column.id]
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
  backgroundColor: '#ffffff',
};

const outBtn = {
  'padding': '0px',
  'backgroundColor': 'error.main',
  'minWidth': '2.5rem',
  'maxWidth': '2.5rem',
  'color': '#000000',
  'fontSize': '12px',
  '&:hover': {
    backgroundColor: '#A28080',
  },
};
