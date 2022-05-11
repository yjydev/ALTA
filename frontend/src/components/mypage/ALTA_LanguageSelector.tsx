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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default function ALTA_LanguageSelector({
  setLanguageList,
  languageList,
}: {
  setLanguageList: any;
  languageList: string[] | null;
}) {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ width: '93.5%' }} size="small">
        <InputLabel id="label">사용 언어</InputLabel>
        <Select
          labelId="label"
          id="demo-multiple-checkbox"
          multiple
          value={languageList}
          onChange={(e) => setLanguageList(e.target.value)}
          input={<OutlinedInput label="사용 언어" />}
          renderValue={(selected) => selected && selected.join(', ')}
          MenuProps={MenuProps}
        >
          {languages.map((language) => (
            <MenuItem key={language} value={language}>
              {languageList && (
                <Checkbox checked={languageList.indexOf(language) > -1} />
              )}
              <ListItemText primary={language} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
