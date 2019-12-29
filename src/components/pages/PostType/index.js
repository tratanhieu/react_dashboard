import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import PostTypeModal from '../../organisms/PostType/PostTypeModal';
import PostTypeTable from '../../organisms/PostType/PostTypeTable';
import PostTypeFilter from '../../organisms/PostType/PostTypeFilter';
import PostTypeHeader from '../../organisms/PostType/PostTypeHeader';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';
import PostTypeAction from '../../organisms/PostType/PostTypeAction';

const PostType = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSystemErrors())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <PostTypeHeader />
            <PostTypeFilter />
            <PostTypeAction />
            <PostTypeTable />
            <PostTypeModal />
        </>
    )
}
export default PostType