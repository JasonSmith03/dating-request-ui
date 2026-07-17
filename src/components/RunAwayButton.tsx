import React, { useEffect, useRef, useState } from "react";

const funnyMessages = [
  "Not today, Cupid! 💘",
  "Catch me if you can!",
  "Run faster!",
  "Nice try 😏",
  "Are you sure? 😢",
  "That hurts a little 💔",
  "You missed 😎",
  "Obviously it's yes 😁",
  "You'll have to do better than that! 😤",
  "Almost had me! 😅",
  "Is that all you've got? 😜",
  "Keep trying! 💪"
];

interface RunAwayButtonProps {
  parentRef?: React.RefObject<HTMLDivElement | null>;
  yesBtnRef?: React.RefObject<HTMLButtonElement | null>;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const BTN_PADDING = 8;
const PROXIMITY_RADIUS = 80;

const RunAwayButton: React.FC<RunAwayButtonProps> = ({
  parentRef,
  yesBtnRef,
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const [hasMoved, setHasMoved] = useState(false);
  const [label, setLabel] = useState("NO");
  const [pos, setPos] = useState({ left: 0, top: 0 });

  const isHoveringDangerZone = useRef(false);

  useEffect(() => {
    const container = parentRef?.current;
    if (!container) return;

    const intervalRef = {
      current: null as ReturnType<typeof setInterval> | null,
    };

    const getRandomPos = () => {
      const btn = btnRef.current;
      if (!btn) return null;

      const containerRect = container.getBoundingClientRect();

      const btnW = btn.offsetWidth;
      const btnH = btn.offsetHeight;

      const minX = btnW / 2;
      const maxX = containerRect.width - btnW / 2;
      const minY = btnH / 2;
      const maxY = containerRect.height - btnH / 2;

      let yesLeft = -Infinity;
      let yesRight = -Infinity;
      let yesTop = -Infinity;
      let yesBottom = -Infinity;

      if (yesBtnRef?.current) {
        const yesRect = yesBtnRef.current.getBoundingClientRect();

        yesLeft = yesRect.left - containerRect.left;
        yesRight = yesRect.right - containerRect.left;
        yesTop = yesRect.top - containerRect.top;
        yesBottom = yesRect.bottom - containerRect.top;
      }

      let candX = minX + Math.random() * (maxX - minX);
      let candY = minY + Math.random() * (maxY - minY);
      let tries = 0;

      while (
        tries++ < 50 &&
        yesBtnRef?.current &&
        candX + btnW / 2 + BTN_PADDING > yesLeft &&
        candX - btnW / 2 - BTN_PADDING < yesRight &&
        candY + btnH / 2 + BTN_PADDING > yesTop &&
        candY - btnH / 2 - BTN_PADDING < yesBottom
      ) {
        candX = minX + Math.random() * (maxX - minX);
        candY = minY + Math.random() * (maxY - minY);
      }

      return {
        left: candX,
        top: candY,
      };
    };

    const handleEscapeOnce = () => {
      const newPos = getRandomPos();

      if (newPos) {
        setHasMoved(true);
        setPos(newPos);
        setLabel(funnyMessages[getRandomInt(funnyMessages.length)]);
      }
    };

    const stopMoving = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const btn = btnRef.current;
      if (!btn) return;

      const btnRect = btn.getBoundingClientRect();

      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;

      const dx = e.clientX - btnCenterX;
      const dy = e.clientY - btnCenterY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      const isInRange = distance < PROXIMITY_RADIUS;

      if (isInRange && !isHoveringDangerZone.current) {
        isHoveringDangerZone.current = true;
        handleEscapeOnce();
      }

      if (!isInRange && isHoveringDangerZone.current) {
        isHoveringDangerZone.current = false;
        stopMoving();
      }
    };

    // ✅ NEW: click behaves like hover catch
    const handleClick = (e: MouseEvent) => {
      const btn = btnRef.current;
      if (!btn) return;

      const btnRect = btn.getBoundingClientRect();

      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;

      const dx = e.clientX - btnCenterX;
      const dy = e.clientY - btnCenterY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < PROXIMITY_RADIUS * 1.2) {
        isHoveringDangerZone.current = true;
        handleEscapeOnce();
      }
    };

    const handleMouseLeave = () => {
      stopMoving();
      isHoveringDangerZone.current = false;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("click", handleClick);

    return () => {
      stopMoving();

      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("click", handleClick);
    };
  }, [parentRef, yesBtnRef]);

  return (
    <button
      ref={btnRef}
      aria-label="run-away-button"
      style={{
        position: hasMoved ? "absolute" : "relative",

        ...(hasMoved && {
          left: pos.left,
          top: pos.top,
          transform: "translate(-50%, -50%)",
        }),

        minWidth: "64px",
        width: "auto",
        height: "44px",
        padding: "12px 18px",

        borderRadius: "8px",
        border: "2px solid #333",

        background: "#998c97",
        color: "#fff",

        cursor: "pointer",
        userSelect: "none",

        fontSize: "16px",
        fontWeight: 600,
        whiteSpace: "nowrap",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        transition:
          "left 0.2s ease, top 0.2s ease, background 0.2s ease",
      }}
    >
      {label}
    </button>
  );
};

export default RunAwayButton;