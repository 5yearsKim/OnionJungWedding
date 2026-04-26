import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

export { dayjs }

export const WEDDING_DATE = dayjs.tz("2026-06-21 13:00", "Asia/Seoul")
export const WEDDING_DATE_FORMAT = `YYYY년 MMMM D일 dddd A h시${WEDDING_DATE.minute() === 0 ? "" : " m분"}`

// 예식 당월 휴무일. 켈린더에 표시하기 위함.
// 예: 예식일 8월 -> 8월 15일 광복절
export const HOLIDAYS = [15]

export const LOCATION = "더화이트베일 4층 W홀"
export const LOCATION_ADDRESS = "서울특별시 서초구 서초중앙로 14"

// LOCATION 과 동일하게 설정해도 무방하나, 필요에 따라 좀 더 상세히 작성 가능.
export const SHARE_ADDRESS = LOCATION
export const SHARE_ADDRESS_TITLE = LOCATION

// 네이버 지도에 사용할 좌표. [경도, 위도] 형식.
export const WEDDING_HALL_POSITION = [127.0179285, 37.4835283]

// 네이버 지도의 웨딩홀 장소 ID
// 네이버 지도 웹페이지에서 웨딩홀 검색 후 URL에서 확인 가능.
// 예: https://map.naver.com/p/entry/place/12023277 -> 12023277
export const NMAP_PLACE_ID = 12023277

export const BRIDE_FULLNAME = "유 정"
export const BRIDE_FIRSTNAME = "정"
export const BRIDE_TITLE = "장녀"
export const BRIDE_FATHER = "유호영"
export const BRIDE_MOTHER = "강정임"
export const BRIDE_INFO = [
  {
    relation: "신부",
    name: BRIDE_FULLNAME,
    phone: "010-9765-1222",
    account: "우리은행 1002-457-724976",
  },
  {
    relation: "신부 아버지",
    name: BRIDE_FATHER,
    phone: "010-9647-3835",
    account: "우리은행 304-093899-12-001",
  },
  {
    relation: "신부 어머니",
    name: BRIDE_MOTHER,
    phone: "010-4370-4939",
    account: "우리은행 061-244302-02-001",
  },
]

export const GROOM_FULLNAME = "김현우"
export const GROOM_FIRSTNAME = "현우"
export const GROOM_TITLE = "장남"
export const GROOM_FATHER = "김준현"
export const GROOM_MOTHER = "한정연"
export const GROOM_INFO = [
  {
    relation: "신랑",
    name: GROOM_FULLNAME,
    phone: "010-8637-4010",
    account: "국민은행 094702-04-169896",
  },
  {
    relation: "신랑 아버지",
    name: GROOM_FATHER,
    phone: "010-3228-0724",
    account: "신한은행 324-12-341928",
  },
  {
    relation: "신랑 어머니",
    name: GROOM_MOTHER,
    phone: "010-5243-0724",
    account: "국민은행 094701-04-071204",
  },
]
