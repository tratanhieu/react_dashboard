import React, { useState } from "react";
import FormInput from "../FormInput";
import { makeSlug } from "../../../commons/utils";
import './style.css'

const FormInputSlug = ({
    defaultValue,
    defaultSlugValue,
    valueError = '',
    slugValueError = '',
    onChange,
    onChangeSlugValue,
    ...rest
}) => {
    const [state, setState] = useState({
        tempSlugValue: defaultSlugValue,
        slugValue: defaultSlugValue,
        edit: false,
    });

    const handleChangeValue = (e, input, error) => {
        const tempSlugValue = makeSlug(input.value);
        if(!state.slugValue) {
            setState({ ...state, tempSlugValue });
        }
        onChange(e, input, error);
    };

    const handleChangeSlugValue = (e, input, error) => {
        setState({ ...state, tempSlugValue: input.value })
        onChangeSlugValue(e, input, error)
    };

    const handleCancel = () => setState({ ...state, edit: true })

    return (
        <div className="input-slug">
            <FormInput
                defaultValue={defaultValue}
                error={state.slugValueError}
                onChange={handleChangeValue}
                {...rest} />
            { 
                state.edit ? 
                    <div class="edit-area">
                        <FormInput
                            defaultValue={state.tempSlugValue}
                            error={state.slugValueError} 
                            onChange={handleChangeSlugValue}
                        />
                        <p>
                            <a onClick={_ => setState({ ...state, edit: true })} >Ok</a>
                            <a onClick={handleCancel}>Cancel</a>
                        </p>
                    </div>
                : state.tempSlugValue ?
                    <p>
                        <b>Slug: </b><i>{state.tempSlugValue}</i>
                        &nbsp;
                        <a onClick={handleCancel}>Edit</a>
                    </p>
                : null
            }
        </div>
    )
}

export default FormInputSlug;
