import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { DeleteForever, BorderColorOutlined } from '@material-ui/icons';
import FilterListIcon from "@material-ui/icons/FilterList";
import PageSearch from "../PageSearch";
import FilterBar from "../FilterBar";

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === "desc"
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy);
}

const search = (items, text) => items.filter(item => {
    let res = false
    for (const key in item) {
        if (String(item[key]).includes(text)) {
            res = true
        }
    }
    return res
})

function EnhancedTableHead({
    headCells,
    classes,
    checkboxColor,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
}) {
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        color={checkboxColor}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all desserts" }}
                    />
                </TableCell>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                        {headCell.label}
                        {orderBy === headCell.id && (
                            <span className={classes.visuallyHidden}>
                                {order === "desc" ? "sorted descending" : "sorted ascending"}
                            </span>
                        )}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell>Actions</TableCell>
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        color: "#000",
        backgroundColor: "#eee"
    },
    title: {
        flex: "1 1 100%"
    },
    deleteButton: {
        marginRight: "11px"
    }
}));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const { numSelected, onDelete } = props;

    return !!numSelected && (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0
            })}
        >
        {numSelected > 0 && (
            <Typography
                className={classes.title}
                color="inherit"
                variant="subtitle1"
            >
                {numSelected} selected
            </Typography>
        )}
        {numSelected > 0 && (
            <Tooltip title="Delete">
                <IconButton className={classes.deleteButton} aria-label="delete" onClick={onDelete}>
                    <DeleteForever color="error" />
                </IconButton>
            </Tooltip>
        )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        // border: '1px solid rgb(204, 204, 204)',
        borderBottom: "none"
    },
    paper: {
        width: "100%"
    },
    table: {
        minWidth: 750
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1
    },
    editIcon: {
        color: "#f2711c"
    }
}));

export default function TableModule({
    selectKey,
    headCells,
    children,
    dataSources,
    config = {
        selectColor: "primary"
    },
    row,
    onDelete
}) {
    const classes = useStyles();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("createDate");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchKeyWord, setSearchKeyWord] = React.useState("");

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = dataSources.map(item => item[selectKey]);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (_, key) => {
        const index = selected.indexOf(key);
        if (index === -1) {
            setSelected([...selected, key]);
        } else {
            selected.splice(index, 1);
            setSelected([...selected]);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = name => selected.indexOf(name) !== -1;

    const handleSearch = keyword => setSearchKeyWord(keyword)

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataSources.length - page * rowsPerPage)
    const TableRowModule = row
    return (
        <div className={classes.root}>
            <PageSearch value={searchKeyWord} onSearch={handleSearch} />
            {children}
            <Paper className={classes.paper}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    onDelete={() => onDelete(selected)}
                />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "medium"}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            headCells={headCells}
                            classes={classes}
                            checkboxColor={config.selectColor}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={dataSources.length}
                        />
                        <TableBody>
                        {stableSort(search(dataSources, searchKeyWord), getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row[selectKey]);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        align="center"
                                        checkboxColor={config.selectColor}
                                        tabIndex={-1}
                                        key={index}
                                        aria-checked={isItemSelected}
                                        selected={isItemSelected}
                                        isItemSelected={isItemSelected}
                                        labelId={labelId}
                                        onClick={e => handleClick(e, row[selectKey])}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                color={config.selectColor}
                                                inputProps={{ "aria-labelledby": labelId }}
                                            />
                                        </TableCell>
                                        <TableRowModule {...row} />
                                        <TableCell align="center">
                                            <Tooltip title="Edit">
                                                <IconButton onClick={onDelete}>
                                                    <BorderColorOutlined className={classes.editIcon} />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows === 0 && (
                            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                <TableCell align="center" colSpan={headCells.length + 1}>Empty Data...</TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={dataSources.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                >
                <h1>OK</h1>
                </TablePagination>
            </Paper>
        </div>
    );
}
