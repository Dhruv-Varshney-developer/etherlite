import { motion } from "framer-motion";
import { Button } from "@mui/material";

export const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
      yoyo: Infinity,
    },
  },
};

export const AnimatedButton = ({ variant, color, onClick, children }) => (
  <motion.div variants={buttonVariants} whileHover="hover">
    <Button variant={variant} color={color} onClick={onClick}>
      {children}
    </Button>
  </motion.div>
);
