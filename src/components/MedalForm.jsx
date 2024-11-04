// 1. 함수를 만든다
function MedalForm({
  country,
  setCountry,
  MedalChangeHandler,
  addBtn,
  gold,
  silver,
  bronze,
  updateBtn,
}) {

  // 구조 분해 할당
  // const { country, setCountry, MedalChangeHandler, addBtn, gold, silver, bronze } = props;

  const inputMedalNames = ["금메달", "은메달", "동메달"];
  // 2. UI 복붙
  return (
    <form>
      <div>
        <label htmlFor="nation">국가명</label>
        <input
          type="text"
          placeholder="국가 입력"
          id="nation"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div className="medal-divs">
        {inputMedalNames.map((medal) => {
          return (
            <div className="medal-labels" key={Math.random()}>
               {/*메달 인풋값에 숫자 입력할때 0이 사라지는 매직 Math.random() */}
              <label htmlFor="medal">{medal}</label>
              <input
                type="number"
                id="medal"
                value={
                  medal === "금메달"
                    ? gold
                    : medal === "은메달"
                    ? silver
                    : bronze
                } // 메달별 상태값을 바인딩 해 addBtn을 누르면 setGold(0)setSilver(0) setBronze(0)으로 각각 메달수 초기화 됨
                onChange={(e) => MedalChangeHandler(e, medal)}
              />
            </div>
          );
        })}
      </div>
      <div className="btns">
        <button type="submit" onClick={addBtn}>국가 추가</button>
        <button type="submit" onClick={updateBtn}>업데이트</button>
      </div>
    </form>
  );
}

export default MedalForm;
