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
                    prevItem={<Pagination.Item className={`${style.paginationItem}`} content={<Icon name="chevron left" />} />}
                    nextItem={<Pagination.Item className={`${style.paginationItem}`} content={<Icon name="chevron right" />} />}
                    ellipsisItem={<Pagination.Item className={`${style.paginationItem}`} content="..." />}
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