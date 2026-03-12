import { LazyDiv } from "@/component/lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "@/const"
import BusIcon from "@/icons/bus-icon.svg?react"
import CarIcon from "@/icons/car-icon.svg?react"
import { Map } from "@/component/location/map"

export const Location = () => {
  return (
    <>
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <Map />
      </LazyDiv>
      <LazyDiv className="card location">
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">대중교통</div>
          <div />
          <div className="content">
            * 지하철 이용시
            <br />
            지하철 2호선 <b>신촌역 3번출구</b> 나와서
            <br />
            → 연세로 방향으로 직진
            <br />→ 도보로 약 8분 이동
            <br />→ <b>연세대 동문회관</b> 도착
            <br />
            → 건물 안내 표지판 따라 3층 그랜드홀로 이동
          </div>
          <div />
          <div className="content">
            * 버스 이용 시
            <br />
            - 간선(파랑): 153, 163, 171, 172
            <br />
            - 지선(초록): 7017, 7713, 7720
            <br />
            <b>연세대학교 앞</b> 또는 <b>신촌세브란스병원</b> 정류장 하차
            <br />→ 도보로 5분 내외 이동
            <br />
            → 연세대 동문회관 표지판을 따라 오시면 됩니다.
          </div>
        </div>
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">자가용</div>
          <div />
          <div className="content">
            네이버 지도, 카카오 네비, 티맵 등 이용
            <br />
            <b>연세대학교 동문회관</b> 검색
            <br />
            - 예식 참석 차량은 동문회관 주차장 이용 가능합니다.
            <br />
            (주차 후 건물 내부 엘리베이터로 3층 이동)
          </div>
          <div />
          <div className="content">
            <b>
              ※ 예식 당일 주차 공간이 혼잡할 수 있으니
              가급적 대중교통 이용을 권장드립니다.
            </b>
          </div>
        </div>
      </LazyDiv>
    </>
  )
}
