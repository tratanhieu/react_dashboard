import React from "react";
import { Card } from '@material-ui/core'
import Input from "../Input"
import { CloudUploadOutlined } from "@material-ui/icons";

const ImageUpload = ({
    source = "",
    width = "90px",
    height = "125px",
    objectFit = "cover",
    config = {
        width: 480,
        quality: 0.8
    },
    onChange,
    ...rest
}) => {
    const onAdd = e => {
        readFiles(e.currentTarget.files, config, image => {
            onChange(image);
        })
    }
    const onRemove = () => onChange('')
    return (
        <div>
            <div>
                <img style={{
                    width: '300px',
                    border: 'solid 1px #dee0e2',
                    padding: '5px',
                    boxShadow: '1px 1px 3px 1px #dee0e2',
                    backgrounColor: '#fff'
                }} src={source} />
            </div>
            <div>
                <label style={{
                    width: '295px',
                    display: 'flex',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    padding: '6px 16px',
                    fontSize: '0.875rem',
                    minWidth: '64px',
                    boxSizing: 'border-box',
                    transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                    fontWeight: '500',
                    lineHeight: 1.75,
                    borderRadius: '4px',
                    letterSpacing: '0.02857em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    backgroundColor: '#3f51b5',
                    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
                }} for="file-upload" class="custom-file-upload">
                    <CloudUploadOutlined /> <span style={{ alignSelf: 'center', marginLeft: '8px' }}>Upload</span>
                </label>
                <input style={{ display: 'none' }} id="file-upload" type="file" onChange={onAdd} />
            </div>
        </div>
    )
};

const readFile = (file, config, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
            const elem = document.createElement("canvas");
            const scaleFactor = config.width / img.width;
            elem.width = config.width;
            elem.height = img.height * scaleFactor;
            const ctx = elem.getContext("2d");
            ctx.drawImage(img, 0, 0, config.width, img.height * scaleFactor);
            callback(elem.toDataURL("image/jpeg", config.quality));
        };
    };
};

const readFiles = (files, config, callback) => {
    for (const file of files) {
        readFile(file, config, image => callback(image));
    }
};

export default ImageUpload
