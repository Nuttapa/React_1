// Course.tsx - Course Management Component / คอมโพเนนต์จัดการรายวิชา

import { useState } from "react";

type Course = {
    subject: string;
    grade: string;
};

function CourseApp() {
    const [subject, setSubject] = useState<string>("");
    const [grade, setGrade] = useState<string>("A");
    const [courses, setCourses] = useState<Course[]>([]); // เก็บรายวิชาทั้งหมด

    const addCourse = () => {
        if (subject.trim() === "" || grade.trim() === "") return; // กัน input ว่าง
        
        setCourses([...courses, { subject, grade }]); // เพิ่ม course ลงใน array
        setSubject(""); // เคลียร์ input หลังเพิ่ม
        setGrade("A");
    };

    const deleteCourse = (index: number) => {
        // เก็บรายการที่ index ไม่ตรงกับอันที่ต้องการลบ
        const newCourses = courses.filter((_, i) => i !== index);
        setCourses(newCourses);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>My Course / รายวิชาของฉัน</h1>

            <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="รายชื่อวิชา"
                style={{ marginRight: "10px", padding: "5px" }}
            />
            
            <select 
                name="grade" 
                value={grade} 
                onChange={(e) => setGrade(e.target.value)}
                style={{ marginRight: "10px", padding: "5px" }}
            >
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="D+">D+</option>
                <option value="D">D</option>
                <option value="F">F</option>
            </select>
            
            <button onClick={addCourse} style={{ padding: "5px 15px" }}>
                Add / เพิ่ม
            </button>

            <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
                {courses.map((c, index) => (
                    <li 
                        key={index} 
                        style={{ 
                            margin: "5px 0", 
                            padding: "10px",
                            backgroundColor: "#f0f0f0",
                            borderRadius: "5px",
                            color: c.grade === "F" ? "red" : "black",
                            fontWeight: c.grade === "F" ? "bold" : "normal"
                        }}
                    >
                        {c.subject} - เกรด: {c.grade}
                        <button
                            onClick={() => deleteCourse(index)}
                            style={{ marginLeft: "10px", color: "red", padding: "2px 8px" }}
                        >
                            ลบ
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CourseApp;