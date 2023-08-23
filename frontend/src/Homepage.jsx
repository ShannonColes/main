import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// import context ----------------------------------------------------------------

// import components ----------------------------------------------------------------

// Landing image + header
// h1 students portfolio
// grid to display students
// api call to render the students into a grid of display cards & student names/details
// student cards button to link to the portfolio page of that student.

const Homepage = () => {
  // const state
  const [students, setStudents] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      // axios call
      const response = await axios.get("http://localhost:4000/api/students");

      // check response status is okay (200)
      if (response.status === 200) {
        console.log(response.data);
        // setWorkouts(response.data);
      }
    };

    fetchStudents();
  }, []);

  return (
    <>
      <div className="header-image">
        <h2 className="header">
          Yoobee College of Creative Innovation is New Zealand’s largest
          specialist creative and technology college.
        </h2>
      </div>

      <div className="students-grid-container">
        {students.map((student) => (
          <div key={student.id} className="grid-item">
            <h3>{student.title}</h3>
            <p>{student.details}</p>
            <Link to={`/portfolio/${student.id}`} className="view-btn">
              View
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Homepage;
