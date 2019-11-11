import React from 'react'
import { Grid, Pagination, Icon } from 'semantic-ui-react'
import style from './styles.module.scss'

const Render = ({ handleOnPageChage, ...rest }) => (
    <Grid>
        <Grid.Row>
            <Grid.Column width={16}>
                <Pagination
                    className={`${style.root}`}
                    prevItem={<Pagination.Item className={`${style.paginationItem}`} content={<Icon name="chevron left" />} />}
                    nextItem={<Pagination.Item className={`${style.paginationItem}`} content={<Icon name="chevron right" />} />}
                    ellipsisItem={<Pagination.Item className={`${style.paginationItem}`} content="..." />}
                    firstItem={null}
                    lastItem={null}
                    pageItem={<Pagination.Item className={`${style.paginationItem}`} />}
                    onPageChange={handleOnPageChage}
                    {...rest}
                />
            </Grid.Column>
        </Grid.Row>
    </Grid>
)

const TablePagination = ({ onPageChange, ...rest }) => {
    const renderProps = {
        ...rest,
        handleOnPageChage: (_, page) => onPageChange(page.activePage)
    }

    return <Render {...renderProps} />
}

export default TablePagination