import React from 'react'
import { Grid, Pagination, Icon } from 'semantic-ui-react'
import style from './styles.module.scss'

const TablePagination = ({...rest}) => (
    <Grid>
        <Grid.Row>
            <Grid.Column width={16}>
                <Pagination
                    className={`${style.root}`}
                    // pointing
                    // secondary
                    prevItem={<Pagination.Item className={`${style.paginationItem}`}><Icon name="chevron left" /></Pagination.Item>}
                    nextItem={<Pagination.Item className={`${style.paginationItem}`}><Icon name="chevron right" /></Pagination.Item>}
                    ellipsisItem={<Pagination.Item className={`${style.paginationItem}`}>...</Pagination.Item>}
                    firstItem={null}
                    lastItem={null}
                    pageItem={<Pagination.Item className={`${style.paginationItem}`} />}
                    {...rest}
                />
            </Grid.Column>
        </Grid.Row>
    </Grid>
)

export default TablePagination