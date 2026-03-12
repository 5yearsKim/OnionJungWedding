import { BGEffect } from "@/component/bgEffect"
import { Calendar } from "@/component/calendar"
import { Cover } from "@/component/cover"
import { Gallery } from "@/component/gallery"
import { GuestBook } from "@/component/guestbook"
import { Information } from "@/component/information"
import { Invitation } from "@/component/invitation"
import { LazyDiv } from "@/component/lazyDiv"
import { Location } from "@/component/location"
import {CustomLetter} from "@/component/customLetter"
import { STATIC_ONLY } from "@/env"

export function InvitationPage() {
  return (
    <div className="background">
      <BGEffect />
      <div className="card-view">

        <CustomLetter/>

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
          {!STATIC_ONLY && <GuestBook />}
        </LazyDiv>

      </div>
    </div>
  )
}
