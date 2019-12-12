import React, { useState } from "react";

import styles from "./styles.module.css";
import OptionTableRow from "./OptionTableRow";
import TableRowEmpty from "../../../../atoms/TableRowEmpty";
import OptionModal from "./OptionModal";
import OptionTable from "./OptionTable";

const Render = ({
    openModal,
    option,
    options,
    onOpenModal,
    onCloseModal,
    onPositive,
    onChangeOptionActive,
    onRemove
}) => {
    return (
        <>
            <OptionTable onOpenModal={onOpenModal}>
                {options.map((option, index) => (
                    <OptionTableRow
                        option={option}
                        key={index}
                        index={index}
                        styles={styles}
                        onChangeOptionActive={onChangeOptionActive}
                        onOpenChangeModal={_ => onOpenModal(index)}
                        onRemove={_ => onRemove(index)}
                    />
                ))}
                {options.length <= 0 ? <TableRowEmpty /> : null}
            </OptionTable>
            <OptionModal
                option={option}
                openModal={openModal}
                onCloseModal={onCloseModal}
                onPositive={onPositive}
            />
        </>
    );
};

const ProductOptions = ({ openOptionModal, onChange, onOpenOptionModal, ...rest }) => {
    const initOption = {
        packageName: "",
        quantity: 1,
        images: [],
        active: true
    };

    const [state, setState] = useState({
        option: initOption,
        options: []
    });

    const renderProps = {
        ...rest,
        ...state,
        onCloseModal: _ =>
            setState({
                ...state,
                openModal: false
            }),
        onOpenModal: index =>
            setState({
                ...state,
                openModal: true,
                option: index
                ? {
                    ...state.options[index],
                    index
                }
                : initOption
            }),
        onPositive: option => {
            if (option.key) {
                state.options[state.options.findIndex(item => item.key === option.key)] = {
                    ...option
                }
                setState({
                    ...state,
                    option,
                    openModal: false
                });
            } else {
                setState({
                    ...state,
                    option,
                    options: [...state.options, option],
                    openModal: false
                });
            }
        },
        onNegative: _ =>
            setState({
                ...state,
                openModal: false
            }),
        onChangeOptionActive: (index, checked) => {
            state.options[index] = {
                ...state.options[index],
                active: checked
            };
            setState({ ...state });
        },
        onRemove: index => {
            state.options.splice(index, 1);
            setState({ ...state });
        }
    };

    return <Render {...renderProps} />;
};

export default ProductOptions;
