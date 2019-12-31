import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import styles from './styles.scss'

const RichText = ({ label, height = 500 }) => {
    return (
        <div className={styles.root}>
            {label && <label>{label}</label>}
            <Editor
                initialValue="<p>This is the initial content of the editor</p>"
                init={{
                    height: height,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help'
                }}
                // onChange={this.handleEditorChange}
            />
        </div>
    )
}

export default RichText