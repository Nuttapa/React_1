import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import ButtonAdd from "./components/ButtonAdd";
import HeaderTxt from "./components/HeaderTxt";
import GPACalculator from "./components/GPACalculator";
import MPDirectory from "./components/MPDirectory";


function App() {
  const [number, setNumber] = useState(0);
  const [name, setName] = useState("CSMJU");
  const [message, setMessage] = useState("สอบเสร็จแล้ว สบายใจจัง");
  const status = true;
  const [fontSize, setFontSize] = useState(3);

  const increaseFontSize = () => setFontSize(fontSize + 1);
  const decreaseFontSize = () => setFontSize(fontSize - 1);

  const handleAddNumber = () => setNumber(number + 1);

type Member = {
  nameTH: string;
  nameEN: string;
  heightCm: number;
  age: number;
  imageUrl?: string;
  group: string;
};
  
const List_MEMBERS: Member[] = [
  { nameTH: "อลัน พศวีร์ ศรีอรุโณทัย", nameEN: "Alan", heightCm: 185, age: 23, imageUrl: "https://s359.thaicdn.net/pagebuilder/5d4b328a-9665-4448-9cc7-a6e037a40b08.jpg", group: "BUS" },
  { nameTH: "มาร์ค กฤษณ์ กัญจนาทิพย์", nameEN: "Marckris", heightCm: 172, age: 22, imageUrl: "https://s359.kapook.com/rq/600/auto/10/pagebuilder/05f7d2eb-f614-40fa-b8a9-fb7d03826327.jpg", group: "BUS" },
  { nameTH: "ขุนพล ปองพล ปัญญามิตร", nameEN: "Khunpol", heightCm: 179, age: 22, imageUrl: "https://s359.kapook.com/rq/600/auto/50/pagebuilder/5c8b7c54-2b7a-4f36-b414-d55883b572dc.jpg", group: "BUS" },
  { nameTH: "ฮาร์ท ชุติวัฒน์ จันเคน", nameEN: "Heart", heightCm: 174, age: 22, imageUrl: "https://s359.kapook.com/rq/600/auto/50/pagebuilder/73cb6f1d-a112-462f-87ee-9b544f59540a.jpg", group: "BUS" },
  { nameTH: "จินวุค คิม", nameEN: "Jinwook", heightCm: 178, age: 21, imageUrl: "https://s359.kapook.com/rq/600/auto/50/pagebuilder/c550699d-d164-46ff-999f-d3733321ef38.jpg", group: "BUS" },
  { nameTH: "ไทย ชญานนท์ ภาคฐิน", nameEN: "Thai", heightCm: 178, age: 20, imageUrl: "https://s359.kapook.com/rq/600/auto/50/pagebuilder/8733244c-13ee-4969-9158-c9b9be36ee41.jpg", group: "BUS" },
  { nameTH: "เน็กซ์ ณัฐกิตติ์ แช่มดารา", nameEN: "Nex", heightCm: 180, age: 20, imageUrl: "https://s359.kapook.com/rq/600/auto/50/pagebuilder/83d44e85-a7f9-4fcb-925d-73a603f49e87.jpg", group: "BUS" },
  { nameTH: "ภู ธัชชัย ลิ้มปัญญากุล", nameEN: "Phu", heightCm: 180, age: 20, imageUrl: "https://s359.kapook.com/rq/600/auto/50/pagebuilder/9d8795e0-702d-4f56-9aa0-c358c680f3c1.jpg", group: "BUS" },
  { nameTH: "คอปเปอร์ เดชาวัต พรเดชาพิพัฒ", nameEN: "Copper", heightCm: 173, age: 19, imageUrl: "https://s359.kapook.com/rq/600/auto/50/pagebuilder/9f5cd847-bfb0-41cc-9f04-eceba98916e8.jpg", group: "BUS" },
  { nameTH: "เอเอ อชิรกรณ์ สุวิทยะเสถียร", nameEN: "AA", heightCm: 178, age: 19, imageUrl: "https://s359.kapook.com/rq/600/auto/50/pagebuilder/26eb6b87-7897-432d-a5fe-33cc1c357d23.jpg", group: "BUS" },
  { nameTH: "จั๋ง ธีร์ บุญเสริมสุวงศ์", nameEN: "Jungt", heightCm: 173, age: 19, imageUrl: "https://s359.kapook.com/rq/600/auto/50/pagebuilder/ea2a13c7-8a01-4859-8600-88e9931c1112.jpg", group: "BUS" },
  { nameTH: "ภีม วสุพล พรพนานุรักษ์", nameEN: "Peem", heightCm: 187, age: 19, imageUrl: "https://s359.kapook.com/rq/600/auto/50/pagebuilder/e33ea513-bd5f-479f-a1f6-056d225d8323.jpg", group: "BUS" }
];
 
/* +Saja Boys 5 คน
const List_MEMBERS: Member[] = [ 

{nameEN: "Jinu", heightCm: 183, age: 20
imageUrl: "https://hallyu.idolinsights.com/wp-content/uploads/2025/07/jinu-member-of-saja-boys-from-kpop-demon-hunters.webp", group:"Saja Boys" }, 

{nameEN: "Abby", heightCm:180 , age:  23
imageUrl: "https://hallyu.idolinsights.com/wp-content/uploads/2025/07/abby-member-of-saja-boys-from-kpop-demon-hunters.webp" group:"Saja Boys"}, 

{nameEN: "Mystery", heightCm:178  , age: 22
imageUrl: "https://hallyu.idolinsights.com/wp-content/uploads/2025/07/mystery-member-of-saja-boys-from-kpop-demon-hunters.webp"group:"Saja Boys" }, 

{nameEN: "Romance", heightCm: 175, age: 21
imageUrl: "https://hallyu.idolinsights.com/wp-content/uploads/2025/07/romance-member-of-saja-boys-from-kpop-demon-hunters.webp" group:"Saja Boys" }, 

{nameEN: "Baby", heightCm:173 , age: 20
imageUrl: "https://hallyu.idolinsights.com/wp-content/uploads/2025/07/baby-member-of-saja-boys-from-kpop-demon-hunters.webp" group:"Saja Boys" }, 

]; */

  return (
    <>    
      {/* MP Directory Component / คอมโพเนนต์ทำเนียบสมาชิกสภาผู้แทนราษฎร */}
      <MPDirectory />

      {/* GPA Calculator Component / คอมโพเนนต์คำนวณ GPA */}
      <GPACalculator />

      {/* Original Content / เนื้อหาเดิม */}
      {/* //แยกไปเป็น Component
    // Prop = BUS_MEMBER, "ชื่อวง"
    // ให้ Component แสดงผลเฉพาะสมาชิกในวงที่ระบุ
    <MemberList members ={LIST_MEMBERS} groupName*/}
    <ul>
      {List_MEMBERS.map((member, index) => (
        // ถ้าเป็นวง BUS ใช้ตัวอักษรสีเขียว
        // ถ้าเป็นวง Saja Boys ใช้ตัวอักษรสีฟ้า
        <li key={index}
        className = {member.group === "BUS" ? "green-txt" : "red-txt"}>
          {member.nameTH} ({member.nameEN})
          <img src = {member.imageUrl} alt={`${member.nameEN} profile picture`}/>
        </li>  
    ))} 

    </ul>
      

      <div>

        <HeaderTxt name={name} fontSize={fontSize} status={status} />
        <HeaderTxt title="Computer Science" txtsize="100" status={false} />
        <HeaderTxt title="Header Maejo University" txtsize="50" status={true} />
        <HeaderTxt title="Header Maejo University" txtsize="20" status={false} />
        <HeaderTxt title="Header Maejo University" txtsize="20" status={true} />
        <HeaderTxt title="Header Maejo University" txtsize="20" status={false} />
        <HeaderTxt title="Header Maejo University" txtsize="20" status={true} />
        <HeaderTxt title="Header Maejo University" txtsize="20" status={false} />


        <h2>{message}</h2>

        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>
      <div className="card">
        <ButtonAdd onAdd={handleAddNumber} />
        <h2>จำนวน: {number}</h2>

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={increaseFontSize}>เพิ่มขนาดตัวอักษร</button>
        <button onClick={decreaseFontSize} style={{ marginLeft: "10px" }}>
          ลดขนาดตัวอักษร
        </button>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;