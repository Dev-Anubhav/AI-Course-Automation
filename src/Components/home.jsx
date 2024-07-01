import { useState,useEffect} from "react";
import EditComponent from "./CKE";
import MyCards from "./Cards";
import axios from 'axios';
import { APICONFIG } from '../PYTHONCONFIG/config'; 
import CourseDetail from "./CourseDetails";

const Home = () => {
    const [text, setText] = useState('');
    const [data,setData] = useState({});
    const[show,setShow]=useState(true);

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
