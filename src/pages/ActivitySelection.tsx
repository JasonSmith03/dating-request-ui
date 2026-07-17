import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArcadeImg from "../assets/arcade.jpg";
import BowlingImg from "../assets/bowling.jpg";
import ComedyImg from "../assets/comedy.jpg";
import MinigolfImg from "../assets/minigolf.jpg";
import PaintImg from "../assets/paintnight.jpg";
import PicnicImg from "../assets/picnic.jpg";
import RundrinkImg from "../assets/rundrink.jpg";
import SportsImg from "../assets/sportsgame.jpg";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button as MuiButton,
  Stack,
} from "@mui/material";

import ActivityCard from "../components/ActivityCard";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  DatePicker,
  DateInput,
  type DateValue,
  DateSegment,
  Calendar,
  CalendarGrid,
  CalendarCell,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarGridBody,
  Dialog,
  Group,
  Popover,
  Heading,
  Button,
} from "react-aria-components";

import {
  CalendarDate,
  getLocalTimeZone,
  today,
  getDayOfWeek
} from "@internationalized/date";
import { saveDateRequest } from "../services/supabase";

const activities = [
  { title: "Watch a Game", image: SportsImg },
  { title: "Run & Drinks", image: RundrinkImg },
  { title: "Comedy", image: ComedyImg },
  { title: "Mini Golf", image: MinigolfImg },
  { title: "Arcade", image: ArcadeImg },
  { title: "Bowling", image: BowlingImg },
  { title: "Picnic", image: PicnicImg },
  { title: "Paint Night", image: PaintImg },
];

  const isDateUnavailable = (date: DateValue) => {
    const day = getDayOfWeek(date, "en-US"); // 0 = Sun, 1 = Mon, ... 4 = Thu, 5 = Fri, 6 = Sat
    return day < 3; // block Sun, Mon, Tue, Wed
  };


const availableTimes = [
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
  "7:00 PM", "7:30 PM", "8:00 PM",
];

const MotionHeart = motion(FavoriteIcon);

export default function ActivitySelection() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const name = (location.state as { name?: string } | null)?.name ?? "";

  const handleSubmit = async () => {
    if (!selectedActivity || !selectedDate || !selectedTime) {
      return;
    }

    const formatTimeForDb = (time: string) => {
      const [timePart, period] = time.split(' ');
      const [hoursRaw, minutesRaw] = timePart.split(':');
      let hours = Number(hoursRaw);
      const minutes = Number(minutesRaw);

      if (period === 'PM' && hours < 12) {
        hours += 12;
      }

      if (period === 'AM' && hours === 12) {
        hours = 0;
      }

      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
    };
    console.log("name: " + name.trim(), "selectedActivity: " + selectedActivity, "selectedDate: " + selectedDate.toString(), "selectedTime: " + formatTimeForDb(selectedTime));
    try {
      setIsSubmitting(true);
      await saveDateRequest({
        name: name.trim(),
        activity: selectedActivity,
        date: selectedDate.toString(),
        time: formatTimeForDb(selectedTime),
      });

      

      navigate('/thank-you');
    } catch (error) {
      console.error('Failed to save date request:', error);
      alert('Could not save your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
    sx={{
        minHeight: "100vh",
        background:
        "linear-gradient(135deg,#ffe6f2 0%,#ffd6ec 50%,#fff5fb 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
        position: "relative",
        overflow: "hidden",
    }}
    >
    <MotionHeart
        sx={{
        position: "absolute",
        fontSize: 280,
        color: "#ff4d88",
        opacity: 0.08,
        }}
        animate={{
        y: [-20, 20, -20],
        scale: [1, 1.08, 1],
        rotate: [-5, 5, -5],
        }}
        transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        }}
    />

        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            >
            <Container
                maxWidth="lg"
                sx={{
                py: 5,
                borderRadius: 5,
                bgcolor: "rgba(255,255,255,0.93)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 20px 60px rgba(0,0,0,.18)",
                }}
            >
          <Typography
                component="h3"
                variant="h3"
                align="center"
                sx={{ fontWeight: "bold" }}
                gutterBottom
            >
                Plan Our Date ❤️
            </Typography>

            <Typography
                align="center"
                color="text.secondary"
                sx={{ mb: 5 }}
            >
                Now comes the fun part...
                Pick something we'd both enjoy ✨
            </Typography>

            <Grid container spacing={3}>
                {activities.map((activity) => (
                <Grid key={activity.title} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Box
                    onClick={() => setSelectedActivity(activity.title)}
                    sx={{
                        cursor: "pointer",
                        border: selectedActivity === activity.title
                        ? "3px solid #e53dcc"
                        : "3px solid transparent",
                        borderRadius: 2,
                        transition: "all 0.2s ease",
                        "&:hover": { transform: "scale(1.02)" },
                    }}
                    >
                    <ActivityCard image={activity.image} title={activity.title} />
                    </Box>
                </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <Typography variant="h5">Select a Date 📅</Typography>

                <DatePicker
                aria-label="Select Date"
                value={selectedDate ?? undefined}
                onChange={(value) => setSelectedDate(value ?? null)}
                minValue={today(getLocalTimeZone())}
                isDateUnavailable={isDateUnavailable}
                >
                <Group
                    style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "12px",
                    cursor: "default",
                    }}
                >
                    <DateInput style={{ display: "flex", gap: "2px" }}>
                    {(segment) => (
                        <DateSegment
                        segment={segment}
                        style={{
                            padding: "0 2px",
                            borderRadius: "4px",
                            outline: "none",
                        }}
                        />
                    )}
                    </DateInput>

                    {/* react-aria Button with slot="calendar-button" opens the picker */}
                    <Button
                    slot="calendar-button"
                    style={{
                        background: "white",
                        borderRadius: "14px",
                        padding: "14px",
                        boxShadow: "0 5px 18px rgba(255,77,136,.12)",
                    }}
                    
                    >
                    📅
                    </Button>
                </Group>

                <Popover
                    style={{
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    padding: "16px",
                    zIndex: 1300,
                    }}
                >
                    <Dialog style={{ outline: "none" }}>
                    <Calendar>
                        <header
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "1rem",
                        }}
                        >
                        <Button
                            slot="previous"
                            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}
                        >
                            ◀
                        </Button>

                        <Heading style={{ margin: 0, fontSize: "16px", fontWeight: 600 }} />

                        <Button
                            slot="next"
                            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}
                        >
                            ▶
                        </Button>
                        </header>

                        <CalendarGrid>
                        <CalendarGridHeader>
                            {(day) => (
                            <CalendarHeaderCell
                                style={{ fontSize: "12px", color: "#888", padding: "4px 8px" }}
                            >
                                {day}
                            </CalendarHeaderCell>
                            )}
                        </CalendarGridHeader>

                        <CalendarGridBody>
                            {(date) => (
                            <CalendarCell
                                date={date}
                                style={({ isSelected, isDisabled, isFocused }) => ({
                                padding: "6px 8px",
                                borderRadius: "6px",
                                textAlign: "center",
                                cursor: isDisabled ? "default" : "pointer",
                                background: isSelected ? "#e53dcc" : "none",
                                color: isSelected ? "#fff" : isDisabled || isDateUnavailable(date) ? "#ccc" : "inherit",
                                outline: isFocused ? "2px solid #e53dcc" : "none",
                                })}
                            />
                            )}
                        </CalendarGridBody>
                        </CalendarGrid>
                    </Calendar>
                    </Dialog>
                </Popover>
                </DatePicker>

                <Typography variant="h5">Select a Time ⏰</Typography>

                <Stack
                direction="row"
                spacing={2}
                useFlexGap
                sx={{ flexWrap: "wrap", justifyContent: "center" }}
                >
                {availableTimes.map((time) => (
                    <MuiButton
                    key={time}
                    variant={selectedTime === time ? "contained" : "outlined"}
                    onClick={() => setSelectedTime(time)}
                    sx={{
                        borderRadius: "25px",
                        px: 3,

                        ...(selectedTime === time && {
                            bgcolor: "#ff4d88",
                            color: "white",
                        }),

                        "&:hover": {
                            bgcolor: "#ffd6ec",
                        },
                    }}
                    >
                    {time}
                    </MuiButton>
                ))}
                </Stack>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                >
                    <MuiButton
                        size="large"
                        sx={{
                            mt: 4,
                            px: 6,
                            py: 2,

                            borderRadius: "40px",

                            fontSize: "1.1rem",
                            fontWeight: "bold",

                            background:
                                "linear-gradient(90deg,#ff4d88,#ff7ab6)",

                            boxShadow:
                                "0 10px 25px rgba(255,77,136,.35)",

                            "&:hover": {
                                background:
                                    "linear-gradient(90deg,#ff3d7c,#ff69a8)",
                            },
                        }}
                        onClick={handleSubmit}
                    >
                        {isSubmitting ? "Saving..." : "Confirm Date ❤️"}
                    </MuiButton>
                </motion.div>
            </Box>
        </Container>
        </motion.div>
    </Box>
  );
}