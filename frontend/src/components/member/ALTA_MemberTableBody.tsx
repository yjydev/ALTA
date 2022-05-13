import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TableBody, TableRow, TableCell, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { checkLogin } from '../../modules/LoginTokenChecker';
import { Member } from '../../types';
import { MemberStore } from '../../context/MemberContext';
import { deleteInvitationApi } from '../../api/apis';
import { generateConfirm, generateError } from '../../modules/generateAlert';

export default function ALTA_MemberTableBody({ member, studyId }: { member: Member; studyId: number }) {
  const navigate = useNavigate();
  const { columns } = useContext(MemberStore);

  const handleDelInvite = async () => {
    if (!(await checkLogin()).status) navigate('/');
    generateConfirm(
      '정말 초대를 취소하시겠습니까?',
      '',
      '초대 취소 완료',
      `${member.nickname} 님의 초대가 취소되었습니다.`,
      async () => deleteInvite(),
    );
  };
  const deleteInvite = async () => {
    try {
      await deleteInvitationApi(studyId, parseInt(member.id));
      navigate(`/study/member`, { state: { studyId } });
    } catch (err: any) {
      console.log(err);
      generateError('초대 취소에 실패하였습니다', `${err.response.data.message}`);
    }
  };
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
            {column.id === 'state' && member['state'] === '초대대기' ? (
              <Button endIcon={<CloseIcon />} sx={inviteClearBtn} onClick={handleDelInvite}>
                <Typography sx={inviteText}>초대대기</Typography>
              </Button>
            ) : (
              member[column.id]
            )}
            {/* {column.id === 'out' ? (
              <Button sx={outBtn} variant="contained">
                강퇴
              </Button>
            ) : (
              member[column.id]
            )} */}
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

const inviteClearBtn = {
  padding: '0px',
};

const inviteText = {
  color: '#212121',
  fontSize: '12px',
};
