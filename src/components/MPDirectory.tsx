// MPDirectory.tsx - Member of Parliament Directory / ทำเนียบสมาชิกสภาผู้แทนราษฎร
// Parliamentary Member Directory with Tailwind CSS styling
// ทำเนียบสมาชิกสภาผู้แทนราษฎรพร้อม Tailwind CSS

import { useState } from "react";

interface MP {
  id: number;
  prefix: string;
  firstName: string;
  lastName: string;
  photo?: string;
  workHistory: string;
  achievements: string;
  ministerPosition?: string;
  ministry?: string;
  politicalParty: string;
}

const prefixOptions = [
  { value: "นาย", label: "นาย / Mr." },
  { value: "นาง", label: "นาง / Mrs." },
  { value: "นางสาว", label: "นางสาว / Ms." },
  { value: "ดร.", label: "ดร. / Dr." },
  { value: "ศ.ดร.", label: "ศ.ดร. / Prof. Dr." },
  { value: "รศ.ดร.", label: "รศ.ดร. / Assoc. Prof. Dr." }
];

const ministryOptions = [
  "กระทรวงมหาดไทย / Ministry of Interior",
  "กระทรวงการคลัง / Ministry of Finance", 
  "กระทรวงศึกษาธิการ / Ministry of Education",
  "กระทรวงสาธารณสุข / Ministry of Public Health",
  "กระทรวงยุติธรรม / Ministry of Justice",
  "กระทรวงกลาโหม / Ministry of Defense",
  "กระทรวงการต่างประเทศ / Ministry of Foreign Affairs",
  "กระทรวงพาณิชย์ / Ministry of Commerce",
  "กระทรวงอุตสาหกรรม / Ministry of Industry"
];

export default function MPDirectory() {
  const [members, setMembers] = useState<MP[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Form state management (basic implementation)
  const [formData, setFormData] = useState<Omit<MP, 'id'>>({
    prefix: "",
    firstName: "",
    lastName: "",
    photo: "",
    workHistory: "",
    achievements: "",
    ministerPosition: "",
    ministry: "",
    politicalParty: ""
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [nextId, setNextId] = useState(1);

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.prefix) newErrors.prefix = "กรุณาเลือกคำนำหน้า / Please select prefix";
    if (formData.firstName.length < 2) newErrors.firstName = "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร / First name must be at least 2 characters";
    if (formData.lastName.length < 2) newErrors.lastName = "นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร / Last name must be at least 2 characters";
    if (formData.workHistory.length < 10) newErrors.workHistory = "ประวัติการทำงานต้องมีอย่างน้อย 10 ตัวอักษร / Work history must be at least 10 characters";
    if (formData.achievements.length < 10) newErrors.achievements = "ผลงานต้องมีอย่างน้อย 10 ตัวอักษร / Achievements must be at least 10 characters";
    if (!formData.politicalParty) newErrors.politicalParty = "กรุณาระบุพรรคการเมือง / Please specify political party";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingId) {
      // Edit existing member
      setMembers(members.map(member => 
        member.id === editingId ? { ...formData, id: editingId } : member
      ));
      setEditingId(null);
    } else {
      // Add new member
      setMembers([...members, { ...formData, id: nextId }]);
      setNextId(nextId + 1);
    }
    
    resetForm();
    setShowForm(false);
  };

  const resetForm = () => {
    setFormData({
      prefix: "",
      firstName: "",
      lastName: "",
      photo: "",
      workHistory: "",
      achievements: "",
      ministerPosition: "",
      ministry: "",
      politicalParty: ""
    });
    setErrors({});
  };

  const handleEdit = (member: MP) => {
    setFormData({
      prefix: member.prefix,
      firstName: member.firstName,
      lastName: member.lastName,
      photo: member.photo || "",
      workHistory: member.workHistory,
      achievements: member.achievements,
      ministerPosition: member.ministerPosition || "",
      ministry: member.ministry || "",
      politicalParty: member.politicalParty
    });
    setEditingId(member.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบสมาชิกคนนี้? / Are you sure you want to delete this member?")) {
      setMembers(members.filter(member => member.id !== id));
    }
  };

  const handleInputChange = (field: keyof MP, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ทำเนียบสมาชิกสภาผู้แทนราษฎร
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            Member of Parliament Directory
          </h2>
          <p className="text-gray-600 mt-2">
            ระบบจัดการข้อมูลสมาชิกสภาผู้แทนราษฎร / MP Information Management System
          </p>
        </div>

        {/* Add Member Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => {
              resetForm();
              setEditingId(null);
              setShowForm(!showForm);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-200 transform hover:scale-105"
          >
            {showForm ? "ยกเลิก / Cancel" : "เพิ่มสมาชิกใหม่ / Add New Member"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {editingId ? "แก้ไขข้อมูลสมาชิก / Edit Member" : "เพิ่มสมาชิกใหม่ / Add New Member"}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Prefix, First Name, Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    คำนำหน้า / Prefix *
                  </label>
                  <select
                    value={formData.prefix}
                    onChange={(e) => handleInputChange('prefix', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.prefix ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">เลือกคำนำหน้า / Select Prefix</option>
                    {prefixOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.prefix && <p className="text-red-500 text-sm mt-1">{errors.prefix}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ชื่อ / First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="ใส่ชื่อ / Enter first name"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    นามสกุล / Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="ใส่นามสกุล / Enter last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Row 2: Photo URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  รูปถ่าย 2 นิ้ว (URL) / 2-inch Photo (URL)
                </label>
                <input
                  type="url"
                  value={formData.photo}
                  onChange={(e) => handleInputChange('photo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              {/* Row 3: Work History */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ประวัติการทำงาน / Work History *
                </label>
                <textarea
                  value={formData.workHistory}
                  onChange={(e) => handleInputChange('workHistory', e.target.value)}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.workHistory ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="ระบุประวัติการทำงาน / Enter work history"
                />
                {errors.workHistory && <p className="text-red-500 text-sm mt-1">{errors.workHistory}</p>}
              </div>

              {/* Row 4: Achievements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ผลงานที่ผ่านมา / Past Achievements *
                </label>
                <textarea
                  value={formData.achievements}
                  onChange={(e) => handleInputChange('achievements', e.target.value)}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.achievements ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="ระบุผลงานที่ผ่านมา / Enter past achievements"
                />
                {errors.achievements && <p className="text-red-500 text-sm mt-1">{errors.achievements}</p>}
              </div>

              {/* Row 5: Minister Position & Ministry */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ตำแหน่งรัฐมนตรี / Minister Position
                  </label>
                  <input
                    type="text"
                    value={formData.ministerPosition}
                    onChange={(e) => handleInputChange('ministerPosition', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="เช่น รัฐมนตรีว่าการ / e.g., Minister"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    กระทรวง / Ministry
                  </label>
                  <select
                    value={formData.ministry}
                    onChange={(e) => handleInputChange('ministry', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">เลือกกระทรวง / Select Ministry</option>
                    {ministryOptions.map(ministry => (
                      <option key={ministry} value={ministry}>
                        {ministry}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 6: Political Party */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  สังกัดพรรคการเมือง / Political Party *
                </label>
                <input
                  type="text"
                  value={formData.politicalParty}
                  onChange={(e) => handleInputChange('politicalParty', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.politicalParty ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="ใส่ชื่อพรรคการเมือง / Enter political party name"
                />
                {errors.politicalParty && <p className="text-red-500 text-sm mt-1">{errors.politicalParty}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-200 transform hover:scale-105"
                >
                  {editingId ? "อัปเดตข้อมูล / Update" : "บันทึกข้อมูล / Save"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Members List */}
        <div className="bg-white rounded-lg shadow-xl p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            รายชื่อสมาชิกทั้งหมด / All Members ({members.length} คน / members)
          </h3>
          
          {members.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <p className="text-gray-500 text-lg">
                ยังไม่มีข้อมูลสมาชิก / No members yet
              </p>
              <p className="text-gray-400">
                เริ่มต้นด้วยการเพิ่มสมาชิกคนแรก / Start by adding the first member
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-200 transform hover:scale-105"
                >
                  {/* Photo */}
                  <div className="flex justify-center mb-4">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={`${member.firstName} ${member.lastName}`}
                        className="w-24 h-32 object-cover rounded-lg border-4 border-white shadow-md"
                      />
                    ) : (
                      <div className="w-24 h-32 bg-gray-300 rounded-lg border-4 border-white shadow-md flex items-center justify-center">
                        <span className="text-gray-500 text-2xl">👤</span>
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div className="text-center mb-4">
                    <h4 className="text-xl font-bold text-gray-800">
                      {member.prefix} {member.firstName} {member.lastName}
                    </h4>
                    {member.ministerPosition && (
                      <p className="text-red-600 font-semibold">
                        {member.ministerPosition}
                      </p>
                    )}
                    {member.ministry && (
                      <p className="text-blue-600 text-sm">
                        {member.ministry}
                      </p>
                    )}
                    <p className="text-purple-600 font-medium mt-1">
                      {member.politicalParty}
                    </p>
                  </div>

                  {/* Work History & Achievements */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <h5 className="font-semibold text-gray-700 text-sm mb-1">
                        ประวัติการทำงาน / Work History:
                      </h5>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {member.workHistory}
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-700 text-sm mb-1">
                        ผลงาน / Achievements:
                      </h5>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {member.achievements}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                    >
                      แก้ไข / Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                    >
                      ลบ / Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}