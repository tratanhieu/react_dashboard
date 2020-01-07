import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import styles from './styles.scss'

const RichText = ({ label, height = 500 }) => {
    return (
        <div className={styles.root}>
            {label && <label>{label}</label>}
            <Editor
                apiKey="xtguhbzamroq55plwax7lrbozu2f9sqioce2mwia4qk82s4a"
                initialValue="<p>This is the initial content of the editor</p>"
                init={{
                    height: height,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste powerpaste code help wordcount',
                        'image imagetools'
                    ],
                    toolbar: `undo redo | bold italic underline strikethrough | 
                            fontselect fontsizeselect formatselect | 
                            alignleft aligncenter alignright alignjustify | 
                            outdent indent |  numlist bullist | forecolor backcolor removeformat | 
                            pagebreak | charmap emoticons | fullscreen  preview save print | 
                            insertfile image media template link anchor codesample | ltr rtl`
                    ,
                    images_upload_url: 'postAcceptor.php',
                    /* we override default upload handler to simulate successful upload*/
                    images_upload_handler: function (blobInfo, success, failure) {
                        setTimeout(function () {
                            success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
                        }, 2000)
                    }
                }}
                // onChange={this.handleEditorChange}
            />
        </div>
    )
}

export default RichText