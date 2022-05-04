import {
  LocalizationProvider,
  PickersDay,
  pickersDayClasses,
  StaticDatePicker,
} from "@mui/lab";
import brLocale from "date-fns/locale/pt-BR";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Chip,
  useTheme,
  ButtonGroup,
  Button,
  useMediaQuery,
} from "@mui/material";
import { Temporal } from "@js-temporal/polyfill";
import { motion } from "framer-motion";
import { useSchedule } from "../contexts/ScheduleContext";
import DisplayReservationsPerDayAndLab from "./DisplayReservationsPerDayAndLab";

const variants = {
  initial: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function ViewReservations() {
  const { schedules } = useSchedule();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [selectedTab, setSelectedTab] = useState(1);
  const theme = useTheme();

  const smallScreen = (useMediaQuery(theme.breakpoints.down('sm')));

  const isNotAvailable = (date) => {
    if (date.getDay() === 0) return true;
    return false;
  };

  const getFormattedDate = (date) => {
    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
  };

  const getLab = (selected) => {
    const lab = `LAB-${selected <= 4 ? 'G' + selected : 'F' + (selected - 4)}`
    return lab;
  }

  useEffect(() => {
    const formattedDate = Temporal.PlainDate.from({
      year: selectedDate.getFullYear(),
      month: selectedDate.getMonth() + 1,
      day: selectedDate.getDate(),
    }).toString();

    setReservations(
      schedules.filter((schedule) => schedule.date === formattedDate)
    );
  }, [selectedDate]);


  const AnimatedChip = motion(Chip);

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    return (
      <PickersDay
        {...pickersDayProps}
        sx={{
          [`&&.${pickersDayClasses.selected}`]: {
            backgroundColor: "#29b6f6",
          },
          [`&&.${pickersDayClasses.today}`]: {
            borderColor: "#29b6f6",
          },
        }}
      />
    );
  };

  const handleSelectedTab = (newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Box mb={4}> </Box>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
        <Box minHeight={300} sx={{
          width: '100%',
          maxWidth: '500px'
        }}>
          <StaticDatePicker
            orientation="portrait"
            openTo="day"
            value={selectedDate}
            showDaysOutsideCurrentMonth
            displayStaticWrapperAs="desktop"
            renderDay={renderWeekPickerDay}
            shouldDisableDate={isNotAvailable}
            toolbarTitle="Selecione a data"
            onChange={(newValue) => {
              setSelectedDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Box>
      </LocalizationProvider>
      <Box
        sx={{
          display: "flex",
          [theme.breakpoints.down("sm")]: { flexDirection: "column-reverse" },
          [theme.breakpoints.up("sm")]: {
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
          },
        }}
      >
        <Typography variant={smallScreen ? "h5" : "h4"} component="h4">
          Reservas do dia
        </Typography>
        <AnimatedChip
          variants={variants}
          initial={"initial"}
          animate={"visible"}
          sx={{
            width: "max-content",
            [theme.breakpoints.down("sm")]: { alignSelf: "flex-end" },
            backgroundColor: "#29b6f6",
            color: "white",
          }}
          label={getFormattedDate(
            Temporal.PlainDate.from({
              year: selectedDate.getFullYear(),
              month: selectedDate.getMonth() + 1,
              day: selectedDate.getDate(),
            }).toString()
          )}
        />
      </Box>
      <Box my={2} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            size="small"
            onClick={() => handleSelectedTab(1)}
            // color="success"
            sx={{
              backgroundColor: selectedTab === 1 ? "#039be5" : "#81d4fa",
              "&:focus": { backgroundColor: "#039be5" },
              "&:hover": { backgroundColor: "#0179c3" },
              width: '69px'
            }}
          >
            Lab g1
          </Button>
          <Button
            size="small"
            onClick={() => handleSelectedTab(2)}
            // color="success"
            sx={{
              backgroundColor: selectedTab === 2 ? "#039be5" : "#81d4fa",
              "&:focus": { backgroundColor: "#039be5" },
              "&:hover": { backgroundColor: "#0179c3" },
              width: '69px'
            }}
          >
            Lab g2
          </Button>
          <Button
            size="small"
            onClick={() => handleSelectedTab(3)}
            // color="success"
            sx={{
              backgroundColor: selectedTab === 3 ? "#039be5" : "#81d4fa",
              "&:focus": { backgroundColor: "#039be5" },
              "&:hover": { backgroundColor: "#0179c3" },
              width: '69px'
            }}
          >
            Lab g3
          </Button>
          <Button
            size="small"
            onClick={() => handleSelectedTab(4)}
            // color="success"
            sx={{
              backgroundColor: selectedTab === 4 ? "#039be5" : "#81d4fa",
              "&:focus": { backgroundColor: "#039be5" },
              "&:hover": { backgroundColor: "#0179c3" },
              width: '69px'
            }}
          >
            Lab g4
          </Button>
        </ButtonGroup>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            size="small"
            onClick={() => handleSelectedTab(5)}
            // color="success"
            sx={{
              backgroundColor: selectedTab === 5 ? "#039be5" : "#81d4fa",
              "&:focus": { backgroundColor: "#039be5" },
              "&:hover": { backgroundColor: "#0179c3" },
              width: '69px'
            }}
          >
            Lab f1
          </Button>
          <Button
            size="small"
            onClick={() => handleSelectedTab(6)}
            // color="success"
            sx={{
              backgroundColor: selectedTab === 6 ? "#039be5" : "#81d4fa",
              "&:focus": { backgroundColor: "#039be5" },
              "&:hover": { backgroundColor: "#0179c3" },
              width: '69px'
            }}
          >
            Lab f2
          </Button>
          <Button
            size="small"
            onClick={() => handleSelectedTab(7)}
            // color="success"
            sx={{
              backgroundColor: selectedTab === 7 ? "#039be5" : "#81d4fa",
              "&:focus": { backgroundColor: "#039be5" },
              "&:hover": { backgroundColor: "#0179c3" },
              width: '69px'
            }}
          >
            Lab f3
          </Button>
          <Button
            size="small"
            onClick={() => handleSelectedTab(8)}
            // color="success"
            sx={{
              backgroundColor: selectedTab === 8 ? "#039be5" : "#81d4fa",
              "&:focus": { backgroundColor: "#039be5" },
              "&:hover": { backgroundColor: "#0179c3" },
              width: '69px'
            }}
          >
            Lab f4
          </Button>
        </ButtonGroup>
      </Box>
      <DisplayReservationsPerDayAndLab
        reservations={reservations}
        date={Temporal.PlainDate.from({
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        }).toString()}
        lab={getLab(selectedTab)}
      />
    </>
  );
}
