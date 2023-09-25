import { Search } from "@mui/icons-material";
import {  Input, InputProps, styled } from "@mui/material"
export const SearchBar = (props: InputProps) => {
    return <StyledInput  disableUnderline placeholder="Search..." startAdornment={<Search fontSize="small" color="disabled"/>} {...props}/>

}

    
const StyledInput = styled(Input)(({theme}) => ({
    borderRadius: "1rem",
    backgroundColor: theme.palette.common.white,
    padding: "0.25rem 1rem", 
    gap: ".5rem",
    "& .MuiInputBase-input": {
        fontSize: theme.typography.body2.fontSize,
        padding: 0
    }
}))