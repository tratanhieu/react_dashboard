import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Form } from "semantic-ui-react";
import FormInput from "../../../atoms/FormInput";
import ModalModule from "../../../atoms/ModalModule";
import DatePickerModule from "../../../atoms/DatePickerModule";

import {
  SaleTable,
  TableRow,
  TableCell,
  TableHeaderCell,
  calcCellWidth
} from "../../../atoms/SaleTable";

import {
  doSave,
  closeModal,
  updateCategory,
  updateGroupType,
  updateType
} from "../../../../redux/reducers/promotionReducer";

const listApplyStatus = [
  { key: "ALL", label: "Áp dụng cho tất cả sản phẩm" },
  { key: "CUSTOM", label: "Chọn sản phẩm áp dụng" }
];
const Render = ({
  promotion: {
    promotionId,
    promotionName,
    percent,
    startDate,
    endDate,
    listProductId,
    promotionCodes,
    status
  },
  applyStatus,
  openModal,
  loading,
  selectList,
  checkAllItem,
  codeStatus,
  formLoading,
  modalFormSuccessMessage,
  onPositive,
  onClose,
  onChangePromotionName,
  onChangeStatusCode,
  onChangeCode,
  onChangeCodePercent,
  onChangeCodeQuantity,
  onChangeApplyStatus,
  onChangeStartDate,
  onChangeEndDate,
  onChangePercent,
  onCheckAllItem,
  onCheckItem,
  onChangeQuantity,
  onChangeCategories,
  onChangeGroupTypes,
  onChangeGroups,
  onClickAddCode,
  onClickMinusCode,
  selectBox,
  errors = {},
  dataSources,
  ...rest
}) => {
  const cellWidth = calcCellWidth([100], true);

  const TableHeader = () => (
    <>
      <TableHeaderCell width={cellWidth[0]}>Tên Sản Phẩm</TableHeaderCell>
    </>
  );
  return (
    <ModalModule
      size="small"
      title={
        promotionId
          ? "Cập nhật chương trình khuyến mãi"
          : "Tạo chương trình khuyến mãi"
      }
      open={openModal}
      onClose={onClose}
      onPositive={onPositive}
      {...rest}
    >
      <Form>
        <Form.Field>
          <FormInput
            label="Tên chương trình: "
            placeholder="Nhập tên chương trình"
            value={promotionName}
            onChange={onChangePromotionName}
            required
          />
          <Form.Group inline={true}>
            <Form.Checkbox
              label="Dùng mã giảm giá"
              checked={codeStatus}
              onChange={onChangeStatusCode}
            />
          </Form.Group>
        </Form.Field>
        {promotionCodes.map((code, index) => (
          <Form.Group key={index}>
            <FormInput
              width={8}
              label="Mã giảm giá: "
              placeholder="Nhập mã giảm giá"
              style={{ paddingBottom: "10px" }}
              value={code.code}
              onChange={(_, input) => onChangeCode(input, index)}
            />
            <FormInput
              type="number"
              min="1"
              max="100"
              label="Phần trăm: "
              placeholder="%"
              width={3}
              onChange={(_, input) => onChangeCodePercent(input, index)}
              value={code.percent}
              required
            />
            <FormInput
              type="number"
              min="1"
              label="Số lượng: "
              placeholder="Số lượng"
              width={3}
              onChange={(_, input) => onChangeCodeQuantity(input, index)}
              value={code.quantity}
            />
            <Form.Button
              icon="plus"
              size="mini"
              style={{ marginTop: "1.88571429rem" }}
              onClick={(_, event) => onClickAddCode(event, index)}
            />
            <Form.Button
              icon="minus"
              size="mini"
              style={{ marginTop: "1.88571429rem" }}
              onClick={(_, event) => onClickMinusCode(event, index)}
              disabled={promotionCodes.length === 1}
            />
          </Form.Group>
        ))}
        <Form.Group widths={3}>
          <DatePickerModule
            label="Thời điểm bắt đầu: "
            onChange={onChangeStartDate}
            onSelected={onChangeStartDate}
            value={startDate}
          />
          <DatePickerModule
            label="Thời điểm kết thúc: "
            onChange={onChangeEndDate}
            onSelected={onChangeEndDate}
            value={endDate}
          />
          <FormInput
            type="number"
            min="1"
            max="100"
            label="Phần trăm: "
            placeholder="%"
            onChange={onChangePercent}
            value={percent}
            required
          />
        </Form.Group>
        <Form.Group>
          {listApplyStatus.map(item => (
            <Form.Radio
              key={item.key}
              label={item.label}
              value={item.key}
              checked={applyStatus === item.key}
              onChange={onChangeApplyStatus}
            />
          ))}
        </Form.Group>
        {applyStatus === "CUSTOM" ? (
          <Form.Field>
            <Form.Group widths={3}>
              <Form.Select
                label="Theo danh mục"
                options={selectBox.categories}
                placeholder="Danh mục"
                onChange={(_, select) => onChangeCategories(select.value)}
              />
              <Form.Select
                label="Theo nhóm loại sản phẩm"
                options={selectBox.groupTypes}
                placeholder="Nhóm loại sản phẩm"
                disabled={!selectList.category ? true : false}
                onChange={(_, select) => onChangeGroupTypes(select.value)}
              />
              <Form.Select
                label="Theo loại sản phẩm"
                options={selectBox.groups}
                placeholder="Loại sản phẩm"
                disabled={!selectList.groupType ? true : false}
                onChange={(_, select) => onChangeGroups(select.value)}
              />
            </Form.Group>
            <SaleTable
              loading={loading}
              showCheckbox
              header={<TableHeader />}
              currentItems={dataSources.length}
              emptyColSpan={3}
              counter={listProductId.length}
              checkAllItem={checkAllItem}
              onCheckAllItem={checked => onCheckAllItem(checked)}
            >
              {dataSources.map((item, index) => (
                <TableRow
                  key={index}
                  showCheckbox
                  checked={item.checked}
                  onChange={onCheckItem}
                  onCheckItem={checked => onCheckItem(index, checked)}
                >
                  <TableCell width={cellWidth[0]}>
                    {item.promotionName}
                  </TableCell>
                </TableRow>
              ))}
            </SaleTable>
          </Form.Field>
        ) : (
          ""
        )}
      </Form>
    </ModalModule>
  );
};

const PromotionModal = ({ onPositive, ...rest }) => {
  const selector = useSelector(
    ({
      promotionReducer: {
        openModal,
        modalFormSuccessMessage,
        formLoading,
        promotion,
        listItems,
        selectList,
        // loading,
        selectBox,
        errors
      }
    }) => ({
      openModal,
      formLoading,
      modalFormSuccessMessage,
      promotion,
      listItems,
      selectList,
      // loading,
      selectBox,
      errors
    }),
    shallowEqual
  );

  const [promotion, setPromotion] = useState(
    Object.keys(selector.promotion).length
      ? {
          ...selector.promotion
        }
      : {
          promotionName: "",
          percent: "",
          startDate: new Date(),
          endDate: new Date(),
          listProductId: [],
          promotionCodes: [],
          status: true
        }
  );

  const [state, setState] = useState({
    checkAllItem: false,
    dataSources: {},
    loading: false,
    applyStatus: "ALL",
    codeStatus: false
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setState({
      ...state,
      checkAllItem:
        promotion.listProductId.length === selector.listItems.length,
      dataSources: selector.listItems.map(item => {
        let boolean = false;
        promotion.listProductId.forEach(sItem => {
          if (sItem === item.promotionId) {
            boolean = true;
          }
        });
        return {
          ...item,
          checked: boolean
        };
      }),
      codeStatus: promotion.promotionCodes.length,
      applyStatus: promotion.listProductId.length === 0 ? "ALL" : "CUSTOM"
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector.listItems, promotion]);

  const renderProps = {
    ...rest,
    ...state,
    ...selector,
    promotion,
    onChangePromotionName: (_, input) =>
      setPromotion({
        ...promotion,
        promotionName: input.value
      }),

    onChangeStatusCode: (_, checkbox) => {
      setState({ ...state, codeStatus: checkbox.checked });
      if (!promotion.promotionCodes.length) {
        setPromotion({
          ...promotion,
          promotionCodes: [
            {
              code: Math.random()
                .toString(36)
                .substring(3)
                .toUpperCase(),
              percent: "",
              quantity: ""
            }
          ]
        });
      } else {
        setPromotion({ ...promotion, promotionCodes: [] });
      }
    },

    onChangeCode: (input, index) => {
      let arrTemp = promotion.promotionCodes;
      arrTemp[index].code = input.value;
      setPromotion({
        ...promotion,
        promotionCodes: arrTemp
      });
    },

    onChangeCodePercent: (input, index) => {
      let arrTemp = promotion.promotionCodes;
      arrTemp[index].percent = parseInt(input.value);
      setPromotion({
        ...promotion,
        promotionCodes: arrTemp
      });
    },

    onChangeCodeQuantity: (input, index) => {
      let arrTemp = promotion.promotionCodes;
      arrTemp[index].quantity = parseInt(input.value);
      setPromotion({
        ...promotion,
        promotionCodes: arrTemp
      });
    },

    onChangePercent: (_, input) =>
      setPromotion({
        ...promotion,
        percent: parseInt(input.value)
      }),

    onChangeStartDate: date =>
      setPromotion({
        ...promotion,
        startDate: date
      }),

    onChangeEndDate: date =>
      setPromotion({
        ...promotion,
        endDate: date
      }),

    onChangeCategories: select => dispatch(updateCategory(select)),

    onChangeGroupTypes: select => dispatch(updateGroupType(select)),

    onChangeTypes: select => dispatch(updateType(select)),

    onChangeApplyStatus: (_, radio) =>
      setState({ ...state, applyStatus: radio.value }),

    onClickAddCode: (event, index) => {
      let arrTemp = promotion.promotionCodes;
      arrTemp.splice(++index, 0, {
        code: Math.random()
          .toString(36)
          .substring(3)
          .toUpperCase(),
        percent: "",
        quantity: ""
      });
      setPromotion({
        ...promotion,
        promotionCodes: arrTemp
      });
    },

    onClickMinusCode: (event, index) => {
      let arrTemp = promotion.promotionCodes;
      arrTemp.splice(index, 1);
      setPromotion({
        ...promotion,
        promotionCodes: arrTemp
      });
    },
    onCheckItem: (index, checked) => {
      let arr = [];
      state.dataSources[index].checked = checked;
      state.dataSources.forEach(item =>
        item.checked === true ? arr.push(item.promotionId) : null
      );
      state.checkAllItem = arr.length === state.dataSources.length;
      setPromotion({ ...promotion, listProductId: arr });
      setState({ ...state });
    },
    onCheckAllItem: checkAllItem => {
      let listProductId = [];
      setState({
        ...state,
        checkAllItem,
        dataSources: state.dataSources.map(item => {
          if (checkAllItem) {
            listProductId.push(item.promotionId);
          }
          return {
            ...item,
            checked: item.checked !== checkAllItem ? checkAllItem : item.checked
          };
        })
      });
      setPromotion({ ...promotion, listProductId });
    },
    onPositive: _ => {
      if (!selector.codeStatus) {
        setPromotion({ ...promotion, promotionCodes: [] });
      }
      if (selector.applyStatus === "ALL") {
        setPromotion({ ...promotion, listProductId: [] });
      }
      return dispatch(doSave(promotion));
    },
    onClose: _ => dispatch(closeModal())
  };
  // console.log(promotion);
  return <Render {...renderProps} />;
};

export default PromotionModal;
