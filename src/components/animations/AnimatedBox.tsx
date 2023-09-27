import { Box, styled } from "@mui/material"
import { PropsWithChildren } from "react";


export const AnimatedBox = (props: PropsWithChildren<IAnimatedBoxProps>) => {
    return <StyledAnimatedBox {...props} />
}

interface IAnimatedBoxProps {
    "data-variant"?: "none" | "fade-up"
} 

const StyledAnimatedBox = styled(Box)<IAnimatedBoxProps>(({ "data-variant": variant }) => ({
	"@keyframes fade-up": {
		from: {
			opacity: 0,
			transform: "translateY(1rem)",
		},
		to: {
			opacity: 1,
			transform: "translateY(0)",
		},
	},
	animation: variant === "fade-up" ? "fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both" : "none",
	position: "relative",
})); 