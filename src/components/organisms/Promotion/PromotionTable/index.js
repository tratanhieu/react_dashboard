import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Label } from "semantic-ui-react";
import { Image as Img } from "semantic-ui-react";
import { formatDateTime } from "../../../../commons/utils";

import {
  TableModule,
  TableRow,
  TableCell,
  TableHeaderCell,
  calcCellWidth
} from "../../../atoms/TableModule";

import { PROMOTION_STATUS } from "../../../../constants/entites";
// REDUX
import {
  setCheckedItems,
  fetchWithPaginationAndFilter,
  getUpdateAction
} from "../../../../redux/reducers/promotionReducer";

const Render = ({
  dataSources,
  loading,
  totalPages,
  defaultActivePage,
  checkAllItem,
  onChange,
  onDelete,
  onChangePage,
  onCheckItem,
  onCheckAllItem
}) => {
  const cellWidth = calcCellWidth([25, 10, 10, 5, 10, 15, 10, 15], true);

  const TableHeader = () => (
    <>
      <TableHeaderCell width={cellWidth[0]}>Tên Chương trình</TableHeaderCell>
      <TableHeaderCell width={cellWidth[1]}>Ngày BĐ</TableHeaderCell>
      <TableHeaderCell width={cellWidth[2]}>Ngày KT</TableHeaderCell>
      <TableHeaderCell width={cellWidth[3]}>%</TableHeaderCell>
      <TableHeaderCell width={cellWidth[4]}>Sản Phẩm Áp Dụng</TableHeaderCell>
      <TableHeaderCell width={cellWidth[5]}>Mã Giảm Giá</TableHeaderCell>
      <TableHeaderCell width={cellWidth[6]}>% & SL</TableHeaderCell>
      <TableHeaderCell width={cellWidth[7]} textAlign="center">
        Trạng Thái
      </TableHeaderCell>
    </>
  );

  return (
    <TableModule
      loading={loading}
      showCheckbox
      header={<TableHeader />}
      currentItems={dataSources.length}
      totalPages={totalPages}
      defaultActivePage={defaultActivePage}
      checkAllItem={checkAllItem}
      onCheckAllItem={checked => onCheckAllItem(checked)}
      onChangePage={onChangePage}
      emptyColSpan={10}
    >
      {dataSources.map((item, index) => (
        <TableRow
          key={index}
          showCheckbox
          checked={item.checked}
          onCheckItem={checked => onCheckItem(index, checked)}
          onChange={_ => onChange(item.PromotionId)}
          onDelete={_ => onDelete(item.PromotionId)}
        >
          <TableCell width={cellWidth[0]}>{item.promotionName}</TableCell>
          <TableCell width={cellWidth[1]}>
            {formatDateTime(item.startDate)}
          </TableCell>
          <TableCell width={cellWidth[2]}>
            {formatDateTime(item.endDate)}
          </TableCell>
          <TableCell width={cellWidth[3]}>{item.percent}</TableCell>
          <TableCell width={cellWidth[4]}>
            {item.listProductId.length}
          </TableCell>
          <TableCell width={cellWidth[5]}>{item.promotionCodes.map(code => `${code.code}   `)}</TableCell>
          <TableCell width={cellWidth[6]}>{item.promotionCodes.map(code => `${code.percent}% | ${code.quantity} `)}</TableCell>
          <TableCell width={cellWidth[7]} textAlign="center">
            <Label color={PROMOTION_STATUS[item.realTimeStatus].color}>
              {PROMOTION_STATUS[item.realTimeStatus].text}
            </Label>
          </TableCell>
        </TableRow>
      ))}
    </TableModule>
  );
};

const PromotionTable = () => {
  // const selector = useSelector(({
  //     PromotionReducer: { PromotionList, page, totalPage: totalPages, filters, loading, reload }
  // }) => ({ PromotionList, loading: PromotionList.length === 0 ? true : false, page, totalPages, filters, reload}), shallowEqual)

  const selector = {
    PromotionList: [
      {
        promotionId: "001",
        promotionName: "Black Friday",
        percent: 20,
        startDate: new Date(2019, 10, 26),
        endDate: new Date(2019, 11, 30),
        listProductId: [11, 12, 13, 14],
        promotionCodes: [
            {
              code: "ENGND3PWQD",
              percent: 20,
              quantity: 55
            },
            {
              code: "ALOA551V97",
              percent: 25,
              quantity: 40
            },
            {
              code: "A0JSAYVNJ5",
              percent: 15,
              quantity: 66
            }
        ],
        status: true,
        realTimeStatus: "STOP"
      },
      {
        promotionId: "002",
        promotionName: "Xmas",
        startDate: new Date(2019, 11, 5),
        endDate: new Date(2019, 11, 31),
        percent: 35,
        listProductId: [
          1,
          2,
          3,
          4,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5,
          5
        ],
        promotionCodes: [
            {
              code: "JOG0ZYHS34",
              percent: 40,
              quantity: 10
            },
            {
              code: "TNHQO0R6NF",
              percent: 60,
              quantity: 5
            },
            {
              code: "3RIN3XRENS",
              percent: 20,
              quantity: 50
            }
        ],
        status: true,
        realTimeStatus: "AVAILABLE"
      },
      {
        promotionId: "003",
        promotionName: "New Year",
        startDate: new Date(2020, 0, 1),
        endDate: new Date(2020, 0, 12),
        percent: 20,
        listProductId: [1, 2, 3, 4, 5, 5, 5, 5],
        promotionCodes: [
            {
              code: "S9962TS3GS",
              percent: 55,
              quantity: 55
            },
            {
              code: "N9CUUQGU5",
              percent: 42,
              quantity: 40
            },
            {
              code: "1CQ7XZQKRR",
              percent: 10,
              quantity: 100
            }
        ],
        status: true,
        realTimeStatus: "UNAVAILABLE"
      }
    ],
    loading: false,
    totalPages: 2,
    filters: {}
  };

  const [state, setState] = useState({
    checkAllItem: true,
    dataSources: []
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setState({
      ...state,
      checkAllItem: false,
      dataSources: selector.PromotionList.map(item => ({
        ...item,
        checked: false
      }))
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector.PromotionList]);

  useEffect(() => {
    dispatch(fetchWithPaginationAndFilter(selector.filters, 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector.filters, dispatch]);

  useEffect(() => {
    if (selector.reload) {
      dispatch(fetchWithPaginationAndFilter(selector.filters, selector.page));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector.reload]);
  const renderProps = {
    ...state,
    ...selector,
    defaultActivePage: selector.page,
    onChangePage: page =>
      dispatch(fetchWithPaginationAndFilter(selector.filters, page)),
    onCheckItem: (index, checked) => {
      let checkedItems = [];
      state.dataSources[index].checked = checked;
      state.dataSources.forEach(item =>
        item.checked === true ? checkedItems.push(item.PromotionId) : null
      );
      state.checkAllItem = checkedItems.length === state.dataSources.length;
      console.log(checkedItems);
      setState({ ...state });
      // dispatch(setCheckedItems(checkedItems))
    },
    onCheckAllItem: checkAllItem => {
      let checkedItems = [];
      setState({
        ...state,
        checkAllItem,
        dataSources: state.dataSources.map(item => {
          if (checkAllItem) {
            checkedItems.push(item.PromotionId);
          }
          return {
            ...item,
            checked: item.checked !== checkAllItem ? checkAllItem : item.checked
          };
        })
      });
      dispatch(setCheckedItems(checkedItems));
    },
    onChange: PromotionId => dispatch(getUpdateAction(PromotionId))
  };

  return <Render {...renderProps} />;
};

export default PromotionTable;
