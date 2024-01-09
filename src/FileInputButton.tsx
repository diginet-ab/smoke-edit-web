import React from 'react';
import { Button, ButtonOwnProps } from '@mui/material';

const FileInputButton = (props: { onFileSelect: any } & ButtonOwnProps) => {
    const fileInputRef = React.useRef(null);

    const handleButtonClick = () => {
        (fileInputRef.current as any).click();
    };

    const handleFileChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            props.onFileSelect(event.target.files[0]);
        }
    };
    const {onFileSelect, ...buttonProps} = props
    return (
        <div>
            <Button {...buttonProps} onClick={handleButtonClick}>
                {props.children}
            </Button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".json"
            />
        </div>
    );
};

export default FileInputButton;
