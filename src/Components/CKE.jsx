import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditComponent = ({text,handleEditorChange}) => {

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={text || ''}
        onChange={handleEditorChange}
        config={{
          toolbar: [
            'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
            'indent', 'outdent', '|', 'blockQuote', 'insertTable', 'undo', 'redo', '|',
            'imageUpload', 'imageInsert', 'mediaEmbed', 'table', 'horizontalLine'
          ],
          heading: {
            options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
            ]
          }
        }}
      />
    </div>
  );
};

export default EditComponent;
