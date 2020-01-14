import React from "react";
import { Card } from '@material-ui/core'
import Input from "../Input"

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
                <Card>
                    <img src={source} />
                </Card>
            </div>
            <div
                style={{ width, height, lineHeight: `calc(${height} - 14px)` }}
            >
                <Input
                    type="file"
                    multiple
                    onChange={onAdd}
                />
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
