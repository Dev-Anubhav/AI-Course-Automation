const CourseDetail=({data})=>{
    return(
        <>
        
         {   data && ( 
            <>
            <h1 className="font-Mont font-extrabold text-2xl mb-4"> Your Course Details</h1>
              <h2 className="font-Mont font-bold mb-3">{data.title}</h2>
              <h3 className="font-Mont text-lg font-bold">Applications</h3>
            <p>{data.application}</p>
            <h3 className="font-Mont text-lg font-bold">Elements And Performance Criteria</h3>
            </>
        )
        }
    

        </>
    )
}
export default CourseDetail;