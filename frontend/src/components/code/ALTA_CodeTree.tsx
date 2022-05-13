import { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Icon } from '@mui/material';
import { DataGridPro, GridColumns, GridRowsProp, DataGridProProps, GridValueGetterParams } from '@mui/x-data-grid-pro';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import FolderOpenTwoToneIcon from '@mui/icons-material/FolderOpenTwoTone';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';

import { generateError } from '../../modules/generateAlert';
import { CodeStore } from '../../context/CodeContext';
import { CodeTree } from '../../types';
// import scrollStyle from '../../modules/scrollStyle';

export default function ALTA_CodeTree() {
  const navigate = useNavigate();
  const studyId = JSON.parse(JSON.stringify(useLocation().state)).studyId;
  const { codeTree, getCodeTree } = useContext(CodeStore);

  useEffect(() => {
    (async function () {
      const status = await getCodeTree(studyId);
      if (status === -1) navigate('/');
      else if (status === -2) generateError('폴더 구조를 불러오는데 실패하였습니다', '');
    })();
  }, []);

  function MinusSquare(props: SvgIconProps) {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
      </SvgIcon>
    );
  }

  function PlusSquare(props: SvgIconProps) {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
      </SvgIcon>
    );
  }

  // codeId 가 0이면 폴더, 0이 아니면 파일이므로 분기처리해서 각각 아이콘 첨가
  function handleIcon(params: GridValueGetterParams) {
    if (params.row.codeId === 0) {
      return (
        <>
          <Icon component={FolderOpenTwoToneIcon} sx={{}} />
          <span style={{ lineHeight: '28px' }}>&nbsp;{params.rowNode.groupingKey}</span>
        </>
      );
    } else {
      return (
        <span style={fileStyle}>
          <InsertDriveFileRoundedIcon />
          &nbsp; {params.rowNode.groupingKey}
        </span>
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
  const getTreeDataPath: DataGridProProps['getTreeDataPath'] = (row) => row.path;

  const handleMove = (row: CodeTree) => {
    if (row.codeId !== 0) {
      const codeId = row.codeId;
      navigate('/study/code', { state: { studyId, codeId } });
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
        onRowClick={(e) => handleMove(e.row)}
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

const fileStyle = {
  cursor: 'pointer',
};
