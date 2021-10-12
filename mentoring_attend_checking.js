// 구글 appscript 입니다.

function onsearch(mentor,mentee,week) {
  console.log(mentor,mentee,week)
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RAW");
  var values = sh.getDataRange().getValues();

  // 먼저 멘토, 주차를 기준으로 행값을 찾음
  var m_row
  //console.log(sh.getLastRow(),typeof sh.getLastRow())
  for(var i=1;i<sh.getLastRow();i++){

    //console.log(values[i][0],values[i][1])
    //console.log(values[i][0] == mentor, values[i][1] == week)

    if(values[i][0] == mentor && values[i][1] == week){
      m_row = i;
      break
    }
  }
  console.log(!m_row)
  if(!m_row){
    return "미제출"
  }


  // 제출 안한경우


  // 고정된 행값에서 멘티가 포함된 열값을 찾음
  // 김용찬, 7주차 
  // 김민주B	2시간	해당없음	2021-06-30 김민주B 없음 결석 2021-07-01	김유빈	2시간	해당없음	2021-07-01
  // const mentee_activates = {
  //   "김민주B": {
  //     hour: ["2시간", "결석"],
  //     date: ["2021-06-30", "2021-0701"],
  //   },
  //   "김유빈": {
  //     hour: ["2시간"],
  //     date: ["2021-07-01"]
  //   }
  // }

  // json 형성
  const mentee_activates = {}

  // 멘티 찾아서 변수 확정
  for(var j=13;j<sh.getLastColumn();j = j+4){
    const mentee_name = values[m_row][j]
    
    if (mentee_name) {      
      // var hour = values[m_row][j+1] == '없음' ? values[m_row][j+2] : values[m_row][j+1]
      // var date = values[m_row][j+3]

      var hour = values[m_row][j+1]
      var info = values[m_row][j+2]
      var date = values[m_row][j+3]
      // 멘티 변수 처음 생성
      if (!mentee_activates[mentee_name]) {
        mentee_activates[mentee_name] = {
          hour: [hour],
          info: [info],
          date: [date]
        }
      } else {
        // 이름이 없는 경우 
        mentee_activates[mentee_name].hour.push(hour)
        mentee_activates[mentee_name].date.push(date)
      }
    }

    console.log(mentee_activates)    
  }

  if (mentee_activates[mentee]) {
    var mentee_info = mentee_activates[mentee]
    //console.log(mentee_info.info.includes('무단결석'))
    console.log(mentee_info)
    if (mentee_info.info.includes('무단결석')) {
      // 한번이라도 무단결석
      return "무단결석"
    } else if(mentee_info.info.includes('결석')){
      // 한번이라도 결석
      return "결석"
    }else if(mentee_info.hour.includes('없음')){
      return "결석"
    }else{
      return "o"
    }
  } else {
    // 아예 참석이력 자체가 없음.
    return "결석"
    }

  // if(values[m_row][j] == mentee){
  //     var value1 = values[m_row][j+1];
  //     var value2 = values[m_row][j+2];

  //     if(value1 == "없음"){
  //       return value2
  //       }else{
  //       return "o"        
  //       }
  //   }

}