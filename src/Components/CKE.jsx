import React, { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { APICONFIG } from './PYTHONCONFIG/config';
import PopUp from "./PopOver";

const EditComponent = () => {
  const [text, setText] = useState('');
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputValue, setInputValue] = useState(' ');
  const cancelTokenSourceRef = useRef(null); 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = () => {
    console.log('Submitted:', inputValue);
    fetchData(debouncedInputValue);
    handleClose();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 500);
    fetchData();

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  const handleSub = (e) => {
    e.preventDefault();
    setText("")
    fetchData();
  };

  const appendText = (newText) => {
    setText((prevText) => prevText + newText);
  };

  const fetchData = async () => {
    // Cancel previous request if exists
    if (cancelTokenSourceRef.current) {
      cancelTokenSourceRef.current.cancel('Operation canceled due to new request.');
    }

    // Create a new cancel token
    const source = axios.CancelToken.source();
    cancelTokenSourceRef.current = source;

    try {
      setText('<span class="blinking-cursor">|</span>');
      const response = await axios.get(`${APICONFIG.trainingModel}${searchTerm.trim() === "" ? "" : searchTerm}`, {
        cancelToken: source.token
      });

      const { title, application, elements_and_performance_criteria, performance_evidence, knowledge_evidence } = response.data;

      let updatedText = '';

      appendText(`<h1><strong>${title}</strong></h1>`);
      appendText(`<p><b>Applications</b></p><p>${application}</p>`);
      appendText(`<h3 class="font-Mont text-lg font-bold mb-5"><strong>Elements And Performance Criteria</strong></h3>`);

      elements_and_performance_criteria.forEach((item, index) => {
        const elementHtml = `
          <div key=${index} class="mb-4">
            <h4 class="font-Mont">${item.element.number}: ${item.element.title}</h4>
          </div>`;
        appendText(elementHtml);

        item.criteria.forEach((criterion, idx) => {
          const criteriaHtml = `
            <div key=${idx} class="mb-2">
              <p><b>${criterion.number}</b> ${criterion.description}</p>
            </div>`;
          appendText(criteriaHtml);
        });
      });

      appendText(`<div class="grid grid-cols-2 gap-4">`);

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
        </div>`;
      appendText(`<div class="performance-evidence">${performanceEvidenceHtml}</div>`);

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
        </div>`;
      appendText(`<div class="knowledge-evidence">${knowledgeEvidenceHtml}</div>`);

      appendText(`</div>`);

      const postResponse = await handlePostRequest(source.token);

      const generateTableHtml = (mappings) => {
        return `
        <h2><b>Performance Criterion and Knowledge Evidence Mapping</b></h2>
          <table border="1" cellspacing="0" cellpadding="5" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="text-align: left;">Performance Criterion</th>
                <th style="text-align: left;">Mapped Knowledge Evidence</th>
                <th style="text-align: left;">Reason For Mapping</th>
              </tr>
            </thead>
            <tbody>
              ${mappings.map(mapping => `
                <tr>
                  <td>${mapping["Performance Criterion"]}</td>
                  <td>${mapping["Mapped Knowledge Evidence"]}</td>
                  <td>${mapping["Reason For Mapping"]}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      };

      const tableHtml = generateTableHtml(postResponse);

      appendText(`<div class="mapped-table">${tableHtml}</div>`);

      setShow(true);
      sendSubtopics();
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error('Error fetching data:', error);
      }
    }
  };

  const sendSubtopics = async () => {
    // Cancel previous request if exists
    if (cancelTokenSourceRef.current) {
      cancelTokenSourceRef.current.cancel('Operation canceled due to new request.');
    }

    // Create a new cancel token
    const source = axios.CancelToken.source();
    cancelTokenSourceRef.current = source;

    try {
      const response = await axios.post(
        APICONFIG.extract,
        { custom_prompt: "" },
        { cancelToken: source.token, headers: { "Content-Type": "application/json" } }
      );

      console.log(response);

      const topics = response.data.topics.topics;

      for (const topic of topics) {
        const pc = topic.PC;
        const subtopics = topic.subtopics;

        for (const subtopic of subtopics) {
          const payload = {
            topic_name: pc,
            subtopic_name: subtopic,
            custom_prompt: "Ensure to emphasize real-world applications."
          };

          try {
            const descriptionResponse = await axios.post(
              APICONFIG.descriptive,
              payload,
              { cancelToken: source.token, headers: { "Content-Type": "application/json" } }
            );
            console.log('Successfully sent description:', descriptionResponse);

            const descriptionHtml = `
              <div class="description-section">
                <h4><b>${pc}</b></h4>
                <h5><b>${subtopic}</b></h5>
                <p>${descriptionResponse.data.description}</p>
              </div>
            `;

            appendText(descriptionHtml);

          } catch (descriptionError) {
            console.error('Error sending description to API:', descriptionError);
          }
        }
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error('Error sending subtopics to API:', error);
      }
    }
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setText(data);
  };

  const handlePostRequest = async (cancelToken) => {
    try {
      const response = await axios.post(APICONFIG.performance, {
        custom_prompt: " "
      }, {
        cancelToken: cancelToken,
        headers: {
          "Content-Type": "application/json"
        }
      });
      return response.data.Mappings; 
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error("Error in POST request:", error);
      }
      return [];
    }
  };

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <form onSubmit={handleSub} className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2"
        />
        <button type="submit" className="ml-2 py-2 px-4 bg-blue-500 text-white rounded-md">Search</button>
      </form>
      <div className="editor-container relative">
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
      {show && (
        <button 
          className='border py-4 px-8 rounded-sm text-white bg-btnColor absolute right-0 top-0 z-10'
          onClick={handleClick}
          style={{ zIndex: 10 }}
        >
          Command
        </button>
      )}
      <PopUp handleSubmit={handleSubmit} inputValue={inputValue} setInputValue={setInputValue} anchorEl={anchorEl} handleClose={handleClose}  />
    </div>
  );
};

export default EditComponent;
