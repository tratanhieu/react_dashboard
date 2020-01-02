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
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: `undo redo | bold italic underline strikethrough | 
                            fontselect fontsizeselect formatselect | 
                            alignleft aligncenter alignright alignjustify | 
                            outdent indent |  numlist bullist | forecolor backcolor removeformat | 
                            pagebreak | charmap emoticons | fullscreen  preview save print | 
                            insertfile image media template link anchor codesample | ltr rtl`
                    ,
                }}
                // onChange={this.handleEditorChange}
            />
        </div>
    )
}

export default RichText