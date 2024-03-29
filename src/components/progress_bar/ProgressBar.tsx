import { Box, styled } from "@mui/material";
import { useEffect, useState } from "react";

interface ProgressBarProps {
	value: number;
}

export const ProgressBar = ({ value }: ProgressBarProps) => {
	const [progressValue, setProgressValue] = useState(0);
	useEffect(() => {
		setProgressValue(value);
	},[value])
	return <StyledProgressBar data-progress={progressValue} />;
};
interface ProgressBarStyleProps {
	"data-progress": number;
	"data-delay"?: number;	
}

const StyledProgressBar = styled(Box)<ProgressBarStyleProps>(({ theme, "data-progress": dataProgress }) => {
	const progress = dataProgress > 100 ? 100 : dataProgress < 0 ? 0 : dataProgress;
	return {
		borderRadius: "8px",
		position: "relative",
		width: "100%",
		height: ".33rem",
		backgroundColor: theme.palette.grey[300],
		overflow: "hidden",

		"&::before": {
			content: '""',
			position: "absolute",
			top: 0,
			left: 0,
			height: "100%",
			width: `${progress}%`,
			backgroundColor: theme.palette.success.main,
			borderRadius: "8px",
			transition: "width 1.5s cubic-bezier(0.16, 1, 0.3, 1)", // smooth transition
		},
	};
});
