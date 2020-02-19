import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { DEFAULT_STATUS } from "../../../../constants/entites";
// REDUX
import FilterStatus from "../../../molecules/FilterStatus";
import { TableCell } from "@material-ui/core";
import TableModule from "../../../molecules/TableModule";
import StatusLabel from "../../../atoms/StatusLabel";
import Slug from "../../../atoms/Slug";
import { formatDateTime } from "../../../../commons/utils";
import {
  getUpdateAction,
  doDelete
} from "../../../../redux/reducers/productTypeReducer";

const listStatus = [
  { key: "", label: "All" },
  { key: "ACTIVE", label: "Active" },
  { key: "HIDDEN", label: "Hidden" },
  { key: "DELETE", label: "Delete" }
];

const headCells = [
  { id: "name", label: "Type Group Name" },
  { id: "typeGroupName", label: "Type Group Name" },
  { id: "createDate", label: "Create Date" },
  { id: "updateDate", label: "Update Date" },
  { id: "status", label: "Status" }
];

const TableRowModule = ({
  name,
  typeGroupName,
  slugName,
  createDate,
  updateDate,
  status
}) => (
  <>
    <TableCell>
      {name}
      <Slug>{slugName}</Slug>
    </TableCell>
    <TableCell>{typeGroupName}</TableCell>
    <TableCell>{formatDateTime(createDate)}</TableCell>
    <TableCell>{formatDateTime(updateDate)}</TableCell>
    <TableCell>
      <StatusLabel {...DEFAULT_STATUS[status]} />
    </TableCell>
  </>
);

const Render = ({ productTypeList, loading, onOpenUpdate, onDelete }) => (
  <TableModule
    selectKey="productTypeId"
    loading={loading}
    headCells={headCells}
    dataSources={productTypeList}
    row={TableRowModule}
    onOpenUpdate={onOpenUpdate}
    onDelete={onDelete}
  >
    <FilterStatus listStatus={listStatus} onChangeFilter />
  </TableModule>
);

export default function ProductTypeTable() {
  const selector = useSelector(
    ({
      productTypeReducer: {
        productTypeList,
        page,
        totalPage: totalPages,
        filters,
        loading
      }
    }) => ({ productTypeList, loading, page, totalPages, filters }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const renderProps = {
    ...selector,
    onOpenUpdate: productTypeId =>
      dispatch(getUpdateAction(productTypeId)),
    onDelete: productTypeId => dispatch(doDelete(productTypeId))
  };

  return <Render {...renderProps} />;
}