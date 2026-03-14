import "./index.scss"

import { BGEffect } from "@/component/bgEffect"
import { Calendar } from "@/component/calendar"
import { Cover } from "@/component/cover"
import { Gallery } from "@/component/gallery"
import { Information } from "@/component/information"
import { Invitation } from "@/component/invitation"
import { LazyDiv } from "@/component/lazyDiv"
import { Location } from "@/component/location"
import {CustomLetter} from "@/component/customLetter"

export function InvitationPage() {
  return (
    <div className="background">
      <BGEffect />

      <CustomLetter/>

      <div className="card-view">
        <LazyDiv className="card-group">
          <Cover />
          <Invitation />
        </LazyDiv>

        <LazyDiv className="card-group">
          <Calendar />
          <Gallery />
        </LazyDiv>

        <LazyDiv className="card-group">
          <Location />
        </LazyDiv>

        <LazyDiv className="card-group">
          <Information />
        </LazyDiv>

      </div>
    </div>
  )
}
