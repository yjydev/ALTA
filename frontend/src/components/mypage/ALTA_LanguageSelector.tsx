import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { languages } from '../../modules/languageSources';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
  setLanguageList: any;
  languageList: string[] | null;
};

export default function ALTA_LanguageSelector({ setLanguageList, languageList }: Props) {
  return (
    <div>
      <FormControl sx={{ width: '93.5%' }} size="small">
        <InputLabel id="label">사용 언어</InputLabel>
        <Select
          labelId="label"
          id="demo-multiple-checkbox"
          multiple
          value={languageList === null ? [] : languageList}
          onChange={(e) => setLanguageList(e.target.value)}
          input={<OutlinedInput label="사용 언어" />}
          renderValue={(selected) => selected && selected.join(', ')}
          MenuProps={MenuProps}
        >
          {languages.map((language) => (
            <MenuItem key={language} value={language}>
              {languageList && <Checkbox checked={languageList.indexOf(language) > -1} />}
              <ListItemText primary={language} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
