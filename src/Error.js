import { Alert , AlertTitle} from "@mui/material";
const Error = (props) => {
    
    return (
        <Alert severity={props.messageType} sx={{textAlign: 'left'}}
        >
            <AlertTitle>{props.messageType.toUpperCase()}</AlertTitle>
            <strong><h3>{props.message}</h3></strong>
        </Alert>
    )
};


export default Error;