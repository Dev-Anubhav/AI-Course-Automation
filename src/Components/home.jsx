import { useState,useEffect} from "react";
import EditComponent from "./CKE";
import MyCards from "./Cards";
import axios from 'axios';
import { APICONFIG } from '../PYTHONCONFIG/config'; 
import CourseDetail from "./CourseDetails";

const Home = () => {
    const [text, setText] = useState('');
    const [data,setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  
    try {
      const response = await axios.get(APICONFIG.trainingModel); 
      setData(response.data);
      console.log(response.data)
      const { title, application } = response.data;
      const htmlContent = `
        <h1><strong>${title}</strong></h1>
        <p><b>Applications</b></p>
        <p>${application}</p>
        <h3 className="font-Mont text-lg font-bold mb-5"><strong>Elements And Performance Criteria</strong></h3>
        {data.elements_and_performance_criteria && (
            <div className="grid gap-4">
                {data.elements_and_performance_criteria.map((item, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                        <div className="element">
                            <h4 className="font-Mont font-bold">{item.element.title}</h4>
                            <p>{item.element.number}</p>
                        </div>
                        <div className="criteria">
                            {item.criteria.map((criterion, idx) => (
                                <div key={idx} className="mb-2">
                                    <p>{criterion.number}: {criterion.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )}
      `
      setText(htmlContent); 
    } catch (error) {
      // console.error('Error fetching data:', error);
    }
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setText(data); 
  };
  return (
    <div className="mx-auto max-w-full">
     
            <main className="px-6">
                <div className="flex justify-between">
                    <div className="w-full flex-grow">
                        <CourseDetail data={data} />
                    </div>
                    <div className="w-full flex-grow">
                        <EditComponent text={text} handleEditorChange={handleEditorChange} />
                    </div>
                </div>
            </main>
    </div>
);
};

export default Home;
