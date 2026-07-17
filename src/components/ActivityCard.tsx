import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface ActivityCardProps {
  image: string;
  title: string;
  description?: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 4,
        overflow: "hidden",
        cursor: "pointer",

        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(8px)",

        boxShadow: "0 10px 25px rgba(0,0,0,0.12)",

        transition: "all .3s ease",

        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 18px 35px rgba(255,77,136,.25)",
        },

        "&:hover img": {
          transform: "scale(1.08)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={image}
        alt={title}
        sx={{
          transition: "transform .35s ease",
        }}
      />

      <CardContent
        sx={{
          textAlign: "center",
          py: 2.5,
        }}
      >
        <Typography
          component="h3"
          variant="h6"
        //   fontWeight={700}
          sx={{ fontWeight: "700" }}
          color="#444"
        >
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
            }}
          >
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityCard;