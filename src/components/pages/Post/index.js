import React, { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import PostTable from '../../organisms/Post/PostTable';
import PostFilter from '../../organisms/Post/PostFilter';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';
import PostAction from '../../organisms/Post/PostAction';
import ContentHeader from '../../organisms/ContentHeader';
import { fetchAll, getCreateAction } from '../../../redux/reducers/postReducer';
import PostForm from '../../organisms/Post/PostForm';
import Button from '../../atoms/Button';
import { AddBox } from '@material-ui/icons';

const PostList = ({ onOpenCreate }) => (
    <>
        <ContentHeader title="Post" onOpenCreate={onOpenCreate} />
        <PostTable />
    </>
)

const Render = ({ openForm, ...rest }) => openForm ? <PostForm /> : <PostList {...rest} />

const Post = () => {
    const selector = useSelector(({
        postReducer: { openForm, errors } 
    }) => ({ openForm, errors }), shallowEqual)

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