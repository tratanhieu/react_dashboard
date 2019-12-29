import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import PostModal from '../../organisms/Post/PostModal';
import PostTable from '../../organisms/Post/PostTable';
import PostFilter from '../../organisms/Post/PostFilter';
import PostHeader from '../../organisms/Post/PostHeader';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';
import PostAction from '../../organisms/Post/PostAction';

const Post = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSystemErrors())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <PostHeader />
            <PostFilter />
            <PostAction />
            <PostTable />
            <PostModal />
        </>
    )
}
export default Post