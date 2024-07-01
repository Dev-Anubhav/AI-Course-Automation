import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { APICONFIG } from '../PYTHONCONFIG/config';

const EditComponent = () => {
  const [text, setText] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(APICONFIG.trainingModel);
      setData(response.data);
      console.log(response.data);

      const { title, application, elements_and_performance_criteria,performance_evidence,knowledge_evidence } = response.data;

      const elementsHtml = elements_and_performance_criteria.map((item, index) => {
        const criteriaHtml = item.criteria.map((criterion, idx) => (
          `<div key=${idx} class="mb-2">
            <p>${criterion.number}: ${criterion.description}</p>
          </div>`
        )).join('');

        return `
          <div key=${index} class="grid grid-cols-2 gap-4 mb-4">
            <div class="element">
              <h4 class="font-Mont font-bold">${item.element.title}</h4>
              <p>${item.element.number}</p>
            </div>
            <div class="criteria">
              ${criteriaHtml}
            </div>
          </div>`;
      }).join('');


      const performanceEvidenceHtml = `
        <h3 class="font-Mont text-lg font-bold mb-4"><b>Performance Evidence</b></h3>
        ${performance_evidence && performance_evidence.length > 0 ? `
          <ol class="list-decimal pl-5">
            ${performance_evidence.map((item, index) => `
              <li key=${index} class="mb-2">
                ${item.evidence}
                ${item.sublist && item.sublist.length > 0 ? `
                  <ol class="list-decimal pl-5">
                    ${item.sublist.map((subitem, subindex) => `
                      <li key=${subindex}>${subitem.evidence}</li>
                    `)}
                  </ol>
                ` : ''}
              </li>
            `)}
          </ol>
        ` : ''}
      `;

      const knowledgeEvidenceHtml = `
      <h3 class="font-Mont text-lg font-bold mb-4"><b>Knowledge Evidence</b></h3>
      ${knowledge_evidence && knowledge_evidence.length > 0 ? `
        <ol class="list-decimal pl-5">
          ${knowledge_evidence.map((item, index) => `
            <li key=${index} class="mb-2">
              ${item.evidence}
              ${item.sublist && item.sublist.length > 0 ? `
                <ol class="list-decimal pl-5">
                  ${item.sublist.map((subitem, subindex) => `
                    <li key=${subindex}>${subitem.evidence}</li>
                  `).join('')}
                </ol>
              ` : ''}
            </li>
          `).join('')}
        </ol>
      ` : ''}
    `;


      const htmlContent = `
        <h1><strong>${title}</strong></h1>
        <p><b>Applications</b></p>
        <p>${application}</p>
        <h3 class="font-Mont text-lg font-bold mb-5"><strong>Elements And Performance Criteria</strong></h3>
        <div class="grid gap-4">
          ${elementsHtml}
        </div>
        ${performanceEvidenceHtml}
        ${knowledgeEvidenceHtml}

      `;

      setText(htmlContent);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setText(data);
  };

  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      <CKEditor
        editor={ClassicEditor}
        data={text}
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
