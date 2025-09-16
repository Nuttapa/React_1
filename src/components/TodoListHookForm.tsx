// TodoListHookForm.tsx - React Hook Form Example (Commented - requires installation)
// ตัวอย่าง React Hook Form (คอมเมนต์ - ต้องติดตั้ง)

import { useState } from "react";
// import { useForm } from "react-hook-form"; // Requires: npm install react-hook-form
// import { zodResolver } from "@hookform/resolvers/zod"; // Requires: npm install @hookform/resolvers
// import { z } from "zod"; // Requires: npm install zod

type Task = {
    title: string;
    type: string;
    dueDate: string;
};

// Commented out Zod schema - requires installation
// const TaskSchema = z.object({
//     title: z.string().min(1, "กรุณากรอกชื่องาน"),
//     type: z.string().optional(),
//     dueDate: z.string().optional(),
// });

// Basic version without React Hook Form for now
// เวอร์ชั่นพื้นฐานโดยไม่ใช้ React Hook Form ก่อน
export default function TodoHookFormApp() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [dueDate, setDueDate] = useState<string>("");
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};
        if (!title.trim()) newErrors.title = "กรุณากรอกชื่องาน";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const newTask: Task = { title, type, dueDate };
        setTasks((prev) => [...prev, newTask]);
        
        // Reset form / รีเซ็ตฟอร์ม
        setTitle("");
        setType("");
        setDueDate("");
        setErrors({});
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h1>My To-do List (Basic Version) / รายการงาน (เวอร์ชั่นพื้นฐาน)</h1>

            <form onSubmit={onAdd} style={{ marginBottom: "20px" }}>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="งานที่ต้องทำ..."
                        style={{ 
                            width: "100%", 
                            padding: "8px", 
                            marginBottom: "5px",
                            border: errors.title ? "1px solid red" : "1px solid #ccc",
                            borderRadius: "4px"
                        }}
                    />
                    {errors.title && <div style={{ color: "red", fontSize: "14px" }}>{errors.title}</div>}
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <select 
                        value={type} 
                        onChange={(e) => setType(e.target.value)}
                        style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                    >
                        <option value="">เลือกประเภทงาน</option>
                        <option value="เรียน">เรียน</option>
                        <option value="ทำงาน">ทำงาน</option>
                        <option value="บ้าน">งานบ้าน</option>
                        <option value="อื่นๆ">อื่นๆ</option>
                    </select>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <input 
                        type="date" 
                        value={dueDate} 
                        onChange={(e) => setDueDate(e.target.value)}
                        style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                    />
                </div>

                <button 
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "16px",
                        cursor: "pointer"
                    }}
                >
                    Add Task / เพิ่มงาน
                </button>
            </form>

            <div>
                <h3>Tasks / รายการงาน ({tasks.length})</h3>
                {tasks.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#666", fontStyle: "italic" }}>
                        No tasks yet / ยังไม่มีงาน
                    </p>
                ) : (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {tasks.map((t, idx) => (
                            <li 
                                key={idx} 
                                style={{ 
                                    padding: "10px", 
                                    marginBottom: "5px", 
                                    backgroundColor: "#f8f9fa", 
                                    border: "1px solid #dee2e6", 
                                    borderRadius: "4px" 
                                }}
                            >
                                <strong>{t.title}</strong>
                                {t.type && <span style={{ marginLeft: "10px", color: "#6c757d" }}>| ประเภท: {t.type}</span>}
                                {t.dueDate && <span style={{ marginLeft: "10px", color: "#6c757d" }}>| ส่ง: {t.dueDate}</span>}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Instructions for React Hook Form */}
            <div style={{ marginTop: "30px", padding: "15px", backgroundColor: "#e9ecef", borderRadius: "4px" }}>
                <h4>คำแนะนำการใช้ React Hook Form:</h4>
                <p>To enable React Hook Form features, install dependencies:</p>
                <code style={{ display: "block", padding: "5px", backgroundColor: "white", marginTop: "5px" }}>
                    npm install react-hook-form @hookform/resolvers zod
                </code>
            </div>
        </div>
    );
}