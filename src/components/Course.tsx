// Todolist.tsx 

import { useState } from "react"; 

 

function TodoApp() { 

//    const [task, setTask] = useState<string>("");        // เก็บค่าที่พิมพ์ใน input 
    type Course = {
        subject: string;
        grade: string;
    };
    const [subject, setSubject] = useState<string>("");     
    const [grade, setGrade] = useState<string>("");

    const [courses, setCourses] = useState<Course[]>([]);      // เก็บรายวิชาทั้งหมด
   
    const addCourse = () => { 

        if (subject.trim() === "" return;  || grade.trim() === "")     // กัน input ว่าง 

        setCourse([...courses, {subject,grade}]);                // เพิ่ม task ลงใน array 

        setSubject("");  // เคลียร์ input หลังเพิ่ม 
        setGrade ("");                            

    }; 
  const deleteCourse= (index: number) => { 

  // เก็บรายการที่ index ไม่ตรงกับอันที่ต้องการลบ 

        const newCourses = courses.filter((_, i) => i !== index); 

        setCourses(newCourses); 

    }; 
 

    return ( 

        <div style={{ textAlign: "center", marginTop: "50px" }}> 

            <h1>My Course</h1> 

            <input 

                type="text" 

                value={subject} 

                onChange={(e) => setSubject(e.target.value)} 

                placeholder="รายชื่อวิชา" 

            /> 
            <select name ="grade" value = {grade}  onChange={(e) => setGrade(e.target.value)}  >
            <input 
            <option value ="A">A</option>
            <option value ="B+">B+</option>
            <option value ="B">B</option>
            <option value ="C+">C+</option>
            <option value ="C">C</option>
            <option value ="D+">D+</option>
            <option value ="D">D</option>
            <option value ="F">F</option>
            </select>
            <button onClick={addCourse}>Add</button> 

            <ul style={{ listStyle: "none", padding: 0 }}> 

                {course.map((c, index) => ( 

                    <li key={index} style={{ margin: "5px 0" }}> 

                        {c.subject} - {c.grade} 
                        <button 

                            onClick={() => deleteCourse(index)} 

                            style={{ marginLeft: 10, color: "red" }} 

                        > 

                            ลบ 

                        </button> 
                    </li> 

                ))} 

            </ul> 

        </div> 

    ); 

} 