import React from 'react'
import MedalList from './MedalList';

const MedalItem = ({deleteBtn, grades}) => {
  return (
    <div>
        <table>
          <thead>
            <tr>
              <th>국가명</th>
              <th>금메달</th>
              <th>은메달</th>
              <th>동메달</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade, country) => {
              return (
                <MedalList key={country} grade={grade} deleteBtn={deleteBtn} />
              );
            })}
          </tbody>
        </table>
      </div>
  )
}

export default MedalItem