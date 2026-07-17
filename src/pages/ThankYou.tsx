import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from 'react-router-dom';

const MotionHeart = motion(FavoriteIcon);

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #ffe6f2 0%, #ffd6ec 50%, #fff5fb 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Floating Heart */}
      <MotionHeart
        sx={{
          position: "absolute",
          fontSize: 250,
          color: "#ff4d88",
          opacity: 0.12,
        }}
        animate={{
          y: [-15, 15, -15],
          scale: [1, 1.08, 1],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.8,
        }}
      >
        <Box
          sx={{
            width: 500,
            maxWidth: "90%",
            p: 5,
            borderRadius: 5,
            backgroundColor: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(12px)",
            textAlign: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          }}
        >
          <MotionHeart
            sx={{
              color: "#ff4d88",
              fontSize: 70,
              mb: 2,
            }}
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />

          <Typography
            component="h3"
            variant="h3"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            Date Confirmed! ❤️
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Thanks for saying <b>YES!</b>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              lineHeight: 1.8,
            }}
          >
            Your date has been scheduled and I can't wait to spend
            time together.
            <br />
            Looking forward to making some great memories! ✨
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ff4d88",
              px: 5,
              py: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#e63d79",
              },
            }}
            onClick={() => navigate("/")}
          >
            See You Soon 💕
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
}