import React from 'react';

const CourseDetails = ({ data }) => {
    return (
        <>
            {data && (
                <>
                    <h1 className="font-Mont font-extrabold text-2xl mb-4">Your Course Details</h1>
                    <h2 className="font-Mont font-bold mb-3">{data.title}</h2>
                    <h3 className="font-Mont text-lg font-bold mb-4">Applications</h3>
                    <p className='mb-4'>{data.application}</p>
                    <h3 className="font-Mont text-lg font-bold mb-5">Elements And Performance Criteria</h3>
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

                    <h3 className="font-Mont text-lg font-bold mb-4">Performance Evidence</h3>
                    {data.performance_evidence && (
                        <ol className="list-decimal pl-5">
                            {data.performance_evidence.map((item, index) => (
                                <li key={index} className="mb-2">
                                    {item.evidence}
                                    {item.sublist && item.sublist.length > 0 && (
                                        <ol className="list-decimal pl-5">
                                            {item.sublist.map((subitem, subindex) => (
                                                <li key={subindex}>{subitem.evidence}</li>
                                            ))}
                                        </ol>
                                    )}
                                </li>
                            ))}
                        </ol>
                    )}

                    <h3 className='font-Mont text-lg font-bold mb-4'>Knowledge Evidence</h3>
                    {data.knowledge_evidence && (
                        <ol className="list-decimal pl-5">
                            {data.performance_evidence.map((item, index) => (
                                <li key={index} className="mb-2">
                                    {item.evidence}
                                    {item.sublist && item.sublist.length > 0 && (
                                        <ol className="list-decimal pl-5">
                                            {item.sublist.map((subitem, subindex) => (
                                                <li key={subindex}>{subitem.evidence}</li>
                                            ))}
                                        </ol>
                                    )}
                                </li>
                            ))}
                        </ol>
                    )}

                </>
            )}
        </>
    );
};

export default CourseDetails;
