
import React, { useState } from "react";
import FormInput from "../FormInput";

// import styles from './styles.module.scss'

const InputWithSlug = ({ path, onChange, ...rest }) => {
    const [slugValue, setSlugValue] = useState(null);
    const [tempSlugValue, setTempSlugValue] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const handleChange = (e, input, errors) => {
        const slugName = makeSlug(input.value);
        if(!slugValue) {
            setTempSlugValue(slugName);
        }

        onChange(e, input, slugValue, errors);
    };

    const handleChangeSlugValue = (e, input, errors) => {
        setSlugValue(input.value);
        setTempSlugValue(input.value);
    };

    const makeSlug = str => {
        str = str.toLowerCase();

        str = str.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
        str = str.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
        str = str.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
        str = str.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
        str = str.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
        str = str.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
        str = str.replace(/đ/gi, "d");
        str = str.replace(
        /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
        ""
        );
        str = str.replace(/ /gi, "-");
        str = str.replace(/\-\-\-\-\-/gi, "-");
        str = str.replace(/\-\-\-\-/gi, "-");
        str = str.replace(/\-\-\-/gi, "-");
        str = str.replace(/\-\-/gi, "-");
        str = "@" + str + "@";
        str = str.replace(/\@\-|\-\@|\@/gi, "");

        return str;
    };

    const DOMAIN_NAME = `https://${window.location.hostname}${path ? path :''}/`
    
    return (
        <>
            <FormInput onChange={handleChange} {...rest} />
            {tempSlugValue && isEdit === false ? (
                <div style={{width: '100%', marginBottom: 8, paddingRight: 8}}>
                    <i style={{ textDecoration: "underline", wordBreak: 'break-word' }}>
                        <a>{DOMAIN_NAME}</a>{tempSlugValue}<a>.html</a>
                    </i>
                    <span> - </span>
                    <a href="javascript:void(0)"
                        style={{ textDecoration: "underline" }}
                        onClick={_ => setIsEdit(true)}>Sửa</a>
                </div>
            ) : null}
            {isEdit ? (
                <div style={{ width: '100%', display: "block", background: "#eee", padding: 8, marginBottom: 8 }}>
                    <FormInput value={tempSlugValue} onChange={handleChangeSlugValue} />
                    &nbsp; &nbsp;
                    <a href="javascript:void(0)" style={{ textDecoration: "underline" }}
                        onClick={_ => setIsEdit(false)} >Ok</a>
                    &nbsp; &nbsp;
                    <a href="javascript:void(0)" style={{ textDecoration: "underline" }}
                        onClick={_ => setIsEdit(false)} >Hủy</a>
                </div>
            ) : null}
        </>
    );
}

export default InputWithSlug;
