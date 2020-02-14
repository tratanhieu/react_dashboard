import React, { useState } from "react";
import styles from "./styles.module.scss";
import { IconButton } from "@material-ui/core";
import { Cancel, AddCircle } from "@material-ui/icons";

const Render = ({
    rootWitdh = "480px",
    width = "90px",
    height = "125px",
    objectFit = "cover",
    max,
    loading,
    dataSources,
    files,
    error,
    onAdd,
    onActive,
    onRemove
}) => (
    <div className={styles.root} style={{ width: rootWitdh }}>
        {dataSources.map((image, i) => (
        <div
            key={i}
            className={styles.imageItem}
            style={{
            width,
            height,
            backgroundColor: `#${image.active ? `45A163` : `fff`}`
            }}
        >
            <img
                alt=""
                className={styles.image}
                style={{ objectFit, opacity: image.active ? 1 : 0.5 }}
                key={i}
                src={image.src}
                size="small"
                onClick={_ => onActive(i)}
            />
            <IconButton
                size="small"
                color="secondary"
                className={styles.closeIcon}
                onClick={() => onRemove(i, image.active)}
            >
                <Cancel />
            </IconButton>
        </div>
        ))}
        <div
            className={styles.addArea}
            style={{
                display: dataSources.length === max ? 'none' : 'block',
                width, height, lineHeight: `calc(${height} - 14px)`
            }}
        >
            <input
                className={styles.inputFile}
                type="file"
                multiple
                accept="image/*"
                onChange={onAdd}
                value={files}
            />
            {loading > 0 && loading < 100 ? 
                <button className={styles.loading}>
                    <progress className={styles.loading} value={loading} max="100">{loading}</progress>
                </button> :
                <IconButton style={{ zIndex: -1 }}>
                    <AddCircle />
                </IconButton>
            }
        </div>
        {error && <span className={styles.error}>{error}</span>}
    </div>
);

const ImageUploads = ({
    name = "images",
    dataSources = [],
    max = 3,
    config = {
        width: 480,
        quality: 0.8
    },
    onChange,
    ...rest
}) => {
    const [files, setFiles] = useState('')
    const [loading, setLoading] = useState(0)
    const [error, setError] = useState('')

    const renderProps = {
        ...rest,
        loading,
        files,
        max,
        dataSources,
        error,
        onAdd: async e => {
            setError("")
            const files = e.currentTarget.files
            if (files.length > (max - dataSources.length)) {
                setError(`You only upload maximum ${max} photo`)
                return
            }
            setFiles(e.currentTarget.value)
            const images = await readFiles(files, config, dataSources, setLoading)
            onChange("", { name, value: [...images] })
            setFiles("")
            setLoading(100)
        },
        onActive: index => {
            setError("")
            const currentActive = dataSources.findIndex(image => image.active === true);
            dataSources[currentActive] = {
                ...dataSources[currentActive],
                active: false
            };
            dataSources[index] = {
                ...dataSources[index],
                active: true
            };
            onChange("", { name, value: [...dataSources] });
        },
        onRemove: (index, active) => {
            setError("")
            dataSources.splice(index, 1);
            if (active && dataSources.length > 0) {
                dataSources[0] = {
                ...dataSources[0],
                active: true
                };
            }
            onChange("", { name, value: [...dataSources] });
        }
    };
    return <Render {...renderProps} />;
};

const readFile = (file, config) => new Promise((resolve, reject) => {
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
            resolve(elem.toDataURL("image/jpeg", config.quality));
        };
    };
})

const readFiles = (
    files,
    config,
    dataSources,
    setLoading
) => new Promise(async resolve => {
    let images = dataSources
    let loading = 0;
    const loadingRound = 90 / files.length
    for (const file of files) {
        const image = await readFile(file, config);
        images = [...images, {
            active: images.length === 0,
            src: image
        }]
        loading += loadingRound
        setLoading(loading)
    }
    resolve(images)
})

export default ImageUploads