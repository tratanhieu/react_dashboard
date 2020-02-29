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
} from "../../../../redux/reducers/providerReducer";

const listStatus = [
  { key: "", label: "All" },
  { key: "ACTIVE", label: "Active" },
  { key: "HIDDEN", label: "Hidden" },
  { key: "DELETE", label: "Delete" }
];

const headCells = [
  { id: "name", label: "Name" },
  { id: "contact", label: "Contact" },
  { id: "note", label: "Note" },
  { id: "status", label: "Status" }
];

const TableRowModule = ({
  providerId,
  name,
  address,
  phone,
  mail,
  note,
  status
}) => (
  <>
    <TableCell>{name}</TableCell>
    <TableCell>
      <p>{address}</p>
      <p>{phone}</p>
      <p>{mail}</p>
    </TableCell>
    <TableCell>{note}</TableCell>
    <TableCell>
      <StatusLabel {...DEFAULT_STATUS[status]} />
    </TableCell>
  </>
);

const Render = ({ providerList, loading, onOpenUpdate, onDelete }) => (
  <TableModule
    selectKey="providerId"
    loading={loading}
    headCells={headCells}
    dataSources={providerList}
    row={TableRowModule}
    onOpenUpdate={onOpenUpdate}
    onDelete={onDelete}
  >
    <FilterStatus listStatus={listStatus} onChangeFilter />
  </TableModule>
);

export default function ProviderTable() {
  const selector = useSelector(
    ({
      providerReducer: {
        providerList,
        page,
        totalPage: totalPages,
        filters,
        loading
      }
    }) => ({ providerList, loading, page, totalPages, filters }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const renderProps = {
    ...selector,
    onOpenUpdate: providerId => dispatch(getUpdateAction(providerId)),
    onDelete: providerId => dispatch(doDelete(providerId))
  };

  return <Render {...renderProps} />;
}
