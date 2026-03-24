import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ROBO_TWEET_IDS } from '../data/roboTweetIds.js'
import TweetEmbed from './TweetEmbed.jsx'
import 'swiper/css'
import 'swiper/css/navigation'
import './LatestTweetsSection.css'

export default function LatestTweetsSection() {
  const tweetIds = ROBO_TWEET_IDS

  return (
    <section id="notebook-feed" className="dn-tweets section" aria-label="X posts">
      <div className="dn-tweets__head dn-tweets__head--minimal">
        <div className="dn-tweets__head-copy">
          <h2 className="dn-tweets__title">Latest From Robo</h2>
        </div>
        <div className="dn-tweets__nav-group" aria-label="Tweets navigation">
          <button className="dn-tweets__nav dn-tweets__nav--prev" type="button" aria-label="Previous tweets">
            &#8249;
          </button>
          <button className="dn-tweets__nav dn-tweets__nav--next" type="button" aria-label="Next tweets">
            &#8250;
          </button>
        </div>
      </div>

      <div className="dn-tweets__slider-wrap">
        <Swiper
          modules={[Navigation]}
          className="dn-tweets__slider"
          spaceBetween={18}
          slidesPerView={1}
          loop={tweetIds.length > 3}
          allowTouchMove={true}
          simulateTouch={true}
          grabCursor={true}
          touchRatio={1.1}
          touchStartPreventDefault={false}
          touchMoveStopPropagation={false}
          touchEventsTarget="container"
          navigation={{
            prevEl: '.dn-tweets__nav--prev',
            nextEl: '.dn-tweets__nav--next',
          }}
          breakpoints={{
            680: { slidesPerView: 2 },
            1100: { slidesPerView: 3 },
          }}
        >
          {tweetIds.map((id) => (
            <SwiperSlide key={id} className="dn-tweets__slide">
              <div className="dn-tweets__cell">
                <div className="dn-tweets__card">
                  <div className="dn-tweets__card-ornament" aria-hidden="true">
                    <span className="dn-tweets__seal" />
                    <span className="dn-tweets__scratch" />
                  </div>
                  <div className="dn-tweets__card-lines" aria-hidden="true" />
                  <div className="dn-tweets__embed-wrap">
                    <TweetEmbed tweetId={id} />
                  </div>
                  <div className="dn-tweets__card-glow" aria-hidden="true" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
