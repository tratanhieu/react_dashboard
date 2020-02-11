<<<<<<< HEAD
// import React, { useState, useEffect } from 'react'
// import { useSelector, useDispatch, shallowEqual } from "react-redux";
// import { Label } from 'semantic-ui-react'
// import { Image as Img} from "semantic-ui-react";
=======
import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Label } from 'semantic-ui-react'
import { Image as Img} from "semantic-ui-react";
>>>>>>> 8b7fdd8e6f537f6e1fe7c8e19b8bbcc8f7a1de62

// import {
//     TableModule,
//     TableRow,
//     TableCell,
//     TableHeaderCell,
//     calcCellWidth
// } from "../../../atoms/TableModule";

// import { DEFAULT_STATUS } from '../../../../constants/entites'
// // REDUX
// import {
//     setCheckedItems, fetchWithPaginationAndFilter, getUpdateAction
// } from '../../../../redux/reducers/productBrandReducer';

// const Render = ({
//     dataSources, loading, totalPages, defaultActivePage, checkAllItem,
//     onChange, onDelete, onChangePage, onCheckItem, onCheckAllItem
// }) => {
//     const cellWidth = calcCellWidth([15, 35, 35, 15], true)

//     const TableHeader = () => (
//         <>
//             <TableHeaderCell width={cellWidth[0]}>
//                 Hình ảnh
//             </TableHeaderCell>
//             <TableHeaderCell width={cellWidth[1]}>
//                 Tên Nhãn Hiệu
//             </TableHeaderCell>
//             <TableHeaderCell width={cellWidth[2]}>
//                 Slug Name
//             </TableHeaderCell>
//             <TableHeaderCell width={cellWidth[3]} textAlign="center">
//                 Trạng thái
//             </TableHeaderCell>
//         </>
//     )

//     return (
//         <TableModule
//             loading={loading}
//             showCheckbox
//             header={<TableHeader />}
//             currentItems={dataSources.length}
//             totalPages={totalPages}
//             defaultActivePage={defaultActivePage}
//             checkAllItem={checkAllItem}
//             onCheckAllItem={checked => onCheckAllItem(checked)}
//             onChangePage={onChangePage}
//             emptyColSpan={5}
//         >
//         {
//             dataSources.map((item, index) => (
//                 <TableRow
//                     key={index}
//                     showCheckbox
//                     checked={item.checked}
//                     onCheckItem={checked => onCheckItem(index, checked)}
//                     onChange={_ => onChange(item.productBrandId)}
//                     onDelete={_ => onDelete(item.productBrandId)}
//                 >
//                     <TableCell width={cellWidth[0]}>
//                         <Img
//                             style={{maxWidth: "100%"}}
//                             src={item.image}
//                         />
//                     </TableCell>
//                     <TableCell width={cellWidth[1]}>
//                         {item.name}
//                     </TableCell>
//                     <TableCell width={cellWidth[2]}>
//                         {item.slugName}
//                     </TableCell>
//                     <TableCell width={cellWidth[3]} textAlign="center">
//                         <Label color={DEFAULT_STATUS[item.status].color}>
//                             {DEFAULT_STATUS[item.status].text}
//                         </Label>
//                     </TableCell>
//                 </TableRow>
//             ))
//         }
//         </TableModule>
//     )
// }

// const ProductBrandTable = () => {
//     // const selector = useSelector(({
//     //     productBrandReducer: { productBrandList, page, totalPage: totalPages, filters, loading, reload }
//     // }) => ({ productBrandList, loading: productBrandList.length === 0 ? true : false, page, totalPages, filters, reload}), shallowEqual)

//     const selector = {
//         productBrandList: [
//             {
//                 productBrandId: 10,
//                 name: "Samsung",
//                 slugName: "/samsung",
//                 checked: false,
//                 status: "ACTIVE"
//             },
//             {
//                 productBrandId: 11,
//                 name: "Apple",
//                 slugName: "/apple",
//                 checked: false,
//                 status: "ACTIVE"
//             },
//             {
//                 productBrandId: 12,
//                 name: "Oppo",
//                 slugName: "/oppo",
//                 checked: false,
//                 status: "ACTIVE"
//             },
//             {
//                 productBrandId: 10,
//                 name: "Xiaomi",
//                 slugName: "/xiaomi",
//                 checked: true,
//                 status: "ACTIVE"
//             }
//         ],
//         loading: false,
//         totalPages: 2,
//         filters: {
//         }
//     }

//     const [state, setState] = useState({
//         checkAllItem: true,
//         dataSources: []
//     });

//     const dispatch = useDispatch();

//     useEffect(() => {
//         setState({
//             ...state,
//             checkAllItem: false,
//             dataSources: selector.productBrandList.map(item => ({
//                 ...item,
//                 checked: false
//             }))
//         })
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [selector.productBrandList])

//     useEffect(() => {
//         dispatch(fetchWithPaginationAndFilter(selector.filters, 1))
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [selector.filters, dispatch])

//     useEffect(() => {
//         if (selector.reload) {
//             dispatch(fetchWithPaginationAndFilter(selector.filters, selector.page))
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [selector.reload])
//     const renderProps = {
//         ...state,
//         ...selector,
//         defaultActivePage: selector.page,
//         onChangePage: page => dispatch(fetchWithPaginationAndFilter(selector.filters, page)),
//         onCheckItem: (index, checked) => {
//             let checkedItems = [];
//             state.dataSources[index].checked = checked;
//             state.dataSources.forEach(item =>
//                 item.checked === true ? checkedItems.push(item.productBrandId) : null
//             );
//             state.checkAllItem = checkedItems.length === state.dataSources.length
//             console.log(state)
//             setState({ ...state })
//             dispatch(setCheckedItems(checkedItems))
//         },
//         onCheckAllItem: checkAllItem => {
//             let checkedItems = [];
//             setState({
//                 ...state,
//                 checkAllItem,
//                 dataSources: state.dataSources.map(item => {
//                     if (checkAllItem) {
//                         checkedItems.push(item.productBrandId);
//                     }
//                     return {
//                         ...item,
//                         checked: item.checked !== checkAllItem ? checkAllItem : item.checked
//                     };
//                 })
//             });
//             dispatch(setCheckedItems(checkedItems))
//         },
//         onChange: productBrandId => dispatch(getUpdateAction(productBrandId))
//     }

//     return <Render {...renderProps} />
// }

// export default ProductBrandTable
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
  { id: "productBrandName", label: "Brand Name" },
  { id: "slugName", label: "Slug Name" },
  { id: "status", label: "Status" }
];

const TableRowModule = ({ image, productBrandName, slugName, status }) => (
  <>
    <TableCell>
      <Image style={{ maxWidth: "200px" }} src={image}></Image>
    </TableCell>
    <TableCell>{productBrandName}</TableCell>
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
