import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { languages } from '../../modules/languageSources';
import { useState } from 'react';

export default function ALTA_LanguageSelector({
  setLanguageList,
}: {
  setLanguageList: any;
}) {
  return (
    <Stack spacing={3} sx={{ width: 470 }}>
      <Autocomplete
        multiple
        color="primary"
        options={languages}
        getOptionLabel={(option) => option}
        onChange={(e, value) => setLanguageList(value)}
        renderInput={(params) => <TextField {...params} variant="standard" />}
      />
    </Stack>
  );
}
