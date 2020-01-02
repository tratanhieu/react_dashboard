import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import PostTypeModal from '../../organisms/PostType/PostTypeModal';
import PostTypeTable from '../../organisms/PostType/PostTypeTable';
import PostTypeFilter from '../../organisms/PostType/PostTypeFilter';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';
import ContentHeader from '../../organisms/ContentHeader';
import { getCreateAction } from '../../../redux/reducers/postTypeReducer';
import Button from '../../atoms/Button';

const Render = ({ onOpenCreate }) => (
    <>
        <ContentHeader>
            <h1>Post Type</h1>
            <Button
                labelPosition="left"
                iconName="addBoxIcon"
                loading={false}
                content="Create"
                onClick={onOpenCreate}
            />
        </ContentHeader>
        <PostTypeFilter />
        <PostTypeTable />
        <PostTypeModal />
    </>
)

const PostType = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSystemErrors())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderProps = {
        onOpenCreate: () => dispatch(getCreateAction())
    }
    
    return <Render {...renderProps} />
}
export default PostType