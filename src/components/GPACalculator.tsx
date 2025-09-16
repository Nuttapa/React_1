// GPACalculator.tsx - GPA Calculator Component / คอมโพเนนต์คำนวณ GPA

import { useState } from "react";

// Define course interface / กำหนด interface สำหรับรายวิชา
interface Course {
  id: number;
  name: string;
  grade: string;
  credits: number;
}

// Grade point mapping / การแปลงเกรดเป็นคะแนน
const gradePoints: { [key: string]: number } = {
  'A': 4.0,
  'B+': 3.5,
  'B': 3.0,
  'C+': 2.5,
  'C': 2.0,
  'D+': 1.5,
  'D': 1.0,
  'F': 0.0,
  'W': 0.0
};

// Available grades / เกรดที่สามารถเลือกได้
const availableGrades = ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F', 'W'];

function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseName, setCourseName] = useState<string>("");
  const [selectedGrade, setSelectedGrade] = useState<string>("A");
  const [credits, setCredits] = useState<number>(3);
  const [gpa, setGpa] = useState<number | null>(null);
  const [nextId, setNextId] = useState<number>(1);

  // Add course function / ฟังก์ชันเพิ่มรายวิชา
  const addCourse = () => {
    if (courseName.trim() === "") {
      alert("Please enter course name / กรุณาใส่ชื่อวิชา");
      return;
    }

    const newCourse: Course = {
      id: nextId,
      name: courseName.trim(),
      grade: selectedGrade,
      credits: credits
    };

    setCourses([...courses, newCourse]);
    setCourseName("");
    setSelectedGrade("A");
    setCredits(3);
    setNextId(nextId + 1);
    setGpa(null); // Reset GPA when adding new course / รีเซ็ต GPA เมื่อเพิ่มวิชาใหม่
  };

  // Delete course function / ฟังก์ชันลบรายวิชา
  const deleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
    setGpa(null); // Reset GPA when deleting course / รีเซ็ต GPA เมื่อลบวิชา
  };

  // Calculate GPA function / ฟังก์ชันคำนวณ GPA
  const calculateGPA = () => {
    if (courses.length === 0) {
      alert("No courses to calculate / ไม่มีรายวิชาให้คำนวณ");
      return;
    }

    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      // Only count grades that affect GPA (exclude W) / นับเฉพาะเกรดที่มีผลต่อ GPA (ยกเว้น W)
      if (course.grade !== 'W') {
        totalPoints += gradePoints[course.grade] * course.credits;
        totalCredits += course.credits;
      }
    });

    if (totalCredits === 0) {
      setGpa(0);
    } else {
      const calculatedGPA = totalPoints / totalCredits;
      setGpa(Math.round(calculatedGPA * 100) / 100); // Round to 2 decimal places / ปัดเศษ 2 ตำแหน่ง
    }
  };

  // Get style for course item based on grade / กำหนด style ตามเกรด
  const getCourseStyle = (grade: string) => {
    return {
      padding: "10px",
      margin: "5px 0",
      border: "1px solid #ddd",
      borderRadius: "5px",
      backgroundColor: "#f9f9f9",
      color: grade === 'F' ? 'red' : 'black', // Red color for grade F / สีแดงสำหรับเกรด F
      fontWeight: grade === 'F' ? 'bold' : 'normal'
    };
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>GPA Calculator / เครื่องคำนวณ GPA</h2>
      
      {/* Input Section / ส่วนการป้อนข้อมูล */}
      <div style={{ 
        padding: "20px", 
        border: "2px solid #007bff", 
        borderRadius: "10px", 
        marginBottom: "20px",
        backgroundColor: "#f8f9fa"
      }}>
        <h3>Add Course / เพิ่มรายวิชา</h3>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Course Name / ชื่อวิชา:
          </label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter course name / ใส่ชื่อวิชา"
            style={{ 
              width: "100%", 
              padding: "8px", 
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Grade / เกรด:
          </label>
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "8px", 
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          >
            {availableGrades.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Credits / หน่วยกิต:
          </label>
          <input
            type="number"
            value={credits}
            onChange={(e) => setCredits(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            max="6"
            style={{ 
              width: "100%", 
              padding: "8px", 
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
        </div>

        <button
          onClick={addCourse}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            width: "100%"
          }}
        >
          Add Course / เพิ่มรายวิชา
        </button>
      </div>

      {/* Course List Section / ส่วนรายการวิชา */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Course List / รายการวิชาทั้งหมด ({courses.length} courses / วิชา)</h3>
        
        {courses.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666", fontStyle: "italic" }}>
            No courses added yet / ยังไม่มีรายวิชา
          </p>
        ) : (
          <div>
            {courses.map((course) => (
              <div key={course.id} style={getCourseStyle(course.grade)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong>{course.name}</strong>
                    <br />
                    <span>Grade / เกรด: <strong>{course.grade}</strong></span>
                    <span style={{ marginLeft: "20px" }}>
                      Credits / หน่วยกิต: <strong>{course.credits}</strong>
                    </span>
                    <span style={{ marginLeft: "20px" }}>
                      Points / คะแนน: <strong>{gradePoints[course.grade]}</strong>
                    </span>
                  </div>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer"
                    }}
                  >
                    Delete / ลบ
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GPA Calculation Section / ส่วนคำนวณ GPA */}
      <div style={{ 
        padding: "20px", 
        border: "2px solid #ffc107", 
        borderRadius: "10px",
        backgroundColor: "#fff3cd"
      }}>
        <h3>GPA Calculation / การคำนวณ GPA</h3>
        
        <button
          onClick={calculateGPA}
          disabled={courses.length === 0}
          style={{
            padding: "15px 30px",
            backgroundColor: courses.length === 0 ? "#6c757d" : "#ffc107",
            color: courses.length === 0 ? "#fff" : "#000",
            border: "none",
            borderRadius: "5px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: courses.length === 0 ? "not-allowed" : "pointer",
            width: "100%",
            marginBottom: "15px"
          }}
        >
          Calculate GPA / คำนวณ GPA
        </button>

        {gpa !== null && (
          <div style={{ 
            textAlign: "center", 
            fontSize: "24px", 
            fontWeight: "bold",
            padding: "20px",
            backgroundColor: "#d4edda",
            border: "1px solid #c3e6cb",
            borderRadius: "5px"
          }}>
            <div style={{ color: "#155724" }}>
              Your GPA / เกรดเฉลี่ยของคุณ: <span style={{ fontSize: "30px" }}>{gpa.toFixed(2)}</span>
            </div>
            <div style={{ fontSize: "16px", marginTop: "10px", color: "#155724" }}>
              {gpa >= 3.5 ? "Excellent! / ยอดเยี่ยม!" : 
               gpa >= 3.0 ? "Good! / ดี!" : 
               gpa >= 2.5 ? "Fair / พอใช้" : 
               gpa >= 2.0 ? "Need Improvement / ต้องปรับปรุง" : 
               "Critical / วิกฤต"}
            </div>
          </div>
        )}

        {/* Summary Statistics / สถิติสรุป */}
        {courses.length > 0 && (
          <div style={{ marginTop: "15px", fontSize: "14px", color: "#666" }}>
            <p>Total Courses / รวมจำนวนวิชา: {courses.length}</p>
            <p>Total Credits / รวมหน่วยกิต: {courses.reduce((sum, course) => course.grade !== 'W' ? sum + course.credits : sum, 0)}</p>
            <p>Courses with Grade F / วิชาที่ได้เกรด F: {courses.filter(course => course.grade === 'F').length}</p>
            <p>Withdrawn Courses / วิชาที่ถอน (W): {courses.filter(course => course.grade === 'W').length}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GPACalculator;