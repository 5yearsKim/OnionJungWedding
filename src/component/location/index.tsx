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
            - 3호선 남부터미널역 하차 4-1번 출구 바로 앞
          </div>
          <div />
          <div className="content">
            * 버스 이용 시
            <br />
            - 지선버스(G, 초록색) 4319(사당-남부터미널-잠실)
            <br />
            - 간선버스(B, 파랑색) 461(장지동-남부터미널-여의도), 641(문래동-남부터미널-양재동)
            <br />
            - 직행ㆍ공항버스 5300-1 (수원-남부터미널-강남역), 8501(수원대-남부터미널-양재꽃시장)
          </div>
        </div>
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">주차 안내</div>
          <div />
          <div className="content">
            * 맞은편 전용 주차장(주차타워) 이용
            <br />
            - 주소: 서초구 서초중앙로2길 10
          </div>
          <div />
        </div>
      </LazyDiv>
    </>
  )
}
