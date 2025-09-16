# MP Directory Installation Guide
# คำแนะนำการติดตั้ง MP Directory

## Required Dependencies / Dependencies ที่จำเป็น

To enable full React Hook Form + Zod functionality, install these packages:
เพื่อใช้งาน React Hook Form + Zod แบบเต็มรูปแบบ ให้ติดตั้ง packages เหล่านี้:

```bash
npm install react-hook-form @hookform/resolvers zod
```

## Optional: Tailwind CSS (Recommended / แนะนำ)

For complete styling support:
สำหรับการจัดแต่งแบบสมบูรณ์:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then update your App.css to include:
จากนั้นอัปเดต App.css ให้รวม:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Features Included / ฟีเจอร์ที่รวมอยู่

✅ Complete MP Directory with bilingual interface / ทำเนียบสมาชิกสภาผู้แทนราษฎรแบบสองภาษา
✅ React Hook Form + Zod validation / การตรวจสอบข้อมูลด้วย React Hook Form + Zod
✅ CRUD operations (Create, Read, Update, Delete) / การดำเนินการ CRUD
✅ Responsive design with Tailwind CSS / การออกแบบที่ตอบสนองด้วย Tailwind CSS
✅ Photo upload support / รองรับการอัปโหลดรูปภาพ
✅ Ministry and political party management / การจัดการกระทรวงและพรรคการเมือง
✅ Form validation with error messages / การตรวจสอบฟอร์มพร้อมข้อความแสดงข้อผิดพลาด

## Form Fields / ฟิลด์ในฟอร์ม

- คำนำหน้า / Prefix
- ชื่อ / First Name  
- นามสกุล / Last Name
- รูปถ่าย 2 นิ้ว / 2-inch Photo
- ประวัติการทำงาน / Work History
- ผลงานที่ผ่านมา / Past Achievements
- ตำแหน่งรัฐมนตรี / Minister Position
- กระทรวง / Ministry
- สังกัดพรรคการเมือง / Political Party

## Usage / การใช้งาน

1. Click "เพิ่มสมาชิกใหม่ / Add New Member" to add a new MP
2. Fill in the required fields (marked with *)
3. Submit the form to save
4. Use "แก้ไข / Edit" to modify existing members
5. Use "ลบ / Delete" to remove members

Currently using basic implementation without external dependencies.
Uncomment the React Hook Form code after installing dependencies.

ขณะนี้ใช้การดำเนินการพื้นฐานโดยไม่มี dependencies ภายนอก
ให้เอาคอมเมนต์ออกจากโค้ด React Hook Form หลังจากติดตั้ง dependencies แล้ว