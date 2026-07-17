import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import RunAwayButton from "../components/RunAwayButton";

const MotionHeart = motion(FavoriteIcon);

const Home: React.FC = () => {
  const buttonAreaRef = useRef<HTMLDivElement | null>(null);
  const yesBtnRef = useRef<HTMLButtonElement | null>(null);

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const handleNavigation = () => {
    if (!name.trim()) return;

    navigate("/activity-selection", {
      state: { name: name.trim() },
    });
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
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Animated Background Heart */}
      <MotionHeart
        sx={{
          position: "absolute",
          fontSize: 320,
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
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 40,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
      >
        <Box
          sx={{
            width: 650,
            maxWidth: "92vw",

            p: 6,

            borderRadius: 5,

            background: "rgba(255,255,255,.92)",
            backdropFilter: "blur(14px)",

            boxShadow:
              "0 20px 60px rgba(0,0,0,.18)",

            textAlign: "center",
          }}
        >
          <MotionHeart
            sx={{
              color: "#ff4d88",
              fontSize: 60,
              mb: 2,
            }}
            animate={{
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
            }}
          />

          <Typography
            variant="h3"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            Hi there ❤️
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              mb: 4,
            }}
          >
            I have something I'd like to ask you...
          </Typography>

          <TextField
            label="Your Name"
            variant="outlined"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            sx={{
              width: {
                xs: "100%",
                sm: 420,
              },

              mb: 5,

              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                backgroundColor: "white",
              },
            }}
          />
        <Typography variant="h5" sx={{ mb: 4 }}>
        {name.trim()
            ? `${name}, will you go on a date with me? 💕`
            : "Will you go on a date with me? 💕"}
        </Typography>

          <Box
            ref={buttonAreaRef}
            sx={{
              position: "relative",
              height: 170,

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,

              overflow: "hidden",
            }}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.96,
              }}
            >
              <Button
                ref={yesBtnRef}
                onClick={handleNavigation}
                disabled={!name.trim()}
                sx={{
                  minWidth: 90,
                  height: 48,

                  px: 4,

                  borderRadius: "30px",

                  textTransform: "none",

                  fontSize: "1rem",
                  fontWeight: "bold",

                  color: "white",

                  background:
                    "linear-gradient(90deg,#ff4d88,#ff7ab6)",

                  boxShadow:
                    "0 8px 20px rgba(255,77,136,.35)",

                  "&:hover": {
                    background:
                      "linear-gradient(90deg,#ff3d7c,#ff69a8)",
                  },

                  "&.Mui-disabled": {
                    color: "#fff",
                    opacity: 0.6,
                  },
                }}
              >
                YES ❤️
              </Button>
            </motion.div>

            <RunAwayButton
              parentRef={buttonAreaRef}
              yesBtnRef={yesBtnRef}
            />
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Home;