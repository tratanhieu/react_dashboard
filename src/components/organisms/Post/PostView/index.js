import React from 'react'
import ModalModule from 'components/molecules/ModalModule';

const PostViewModal = ({ open = false, content, ...rest }) => (
    <ModalModule
        open={open}
        maxWith="lg"
        minWidth="480px"
        showPositiveButton={false}
        negativeButtonLabel="Close"
        {...rest}
    >
        <div dangerouslySetInnerHTML={{ __html: content }} />
    </ModalModule>
)

export default PostViewModal