import { useState,useEffect} from "react";
import EditComponent from "./CKE";


const Home = () => {
  return (
    <div className="mx-auto max-w-full">
     
            <main className="px-6">
                <div className="flex justify-between">
                    <div className="w-full flex-grow">
                        <EditComponent />
                    </div>
                </div>
            </main>
    </div>
);
};

export default Home;
