import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { APICONFIG } from './PYTHONCONFIG/config';
import PopUp from "./PopOver"

const EditComponent = () => {
  const [text, setText] = useState('');
  const [data, setData] = useState({});
  const [unit, setUnit] = useState("ueeel0025")
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  const [show, setShow] = useState(false);
  const [searchTerm, setsearchTerm] = useState("")

  const [anchorEl, setAnchorEl] = useState(null);
  const [inputValue, setInputValue] = useState(' ');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = () => {
    console.log('Submitted:', inputValue);
    fetchData(debouncedInputValue)
    handleClose();

  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 500);
    fetchData()

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleSub = (e) => {
    e.preventDefault();
    fetchData()
  }

  const fetchData = async () => {
    try {
      let response;
      if (searchTerm.trim() === "") {
        response = await axios.get(`${APICONFIG.trainingModel}${unit}`);
      } else {
        response = await axios.get(`${APICONFIG.trainingModel}${searchTerm}`);
      }
      console.log(response.data);
  
      const { title, application, elements_and_performance_criteria, performance_evidence, knowledge_evidence } = response.data;
  
      const elementsHtml = elements_and_performance_criteria.map((item, index) => {
        const criteriaHtml = item.criteria.map((criterion, idx) => (
          `<div key=${idx} class="mb-2">
            <p><b>${criterion.number}</b> ${criterion.description}</p>
          </div>`
        )).join('');
  
        return `
          <div key=${index} class="mb-4">
            <h4 class="font-Mont">${item.element.number}: ${item.element.title}</h4>
            ${criteriaHtml}
          </div>`;
      }).join('');
  
      const performanceEvidenceHtml = `
        <div class="mb-4">
          <h3 class="font-Mont text-lg font-bold mb-4"><b>Performance Evidence</b></h3>
          ${performance_evidence && performance_evidence.length > 0 ? `
            ${performance_evidence.map((item, index) => `
              <div key=${index} class="mb-2">
                <p><b>${item.number}</b> ${item.evidence}</p>
                ${item.sublist && item.sublist.length > 0 ? `
                  <div class="pl-5">
                    ${item.sublist.map((subitem, subindex) => `
                      <p key=${subindex}><b>${subitem.number}</b>: ${subitem.evidence}</p>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          ` : ''}
        </div>
      `;
  
      const knowledgeEvidenceHtml = `
        <div class="mb-4">
          <h3 class="font-Mont text-lg font-bold mb-4"><b>Knowledge Evidence</b></h3>
          ${knowledge_evidence && knowledge_evidence.length > 0 ? `
            ${knowledge_evidence.map((item, index) => `
              <div key=${index} class="mb-2">
              <p><b>${item.number}</b> ${item.evidence}</p>
                ${item.sublist && item.sublist.length > 0 ? `
                  <div class="pl-5">
                    ${item.sublist.map((subitem, subindex) => `
                    <p key=${subindex}><b>${subitem.number}</b>: ${subitem.evidence}</p>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          ` : ''}
        </div>
      `;
  
      const htmlContent = `
        <h1><strong>${title}</strong></h1>
        <p><b>Applications</b></p>
        <p>${application}</p>
        <h3 class="font-Mont text-lg font-bold mb-5"><strong>Elements And Performance Criteria</strong></h3>
        <div class="grid grid-cols-1 gap-4">
          ${elementsHtml}
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="performance-evidence">
            ${performanceEvidenceHtml}
          </div>
          <div class="knowledge-evidence">
            ${knowledgeEvidenceHtml}
          </div>
        </div>
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
    <div style={{ height: '100vh' }}>
      {
        show && <button className='border py-4 px-8 rounded-sm text-white bg-btnColor absolute right-0 -top-16 z-10' onClick={handleClick}>Command</button>
      }

      <form onSubmit={handleSub} className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
          className="border border-gray-300 p-2"
        />
        <button type="submit" className="ml-2 py-2 px-4 bg-blue-500 text-white rounded-md">Search</button>
      </form>
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
      <PopUp />
    </div>
  );
};

export default EditComponent;