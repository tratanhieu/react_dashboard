import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { DEFAULT_STATUS } from "../../../../constants/entites";
// REDUX
import FilterStatus from "../../../molecules/FilterStatus";
import { TableCell } from "@material-ui/core";
import TableModule from "../../../molecules/TableModule";
import StatusLabel from "../../../atoms/StatusLabel";
import Image from "../../../atoms/Image";
import {
  getUpdateAction,
  doDelete
} from "../../../../redux/reducers/productBrandReducer";

const listStatus = [
  { key: "", label: "All" },
  { key: "ACTIVE", label: "Active" },
  { key: "HIDDEN", label: "Hidden" },
  { key: "DELETE", label: "Delete" }
];

const headCells = [
  { id: "image", label: "Image" },
  { id: "name", label: "Brand Name" },
  { id: "slugName", label: "Slug Name" },
  { id: "status", label: "Status" }
];

const TableRowModule = ({ image, name, slugName, status }) => (
  <>
    <TableCell>
      <Image style={{ maxWidth: "200px" }} src={image}></Image>
    </TableCell>
    <TableCell>{name}</TableCell>
    <TableCell>{slugName}</TableCell>
    <TableCell>
      <StatusLabel {...DEFAULT_STATUS[status]} />
    </TableCell>
  </>
);

const Render = ({ productBrandList, loading, onOpenUpdate, onDelete }) => (
  <TableModule
    selectKey="productBrandId"
    loading={loading}
    headCells={headCells}
    dataSources={productBrandList}
    row={TableRowModule}
    onOpenUpdate={onOpenUpdate}
    onDelete={onDelete}
  >
    <FilterStatus listStatus={listStatus} onChangeFilter />
  </TableModule>
);

export default function ProductBrandTable() {
  const selector = useSelector(
    ({
      productBrandReducer: {
        productBrandList,
        page,
        totalPage: totalPages,
        filters,
        loading
      }
    }) => ({ productBrandList, loading, page, totalPages, filters }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const renderProps = {
    ...selector,
    onOpenUpdate: productBrandId => dispatch(getUpdateAction(productBrandId)),
    onDelete: productBrandId => dispatch(doDelete(productBrandId))
  };

  return <Render {...renderProps} />;
}
