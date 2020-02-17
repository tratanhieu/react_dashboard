import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { DEFAULT_STATUS } from "../../../../constants/entites";
import Slug from '../../../atoms/Slug';
// REDUX
import FilterStatus from "../../../molecules/FilterStatus";
import { TableCell, Chip } from "@material-ui/core";
import TableModule from "../../../molecules/TableModule";
import { formatDateTime } from '../../../../commons/utils';
import StatusLabel from "../../../atoms/StatusLabel";
import Image from "../../../atoms/Image";
import {
  getUpdateAction,
  doDelete
} from "../../../../redux/reducers/productCategoryReducer";

const listStatus = [
  { key: "", label: "All" },
  { key: "ACTIVE", label: "Active" },
  { key: "HIDDEN", label: "Hidden" },
  { key: "DELETE", label: "Delete" }
];

const headCells = [
    { id: "name", label: "Name" },
    { id: "createDate", label: "Create Date" },
    { id: "updateDate", label: "Update Date" },
    { id: "status", label: "Create Date" }
];

const TableRowModule = ({ name, slugName, createDate, updateDate, status }) => (
    <>
        <TableCell>
            {name}
            <Slug>{slugName}</Slug>
        </TableCell>
        <TableCell>{formatDateTime(createDate)}</TableCell>
        <TableCell>{formatDateTime(updateDate)}</TableCell>
        <TableCell>
            <Chip
                style={{ color: "#fff", backgroundColor: DEFAULT_STATUS[status].color }}
                label={DEFAULT_STATUS[status].text} 
            />
        </TableCell>
    </>
);

const Render = ({ productCategoryList, loading, onOpenUpdate, onDelete }) => (
  <TableModule
    selectKey="productCategoryId"
    loading={loading}
    headCells={headCells}
    dataSources={productCategoryList}
    row={TableRowModule}
    onOpenUpdate={onOpenUpdate}
    onDelete={onDelete}
  >
    <FilterStatus listStatus={listStatus} onChangeFilter />
  </TableModule>
);

export default function ProductCategoryTable() {
  const selector = useSelector(
    ({
      productCategoryReducer: {
        productCategoryList,
        page,
        totalPage: totalPages,
        filters,
        loading
      }
    }) => ({ productCategoryList, loading, page, totalPages, filters }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const renderProps = {
    ...selector,
    onOpenUpdate: productCategoryId => dispatch(getUpdateAction(productCategoryId)),
    onDelete: productCategoryId => dispatch(doDelete(productCategoryId))
  };

  return <Render {...renderProps} />;
}
