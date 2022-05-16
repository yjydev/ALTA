import { useContext } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';

import { Grid } from '@mui/material';
import {
  DataGridPro,
  GridColumns,
  GridRowsProp,
  DataGridProProps,
  GridValueGetterParams,
  GridRowParams,
} from '@mui/x-data-grid-pro';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import FolderOpenTwoToneIcon from '@mui/icons-material/FolderOpenTwoTone';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';

import { generateError } from '../../modules/generateAlert';
import { CodeStore } from '../../context/CodeContext';
import { CodeTree } from '../../types';

type Props = {
  studyId: string | undefined;
};

export default function ALTA_CodeTree({ studyId }: Props) {
  const navigate: NavigateFunction = useNavigate();
  const { codeTree } = useContext(CodeStore);

  function MinusSquare(props: SvgIconProps): JSX.Element {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
      </SvgIcon>
    );
  }

  function PlusSquare(props: SvgIconProps): JSX.Element {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
      </SvgIcon>
    );
  }

  // codeId 가 0이면 폴더, 0이 아니면 파일이므로 분기처리해서 각각 아이콘 첨가
  function handleIcon(params: GridValueGetterParams): JSX.Element {
    if (params.row.codeId === 0) {
      return (
        <>
          <span style={{ position: 'absolute' }}>
            <FolderOpenTwoToneIcon fontSize="small" color="primary" />
          </span>
          <span style={{ marginLeft: 30 }}>{`${params.rowNode.groupingKey}`}</span>
        </>
      );
    } else {
      return (
        <>
          <span style={{ position: 'absolute' }}>
            <InsertDriveFileRoundedIcon fontSize="small" color="primary" />
          </span>
          <span style={{ marginLeft: 30, cursor: 'pointer' }}>{`${params.rowNode.groupingKey}`}</span>
        </>
      );
    }
  }

  const rows: GridRowsProp = codeTree;

  const columns: GridColumns = [
    {
      field: '__tree_data_group__',
      headerName: 'id',
      width: 320,
    },
  ];

  const getTreeDataPath: DataGridProProps['getTreeDataPath'] = (row): Array<string> => row.path;

  const handleMove = async (row: CodeTree): Promise<void> => {
    if (row.codeId !== 0) {
      const codeId: number = row.codeId;
      const problem: string = row.path[1];
      try {
        navigate(`/study/${studyId}/${problem}/code/${codeId}`);
      } catch (err: any) {
        generateError('코드 이동에 실패하였습니다', `${err.response.message}`);
      }
    }
  };

  return (
    <Grid item sx={codeTreeStyle}>
      <DataGridPro
        hideFooter
        treeData
        rows={rows}
        columns={columns}
        getTreeDataPath={getTreeDataPath}
        groupingColDef={{
          valueGetter: handleIcon,
        }}
        components={{
          TreeDataCollapseIcon: MinusSquare,
          TreeDataExpandIcon: PlusSquare,
        }}
        onRowClick={(e: GridRowParams): Promise<void> => handleMove(e.row)}
        headerHeight={0}
      />
    </Grid>
  );
}

const codeTreeStyle = {
  height: '85vh',
  width: '100%',
  minWidth: '100%',
  maxWidth: '100%',
};
