import { FormatQuoteSharp } from "@mui/icons-material";
import { Dialog, DialogTitle, Divider, Typography } from "@mui/material";

interface MessageDialogProps {
    open: boolean,
    message: string,
    garden: string,
    onClose: (value: string) => void,
}

function MessageDialog(props: MessageDialogProps) {
    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle sx={{maxWidth: 384, maxLines: 2, overflow: 'hidden', textAlign: 'center'}}>
                <Typography variant="h6">
                Nachricht zu ihrem Garten
                <br />
                <strong>{`${props.garden}`}</strong> {/* The second line in bold */}
                </Typography>
            </DialogTitle>
            <Divider sx={{marginBottom: 1.5}}/>
            <div className="flex flex-col pb-4 px-4">
                <div className="w-full flex flex-row justify-end"><FormatQuoteSharp/></div>
                <div className="w-full flex flex-row justify-center row max-h-96 max-w-96 px-4 overflow-auto">
                    <Typography variant="body1">
                        {props.message}
                    </Typography>
                </div>
                <div className="w-full flex flex-row justify-start"><FormatQuoteSharp/></div>
             </div>
        </Dialog>
    );
}

export default MessageDialog;