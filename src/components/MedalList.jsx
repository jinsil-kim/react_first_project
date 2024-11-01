import React from "react";

function MedalList({ grade, deleteBtn }) {
  const { country, gold, silver, bronze } = grade;

  return (
    <tr>
      <td>{country}</td>
      <td>{gold}</td>
      <td>{silver}</td>
      <td>{bronze}</td>
      <td>
        <button className="deleteBotton" onClick={() => deleteBtn(country)}>
          삭제
        </button>
      </td>
    </tr>
  );
}

export default MedalList;
