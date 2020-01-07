import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import PostTypeModal from '../../organisms/PostType/PostTypeModal';
import PostTypeTable from '../../organisms/PostType/PostTypeTable';
import PostTypeFilter from '../../organisms/PostType/PostTypeFilter';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';
import ContentHeader from '../../organisms/ContentHeader';
import { fetchAll, getCreateAction } from '../../../redux/reducers/postTypeReducer';
import Button from '../../atoms/Button';
import { AddBox } from '@material-ui/icons';

const Render = ({ onOpenCreate }) => (
    <>
        <ContentHeader title="Post Type" onOpenCreate={onOpenCreate} />
        <PostTypeTable />
        <PostTypeModal />
    </>
)

const PostType = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSystemErrors())
        dispatch(fetchAll())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderProps = {
        onOpenCreate: () => dispatch(getCreateAction())
    }
    
    return <Render {...renderProps} />
}
export default PostType