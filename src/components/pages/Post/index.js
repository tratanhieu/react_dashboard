import React, { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import PostTable from '../../organisms/Post/PostTable';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';
import ContentHeader from '../../organisms/ContentHeader';
import { fetchAll, getCreateAction } from '../../../redux/reducers/postReducer';
import PostModal from '../../organisms/Post/PostModal';

const Render = ({ onOpenCreate }) => (
    <>
        <ContentHeader title="Post" onOpenCreate={onOpenCreate} />
        <PostTable />
        <PostModal />
    </>
)

const Post = () => {
    const selector = useSelector(({
        postReducer: { errors } 
    }) => ({ errors }), shallowEqual)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSystemErrors())
        dispatch(fetchAll())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderProps = {
        ...selector,
        onOpenCreate: () => dispatch(getCreateAction())
    }

    return <Render {...renderProps} />
}
export default Post