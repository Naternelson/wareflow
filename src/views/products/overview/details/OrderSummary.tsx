import { Box, Typography, styled } from "@mui/material";
import { ProgressBar } from "../../../../components/progress_bar/ProgressBar";

interface OrderSummaryProps {
    orderId: string;
    status: "queued" | "paused" | "picking" | "packing" | "shipping" | "delivered" | "cancelled";
    customerId: string, 
    customerName: string, 
    unitCountOrdered: number,
    unitCountPicked: number,
    createdOn: string, 
    lastUpdatedOn?: string
}

export const OrderSummary = ({orderId, status, createdOn, lastUpdatedOn, customerId, customerName, unitCountOrdered, unitCountPicked}:OrderSummaryProps) => {
    return (
        <StyledRow>
            <StyledColumn>
                <Typography variant="h6" fontWeight={"bold"}>{orderId}</Typography>
                <Typography variant="caption" >{status}</Typography>
                <Typography variant="caption" fontStyle={"oblique"}>{`${new Date(createdOn).toDateString()}`} {lastUpdatedOn && ` - ${new Date(lastUpdatedOn).toDateString()}`}</Typography>
                <Typography variant="caption" >{`${customerName} - ${customerId}`}</Typography>
            </StyledColumn>
            <StyledColumnEnd>
                <Typography variant="h6" component={"span"}>{`${unitCountPicked} / ${unitCountOrdered}`}</Typography>
                <ProgressBar value={Number(unitCountPicked / unitCountOrdered) * 100} />
            </StyledColumnEnd>
        </StyledRow>
    )
}

const StyledRow = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    width: "100%",
    // marginBottom: "1rem",
}));

const StyledColumn = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "50%",
    // marginBottom: "1rem",
    height: "100%",
}));

const StyledColumnEnd = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "50%",
    height: "100%",
}));