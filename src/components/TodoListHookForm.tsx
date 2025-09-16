// TodoListHookForm.tsx - React Hook Form + Zod Implementation
// การใช้งาน React Hook Form + Zod

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type Task = {
    title: string;
    type: string;
    dueDate: string;
};

// Zod schema for validation
const TaskSchema = z.object({
    title: z.string().min(1, "กรุณากรอกชื่องาน / Please enter task title"),
    type: z.string().optional(),
    dueDate: z.string().optional(),
});

type FormData = z.infer<typeof TaskSchema>;

// React Hook Form implementation
export default function TodoHookFormApp() {
    const [tasks, setTasks] = useState<Task[]>([]);
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(TaskSchema),
        defaultValues: {
            title: "",
            type: "",
            dueDate: ""
        }
    });

    const onSubmit = (data: FormData) => {
        const newTask: Task = {
            title: data.title,
            type: data.type || "",
            dueDate: data.dueDate || ""
        };
        setTasks((prev) => [...prev, newTask]);
        reset(); // Reset form after submission
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h1>My To-do List (React Hook Form + Zod) / รายการงาน (React Hook Form + Zod)</h1>

            <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "20px" }}>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="text"
                        {...register("title")}
                        placeholder="งานที่ต้องทำ... / Task to do..."
                        style={{ 
                            width: "100%", 
                            padding: "8px", 
                            marginBottom: "5px",
                            border: errors.title ? "1px solid red" : "1px solid #ccc",
                            borderRadius: "4px"
                        }}
                    />
                    {errors.title && <div style={{ color: "red", fontSize: "14px" }}>{errors.title.message}</div>}
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <select 
                        {...register("type")}
                        style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                    >
                        <option value="">เลือกประเภทงาน / Select task type</option>
                        <option value="เรียน">เรียน / Study</option>
                        <option value="ทำงาน">ทำงาน / Work</option>
                        <option value="บ้าน">งานบ้าน / Home</option>
                        <option value="อื่นๆ">อื่นๆ / Others</option>
                    </select>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <input 
                        type="date" 
                        {...register("dueDate")}
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

            {/* React Hook Form + Zod Features */}
            <div style={{ marginTop: "30px", padding: "15px", backgroundColor: "#d4edda", borderRadius: "4px" }}>
                <h4>✅ React Hook Form + Zod Features Enabled / คุณสมบัติพร้อมใช้แล้ว:</h4>
                <ul>
                    <li>✅ Form validation with Zod schema / ตรวจสอบฟอร์มด้วย Zod</li>
                    <li>✅ React Hook Form integration / การรวม React Hook Form</li>
                    <li>✅ Automatic form reset / รีเซ็ตฟอร์มอัตโนมัติ</li>
                    <li>✅ Type-safe form handling / การจัดการฟอร์มที่ปลอดภัย</li>
                    <li>✅ Bilingual interface / อินเตอร์เฟซสองภาษา</li>
                </ul>
            </div>
        </div>
    );
}