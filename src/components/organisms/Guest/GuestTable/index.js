import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Label, Button } from "semantic-ui-react";
import { Divider } from "semantic-ui-react";
import { formatDateTime } from "../../../../commons/utils";

import {
  TableModule,
  TableRow,
  TableCell,
  TableHeaderCell,
  calcCellWidth
} from "../../../atoms/TableModule";

import ClickableText from "../../../atoms/ClickableText";

import { DEFAULT_STATUS } from "../../../../constants/entites";
// REDUX
import {
  setCheckedItems,
  fetchWithPaginationAndFilter,
  getUpdateAction,
  setGuest
} from "../../../../redux/reducers/guestReducer";

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
  onCheckAllItem,
  onClickName
}) => {
  const cellWidth = calcCellWidth([45, 35, 10, 10], true);

  const TableHeader = () => (
    <>
      <TableHeaderCell width={cellWidth[0]}>Họ và tên</TableHeaderCell>
      <TableHeaderCell width={cellWidth[1]}>Thông tin liên lạc</TableHeaderCell>
      <TableHeaderCell width={cellWidth[2]}>Loại</TableHeaderCell>
      <TableHeaderCell width={cellWidth[3]} textAlign="center">
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
      emptyColSpan={9}
    >
      {dataSources.map((item, index) => (
        <TableRow
          key={index}
          showCheckbox
          checked={item.checked}
          onCheckItem={checked => onCheckItem(index, checked)}
          onChange={_ => onChange(item.guestId)}
          onDelete={_ => onDelete(item.guestId)}
        >
          <TableCell width={cellWidth[0] - 5}>
            <ClickableText onClickText={onClickName} idText={item.guestId}>{item.name}</ClickableText>
          </TableCell>
          <TableCell width={cellWidth[1]}>
            {item.phone}
            <Divider fitted />
            {item.email}
          </TableCell>
          <TableCell width={cellWidth[2]}>{item.type}</TableCell>
          <TableCell width={cellWidth[3]} textAlign="center">
            <Label color={DEFAULT_STATUS[item.status].color}>
              {DEFAULT_STATUS[item.status].text}
            </Label>
          </TableCell>
        </TableRow>
      ))}
    </TableModule>
  );
};

const ProductBrandTable = () => {
  // const selector = useSelector(({
  //     productBrandReducer: { productBrandList, page, totalPage: totalPages, filters, loading, reload }
  // }) => ({ productBrandList, loading: productBrandList.length === 0 ? true : false, page, totalPages, filters, reload}), shallowEqual)

  const selector = {
    guestList: [
      {
        guestId: "001",
        name: "Nguyen Minh Phuong",
        phone: "0905176626",
        address: "Da Nang",
        email: "nguyenminhp2000vn@gmail.com",
        type: "DIAMOND",
        token: "asadaweqwe",
        gender: "NAM",
        dateOfBirth: new Date(2000, 7, 20),
        createDate: new Date(2012, 12, 2),
        status: "ACTIVE"
      },
      {
        guestId: "002",
        name: "Vu Thu Trang",
        phone: "0905176626",
        address: "Gia Lai",
        email: "nguyenminhp2000vn@gmail.com",
        type: "SILVER",
        token: "asadaweqwe",
        gender: "NU",
        dateOfBirth: new Date(2000, 8, 20),
        createDate: new Date(2012, 12, 2),
        status: "ACTIVE"
      },
      {
        guestId: "003",
        name: "Hoang Li Thien Tan",
        phone: "0905176626",
        address: "Sai Gon",
        email: "nguyenminhp2000vn@gmail.com",
        type: "PLATINUM",
        token: "asadaweqwe",
        gender: "NU",
        dateOfBirth: new Date(2000, 8, 20),
        createDate: new Date(2012, 12, 2),
        status: "ACTIVE"
      },
      {
        guestId: "004",
        name: "Nguyen Le Truc Phan",
        phone: "0905176626",
        address: "Ha Noi",
        email: "nguyenminhp2000vn@gmail.com",
        type: "GOLD",
        token: "asadaweqwe",
        gender: "NU",
        dateOfBirth: new Date(2000, 8, 20),
        createDate: new Date(2012, 12, 2),
        status: "DELETED"
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
      dataSources: selector.guestList.map(item => ({
        ...item,
        checked: false
      }))
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector.productBrandList]);

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
        item.checked === true ? checkedItems.push(item.guestId) : null
      );
      state.checkAllItem = checkedItems.length === state.dataSources.length;
      console.log(state);
      setState({ ...state });
      dispatch(setCheckedItems(checkedItems));
    },
    onCheckAllItem: checkAllItem => {
      let checkedItems = [];
      setState({
        ...state,
        checkAllItem,
        dataSources: state.dataSources.map(item => {
          if (checkAllItem) {
            checkedItems.push(item.guestId);
          }
          return {
            ...item,
            checked: item.checked !== checkAllItem ? checkAllItem : item.checked
          };
        })
      });
      dispatch(setCheckedItems(checkedItems));
    },
    onClickName: event => {
        selector.guestList.forEach(guest => {
          if (event.target.id === guest.guestId) {
            return dispatch(setGuest(guest))
          }
        });
    },
    onChange: guestId => dispatch(getUpdateAction(guestId))
  };

  return <Render {...renderProps} />;
};

export default ProductBrandTable;
