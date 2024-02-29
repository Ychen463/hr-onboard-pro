/* eslint-disable react/prop-types */
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)({
  // Font of label
  '& .MuiInputLabel-root': {
    fontSize: '1.5rem',
    color: 'rgba(0, 0, 0, 0.54)', // Custom color for the unfocused label
  },
  /* Apply red color to the asterisk */
  ' & .MuiInputLabel-asterisk': {
    color: 'rgba(255, 0, 0)',
  },
  // postion of label
  '& .MuiInputLabel-root.MuiInputLabel-formControl': {
    transform: 'translate(3px, -42px) scale(1)',
    marginBottom: '-20px',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'rgba(0, 0, 0, 0.54)', // default label color
  },
  // When the label shrinks (after the input is clicked), ensure it stays above the TextField
  '& .MuiInputLabel-shrink': {
    transform: 'translate(12px, -18px) scale(0.75)',
  },
  // Adjust padding if needed to make room for the label
  '& .MuiOutlinedInput-root': {
    paddingTop: '12px',
  },
  // Increase the notch size if needed
  '& .MuiOutlinedInput-notchedOutline': {
    '& legend': {
      width: '0.01px', // Reduce width of the legend to make the notch almost invisible
    },
  },
  '& .MuiInputBase-input': {
    fontSize: '1.35rem', // input font size
    paddingTop: '0px', // input content padding
    paddingBottom: '15px',
  },
  // making the input box taking whole space
  width: '90%',

  // Aligning the dropdown selected value align to left
  '& .MuiSelect-select': {
    textAlign: 'left',
  },
});

function InputUnit({
  // eslint-disable-next-line react/prop-types
  name, value, label, type, placeholder, required, disabled, options, onChange,
}) {
  const ifDropdown = type === 'dropdown';
  // const ifUploadFile = type === 'uploadfile';

  if (ifDropdown) {
    return (
      <CustomTextField
        select
        name={name}
        label={label}
        required={required}
        placeholder={placeholder}
        defaultValue={value}
        fullWidth
        disabled={disabled}
        onChange={onChange}
      >
        {options.map((option) => <MenuItem value={option} key={option}>{option}</MenuItem>)}
      </CustomTextField>
    );
  }

  return (
    <CustomTextField
      name={name}
      label={label}
      required={required}
      placeholder={placeholder}
      variant="outlined"
      defaultValue={value}
      InputLabelProps={{ shrink: true }}
      type={type}
      disabled={disabled}
      onChange={onChange}

    />

  );
}

export default InputUnit;
