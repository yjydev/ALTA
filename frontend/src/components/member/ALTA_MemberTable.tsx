import { useContext } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';

import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { checkLogin } from '../../modules/LoginTokenChecker';
import { generateConfirm, generateError } from '../../modules/generateAlert';
import scrollStyle from '../../modules/scrollStyle';
import { deleteInvitationApi } from '../../api/apis';
import { Member, Column } from '../../types';
import { MemberStore } from '../../context/MemberContext';

type Props = {
  studyId: number;
};

export default function ALTA_MemberTable({ studyId }: Props) {
  const navigate: NavigateFunction = useNavigate();
  const { columns, members, setIsRefresh } = useContext(MemberStore);

  const handleDelInvite = async (nickname: string, memberId: string): Promise<void> => {
    if (!(await checkLogin()).status) navigate('/');
    generateConfirm(
      '정말 초대를 취소하시겠습니까?',
      '',
      '초대 취소 완료',
      `${nickname} 님의 초대가 취소되었습니다.`,
      async (): Promise<boolean> => deleteInvite(memberId),
    );
  };

  const deleteInvite = async (memberId: string): Promise<boolean> => {
    if (studyId) {
      try {
        await deleteInvitationApi(studyId, parseInt(memberId));
        setIsRefresh(true);
        return true;
      } catch (err: any) {
        generateError('초대 취소에 실패하였습니다', `${err.response.data.message}`);
        return false;
      }
    } else return false;
  };

  return (
    <TableContainer sx={scrollStyle}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map(
              (column: Column): JSX.Element => (
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
              ),
            )}
          </TableRow>
        </TableHead>
      </Table>
      <TableContainer sx={[tableStyle, scrollStyle]}>
        <Table style={{ tableLayout: 'fixed' }}>
          {members.map((member: Member, index: number): JSX.Element => {
            return (
              <TableBody sx={bodyStyle} key={index}>
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
                        <Button
                          endIcon={<CloseIcon />}
                          sx={inviteClearBtnStyle}
                          onClick={(): Promise<void> => handleDelInvite(member.nickname, member.id)}
                        >
                          <Typography sx={inviteTextStyle}>초대대기</Typography>
                        </Button>
                      ) : (
                        member[column.id]
                      )}
                      {/* {column.id === 'out' ? (
                          <Button sx={outBtnStyle} variant="contained">
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
          })}
        </Table>
      </TableContainer>
    </TableContainer>
  );
}

const tableStyle = {
  maxHeight: '38vh',
};

const bodyStyle = {
  // '&:nth-child(even)': {
  //   backgroundColor: '#f2f2f2',
  // },
  backgroundColor: '#ffffff',
};

const outBtnStyle = {
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

const inviteClearBtnStyle = {
  padding: '0px',
};

const inviteTextStyle = {
  color: '#212121',
  fontSize: '12px',
};
