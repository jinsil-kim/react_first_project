import { useState } from "react";
import "./App.css";
import MedalItem from "./components/MedalItem";
import MedalForm from "./components/MedalForm";

function App() {
  const local = JSON.parse(localStorage.getItem("grades")) || [];

  const [grades, setGrades] = useState(local);
  const [country, setCountry] = useState("");
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [bronze, setBronze] = useState(0);

  const addBtn = (e) => {
    e.preventDefault(); //기본 새로고침 방지

    //국가 인풋에 아무것도 없으면 알럿창 띄우고 추가 못하게 하기
    if (country === "") {
      alert("국가를 입력해주세요.");
    } else if (grades.find((grade) => grade.country === country)) {
      alert("이미 같은 국가가 있습니다.");
    } else {
      const newGrade = {
        country: country,
        gold: Number(gold),
        silver: Number(silver),
        bronze: Number(bronze),
      };

      //금메달 기준 내림차순으로 정렬
      const sortedGrade = [...grades, newGrade].sort((a, b) => b.gold - a.gold);
      setGrades(sortedGrade);

      localStorage.setItem("grades", JSON.stringify(sortedGrade));

      //입력 후 인풋 필드 초기화
      setCountry("");
      setGold(0);
      setSilver(0);
      setBronze(0);
    }
  };

  const deleteBtn = (country) => {
    const deletedGrade = grades.filter((grade) => {
      return grade.country !== country;
    });
    setGrades(deletedGrade);
    localStorage.setItem("grades", JSON.stringify(deletedGrade));

    alert("삭제되었습니다!");
  };

  const updateBtn = (e) => {
    e.preventDefault();

    //기존 리스트에 없는 나라를 업데이트 할 때 alert!
    const existingCountry = grades.find((grade) => {
      return grade.country === country;
    });

    if (!existingCountry) {
      alert(`${country}이(가) 리스트에 없습니다! 국가를 추가해주세요.`);
      return;
    }

    //리스트에 추가된 나라 메달수 업데이트 로직
    const updatedGrade = grades.map((grade) => {
      if (grade.country === country) {
        return {
          country: country,
          gold: gold,
          silver: silver,
          bronze: bronze,
        };
      } else {
        return grade;
      }
    });

    //금메달 수 기준으로 내림차순
    const sortedGrade = updatedGrade.sort((a, b) => b.gold - a.gold);

    setGrades(sortedGrade);
    localStorage.setItem("grades", JSON.stringify(sortedGrade));

    //인풋 필드 초기화
    setCountry("");
    setGold(0);
    setSilver(0);
    setBronze(0);
  };

  const MedalChangeHandler = (e, medal) => {
    const value = e.target.value;

    //0~99사이의 숫자만 입력할 수 있게 하기
    if (value < 0 || value > 99) {
      alert("0이상 100미만의 숫자만 입력해주세요!");
    } else {
      if (medal === "금메달") setGold(value);
      else if (medal === "은메달") setSilver(value);
      else if (medal === "동메달") setBronze(value);
    }
  };

  return (
    <div className="container">
      <h1>2024 파리 올림픽</h1>
      <MedalForm
        country={country}
        setCountry={setCountry}
        MedalChangeHandler={MedalChangeHandler}
        addBtn={addBtn}
        gold={gold}
        silver={silver}
        bronze={bronze}
        updateBtn={updateBtn}
      />
      <MedalItem grades={grades} deleteBtn={deleteBtn} />
    </div>
  );
}

export default App;
