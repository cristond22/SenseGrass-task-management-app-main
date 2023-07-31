import React from 'react';
import { useParams } from 'react-router-dom';
import EditTaskForm from '../components/EditTask';

const EditTask = () => {
  const { id } = useParams(); // Access the 'id' from URL params

  return (
    <>
      <EditTaskForm taskId={id} /> {/* Pass the 'id' as a prop */}
    </>
  );
};

export default EditTask;
