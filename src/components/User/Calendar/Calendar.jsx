import { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const Calendar = ({ customStyleMobile, customStyleDesktop, onHandleDate, onBirthday }) => {
  const [value, setValue] = useState(dayjs(onBirthday, 'DD.MM.YYYY'));
  const [isWidthCalendar, setIsWidthCalendar] = useState(false);

  useEffect(() => {
    const widthCalendar = document.querySelector('body').scrollWidth;
    if (widthCalendar > 767) {
      setIsWidthCalendar(true);
    }
  }, [setIsWidthCalendar]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {!isWidthCalendar ? (
        <MobileDatePicker
          value={value}
          inputFormat="DD.MM.YYYY"
          maxDate={dayjs(Date.now())}
          onChange={(newValue) => {
            setValue(newValue);
            onHandleDate(JSON.stringify(newValue.format('DD.MM.YYYY')));
          }}
          renderInput={({ inputRef, inputProps, InputProps, params }) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <input {...params} type="data" className={customStyleMobile} ref={inputRef} {...inputProps} />
              {InputProps?.endAdornment}
            </Box>
          )}
        />
      ) : (
        <DesktopDatePicker
          value={value}
          minDate={dayjs('1922-01-01')}
          maxDate={dayjs(Date.now())}
          inputFormat="DD.MM.YYYY"
          onChange={(newValue) => {
            setValue(newValue);
            onHandleDate(JSON.stringify(newValue.format('DD.MM.YYYY')));
          }}
          renderInput={({ inputRef, inputProps, InputProps, params }) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <input {...params} type="data" className={customStyleDesktop} ref={inputRef} {...inputProps} />
              {InputProps?.endAdornment}
            </Box>
          )}
        />
      )}
    </LocalizationProvider>
  );
};
export default Calendar;
