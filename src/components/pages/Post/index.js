import React, { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import PostTable from '../../organisms/Post/PostTable';
import PostFilter from '../../organisms/Post/PostFilter';
import { resetSystemErrors } from '../../../redux/reducers/rootReducer';
import PostAction from '../../organisms/Post/PostAction';
import ContentHeader from '../../organisms/ContentHeader';
import { getCreateAction } from '../../../redux/reducers/postReducer';
import PostForm from '../../organisms/Post/PostForm';
import Button from '../../atoms/Button';

const PostList = ({ onOpenCreate }) => (
    <>
        <ContentHeader>
            <h1>Post</h1>
            <Button
                iconLabel
                labelPosition="left"
                primary
                iconName="plus"
                floated="right"
                loading={false}
                content="Create"
                onClick={onOpenCreate}
            />
            <Button
                iconLabel
                labelPosition="left"
                primary
                iconName="plus"
                floated="right"
                loading={false}
                content="Create"
                onClick={onOpenCreate}
            />
        </ContentHeader>
        <PostFilter />
        <PostAction />
        <PostTable />
    </>
)

const Render = ({ openForm, ...rest }) => openForm ? <PostForm /> : <PostList {...rest} />

const Post = () => {
    const selector = useSelector(({
        postReducer: { openForm, productCategory, errors } 
    }) => ({ openForm, productCategory, errors }), shallowEqual)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetSystemErrors())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderProps = {
        ...selector,
        onOpenCreate: () => dispatch(getCreateAction())
    }

    return <Render {...renderProps} />
}
export default Post