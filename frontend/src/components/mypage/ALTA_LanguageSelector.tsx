import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { languages } from '../../modules/languageSources';

export default function ALTA_LanguageSelector({
  languageList,
}: {
  languageList: string[] | null;
}) {
  return (
    <Stack spacing={3} sx={{ width: 470 }}>
      <Autocomplete
        multiple
        color="primary"
        defaultValue={makeDefaultList(languageList)}
        options={languages}
        getOptionLabel={(option) => option.language}
        renderInput={(params) => <TextField {...params} variant="standard" />}
      />
    </Stack>
  );
}

type OptionItem = {
  language: string;
  img: string;
};

function makeDefaultList(languageList: string[] | null) {
  let result;
  if (languageList) {
    result = languages.filter((language: OptionItem) =>
      languageList.includes(language.language),
    );
  }

  return result;
}
