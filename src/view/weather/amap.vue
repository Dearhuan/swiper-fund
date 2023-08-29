<template>
  <TimeLine v-if="monthList.length > 0 && showMonthList && !source" :time-line-list="monthList" @myClick="onClickMonth">
    <template #back>
      <BackToBtn @myClick="handleBack(0)" />
    </template>
  </TimeLine>
  <TimeLine v-if="dayList.length > 0 && !showMonthList && !isShowCard && !source" :time-line-list="dayList"
    @myClick="onClickDay">
    <template #back>
      <BackToBtn @myClick="handleBack(-1)" />
    </template>
  </TimeLine>
  <div id="city-list" v-show="isShowCard && !showMonthList">
    <div class="city-item fade-lt" :style="{ animationDelay: `${i / (cityList.length * 5)}s` }"
      v-for="(city, i) in cityList" :key="i" @click="openCityInfo(city)">
      <div>{{ city.name }}</div>
      <div>{{ city.date }}</div>
    </div>
    <BackToBtn @myClick="handleBack(-2)" />
  </div>
  <div id="card" class="fade-rt" v-if="!isShowCard && !showMonthList && source">
    <div class="search-box">
      <svg t="1692759551492" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="4171" width="16" height="16">
        <path
          d="M704 627.2h-40.8l-14.4-14.4c50.4-58.4 80-133.6 80-216C728.8 212.8 580 64 396 64S64.8 213.6 64.8 396.8s148.8 332.8 332.8 332.8c82.4 0 158.4-30.4 216-80l14.4 14.4v40l256 255.2 76-76c-0.8 0-256-256-256-256z m-307.2 0c-127.2 0-230.4-103.2-230.4-230.4s103.2-230.4 230.4-230.4 230.4 103.2 230.4 230.4-103.2 230.4-230.4 230.4z"
          p-id="4172"></path>
      </svg>
      <input type="text" placeholder="Search Location">
    </div>
    <div class="today-base">
      <div class="base-location">
        <svg t="1692759754982" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="13356" width="20" height="20">
          <path d="M512 427.023m-90 0a90 90 0 1 0 180 0 90 90 0 1 0-180 0Z" fill="" p-id="13357"></path>
          <path
            d="M512 910.402c-19.14 0-37.482-5.854-53.042-16.929-14.063-10.01-24.926-23.596-31.589-39.46L255.043 585.177l-0.154-0.25C225.522 537.209 210 482.605 210 427.021c0-80.667 31.414-156.506 88.454-213.546S431.333 125.021 512 125.021s156.506 31.414 213.546 88.454C782.587 270.515 814 346.354 814 427.021c0 55.849-15.655 110.671-45.274 158.539l-0.264 0.419-172.081 268.716c-6.755 15.726-17.66 29.176-31.704 39.055-15.485 10.895-33.7 16.652-52.677 16.652zM309.246 551.141l175.494 273.78 1.194 3.197c4.149 11.107 14.381 18.284 26.066 18.284 11.584 0 21.791-7.071 26.004-18.015l1.165-3.028L714.43 551.678C737.701 513.983 750 470.884 750 427.021c0-63.572-24.756-123.339-69.709-168.292-44.952-44.951-104.719-69.708-168.291-69.708s-123.339 24.756-168.292 69.708S274 363.449 274 427.021c0 43.64 12.186 86.552 35.246 124.12z"
            fill="" p-id="13358"></path>
        </svg>
        <span>{{ source.base.city }}</span>
      </div>
      <div class="base-time">{{ source.base.reporttime }}</div>
      <div class="base-temp">
        <div v-html="handleWeatherType2Svg(source.base.weather, 50)"></div>
        <span style="margin-left: 10px;">{{ source.base.temperature }}℃</span>
      </div>
      <div class="base-more">
        <div>{{ `${source.forecasts[0].daytemp}℃/${source.forecasts[0].nighttemp}℃ ${source.base.humidity}%
                  ${source.base.winddirection}风 ${source.base.windpower}` }}</div>
        <div>{{ source.base.weather }}</div>
      </div>
    </div>
    <CityMap :city="showCityName.split('市')[0]"/>
    <div class="today-detail-box">
      <div class="today-detail-title">Today Details</div>
      <div class="today-details">
        <div class="detail-item">
          <svg t="1692760252462" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="22655" width="32" height="32">
            <path
              d="M512 1024C299.9296 1024 128 863.5392 128 665.6c0-131.9424 128-353.792 384-665.6 256 311.808 384 533.6576 384 665.6 0 197.9392-171.9296 358.4-384 358.4z m-301.7216-358.4c0 155.5456 135.0656 281.6 301.7216 281.6 15.1552 0 27.4432-11.4688 27.4432-25.6s-12.288-25.6-27.4432-25.6c-136.3456 0-246.8352-103.168-246.8352-230.4a25.344 25.344 0 0 0-13.7216-22.1696 29.1328 29.1328 0 0 0-27.4432 0 25.344 25.344 0 0 0-13.7216 22.1696z"
              fill="#14a7ec" p-id="22656"></path>
          </svg>
          <div class="detail-desc">
            <div class="first-desc">{{ `${source.base.humidity}%` }}</div>
            <div class="second-desc">今日湿度</div>
          </div>
        </div>
        <div class="detail-item">
          <svg t="1692846337591" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="2525" width="32" height="32">
            <path
              d="M707.6864 228.7104a48.5376 48.5376 0 0 1-48.896-48.9472V48.9472c0-27.3408 21.6064-48.9472 48.896-48.9472 27.3408 0 48.9472 21.6064 48.9472 48.9472V179.712a48.5376 48.5376 0 0 1-48.9472 48.9472zM282.1632 228.7104a48.5376 48.5376 0 0 1-48.896-48.9472V48.9472c0-27.3408 21.6064-48.9472 48.896-48.9472 27.2896 0 48.9472 21.6064 48.9472 48.9472V179.712a48.5376 48.5376 0 0 1-48.9472 48.9472z"
              fill="#14a7ec" p-id="2526"></path>
            <path
              d="M59.1872 203.6736a124.3136 124.3136 0 0 1 124.0064-124.0064h18.176v98.9696c0 45.5168 36.4032 81.92 81.92 81.92 45.568 0 81.92-36.4032 81.92-81.92V79.6672h260.608v98.9696c0 45.5168 36.352 81.92 81.92 81.92 45.4656 0 81.92-36.4032 81.92-81.92V79.6672h18.176A124.3136 124.3136 0 0 1 931.84 203.6736v696.32c0 68.2496-55.7568 122.88-124.0064 122.88H476.672h-4.5568c-153.6 0-399.36-43.264-412.9792-249.1904V203.6224z m257.1264 730.4192c-6.8608-6.8096-20.48-32.9728-23.9104-37.5296-25.0368-44.3904-34.1504-94.4128-27.2896-150.1696l-128.5632 36.352c6.8096 62.6176 100.096 137.728 179.712 151.3472zM133.12 706.56l171.8272-48.9472a38.6048 38.6048 0 0 1 36.352 9.1136c9.1136 10.24 12.544 23.9104 9.1136 36.4032-19.3024 61.44-15.872 112.64 6.8608 154.7776 36.352 81.92 97.792 90.9824 119.4496 90.9824h331.1104a48.5376 48.5376 0 0 0 48.896-48.896V381.1328H133.12V706.56z"
              fill="#14a7ec" p-id="2527"></path>
          </svg>
          <div class="detail-desc">
            <div class="first-desc">{{ handleWeekNum2Text(source.forecasts[0].week) }}</div>
            <div class="second-desc">今日星期</div>
          </div>
        </div>
        <div class="detail-item">
          <svg t="1692846497502" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="3754" width="32" height="32">
            <path
              d="M34.382267 634.56594a34.381275 34.381275 0 1 0 34.381275 34.381275 34.381275 34.381275 0 0 0-34.381275-34.381275zM34.382267 454.725424a34.381275 34.381275 0 1 0 34.381275 34.381275 34.381275 34.381275 0 0 0-34.381275-34.381275zM171.742073 343.647458H376.872662A171.741082 171.741082 0 1 0 198.354503 170.25343v0.826473a34.381275 34.381275 0 0 0 68.597256 0 103.143826 103.143826 0 1 1 102.978531 103.143826h-198.353511a34.381275 34.381275 0 0 0 0 68.76255zM34.382267 274.884907a34.381275 34.381275 0 1 0 34.381275 34.381275 34.381275 34.381275 0 0 0-34.381275-34.381275zM649.443445 634.896529h-477.701372a34.381275 34.381275 0 0 0 0 68.762551h467.453108a125.954479 125.954479 0 1 1-125.95448 125.954479 34.381275 34.381275 0 0 0-68.597256 0v0.991768A194.71703 194.71703 0 1 0 649.60874 634.731235z"
              fill="#14a7ec" p-id="3755"></path>
            <path
              d="M794.902687 66.117837a229.098305 229.098305 0 0 0-226.949476 198.353511 31.240678 31.240678 0 0 0-0.991767 7.768846v0.991767a34.381275 34.381275 0 0 0 68.597256 0 160.335755 160.335755 0 1 1 158.848103 181.824052H171.742073a34.381275 34.381275 0 0 0 0 68.76255h624.317676A229.098305 229.098305 0 0 0 794.902687 66.117837z"
              fill="#14a7ec" p-id="3756"></path>
          </svg>
          <div class="detail-desc">
            <div class="first-desc">{{ source.forecasts[0].daywind }}</div>
            <div class="second-desc">日间风向</div>
          </div>
        </div>
        <div class="detail-item">
          <svg t="1692778323406" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="25303" width="32" height="32">
            <path
              d="M734.506667 516.906667H170.666667v-42.666667h563.84a97.28 97.28 0 0 0 0-194.346667v-42.666666a139.946667 139.946667 0 0 1 0 279.68z"
              fill="#14a7ec" p-id="25304"></path>
            <path
              d="M517.76 332.586667H170.666667v-42.666667h347.093333a51.626667 51.626667 0 1 0 0-103.04v-42.666667a94.293333 94.293333 0 1 1 0 188.373334z"
              fill="#14a7ec" p-id="25305"></path>
            <path
              d="M595.413333 879.786667v-42.666667a67.84 67.84 0 0 0 0-135.68H170.666667v-42.666667h424.746666a110.506667 110.506667 0 1 1 0 221.013334z"
              fill="#14a7ec" p-id="25306"></path>
          </svg>
          <div class="detail-desc">
            <div class="first-desc">{{ source.forecasts[0].nightwind }}</div>
            <div class="second-desc">夜间风向</div>
          </div>
        </div>
        <div class="detail-item">
          <svg t="1692846577910" class="icon" viewBox="0 0 1161 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="5092" width="32" height="32">
            <path
              d="M781.833075 1023.972803H440.345543a440.075272 440.075272 0 1 1 399.450324-624.247368 314.460894 314.460894 0 0 1-57.962792 624.247368zM440.345543 220.312747a363.584784 363.584784 0 0 0 0 727.169569h341.487532a238.480343 238.480343 0 0 0 87.964061-460.047789 441.94504 441.94504 0 0 1-13.853277 241.624952 38.304736 38.304736 0 1 1-72.241016-25.496829 363.839753 363.839753 0 0 0-343.3573-483.249903z"
              fill="#14a7ec" p-id="5093"></path>
            <path
              d="M840.050835 399.725435a313.610999 313.610999 0 0 1 155.27569 77.425371A276.385629 276.385629 0 0 0 551.001782 157.930505a441.94504 441.94504 0 0 1 289.049053 241.79493zM576.838568 107.616762a38.160254 38.160254 0 0 1-27.026639-11.218605l-30.171247-30.171248a38.245244 38.245244 0 1 1 54.053277-54.053278l30.171248 30.171248a38.245244 38.245244 0 0 1-27.026639 65.271883zM952.066905 121.045092a38.245244 38.245244 0 0 1-31.786047-59.492602l21.587315-32.550952a38.304736 38.304736 0 1 1 63.742073 42.494716l-21.587315 32.550952a38.245244 38.245244 0 0 1-31.956026 16.997886z"
              fill="#14a7ec" p-id="5094"></path>
            <path
              d="M1120.855914 430.066662h-2.97463l-45.894292-3.484567a38.35573 38.35573 0 1 1 5.86427-76.490488l45.894293 3.484567a38.270741 38.270741 0 0 1-2.889641 76.490488z"
              fill="#14a7ec" p-id="5095"></path>
          </svg>
          <div class="detail-desc">
            <div class="first-desc">{{ source.forecasts[0].dayweather }}</div>
            <div class="second-desc">日间天气</div>
          </div>
        </div>
        <div class="detail-item">
          <svg t="1692846624989" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="5297" width="32" height="32">
            <path
              d="M276.48 911.36c-3.413333 0-6.826667 0-10.24-3.413333-6.826667-6.826667-10.24-17.066667-3.413333-23.893334l102.4-136.533333c6.826667-6.826667 17.066667-10.24 23.893333-3.413333 6.826667 6.826667 10.24 17.066667 3.413333 23.893333l-102.4 136.533333c-3.413333 6.826667-6.826667 6.826667-13.653333 6.826667z"
              fill="#14a7ec" p-id="5298"></path>
            <path
              d="M259.413333 979.626667c-27.306667 0-51.2-23.893333-51.2-51.2s23.893333-51.2 51.2-51.2 51.2 23.893333 51.2 51.2-23.893333 51.2-51.2 51.2z m0-68.266667c-10.24 0-17.066667 10.24-17.066666 17.066667s6.826667 17.066667 17.066666 17.066666 17.066667-6.826667 17.066667-17.066666-6.826667-17.066667-17.066667-17.066667zM447.146667 911.36c-3.413333 0-6.826667 0-10.24-3.413333-6.826667-6.826667-10.24-17.066667-3.413334-23.893334l102.4-136.533333c6.826667-6.826667 17.066667-10.24 23.893334-3.413333 6.826667 6.826667 10.24 17.066667 3.413333 23.893333l-102.4 136.533333c-3.413333 6.826667-6.826667 6.826667-13.653333 6.826667z"
              fill="#14a7ec" p-id="5299"></path>
            <path
              d="M430.08 979.626667c-27.306667 0-51.2-23.893333-51.2-51.2s23.893333-51.2 51.2-51.2 51.2 23.893333 51.2 51.2-23.893333 51.2-51.2 51.2z m0-68.266667c-10.24 0-17.066667 6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066666 17.066667-6.826667 17.066667-17.066666-6.826667-17.066667-17.066667-17.066667zM617.813333 911.36c-3.413333 0-6.826667 0-10.24-3.413333-6.826667-6.826667-10.24-17.066667-3.413333-23.893334l102.4-136.533333c6.826667-6.826667 17.066667-10.24 23.893333-3.413333 6.826667 6.826667 10.24 17.066667 3.413334 23.893333l-102.4 136.533333c-3.413333 6.826667-6.826667 6.826667-13.653334 6.826667z"
              fill="#14a7ec" p-id="5300"></path>
            <path
              d="M600.746667 979.626667c-27.306667 0-51.2-23.893333-51.2-51.2s23.893333-51.2 51.2-51.2 51.2 23.893333 51.2 51.2-23.893333 51.2-51.2 51.2z m0-68.266667c-10.24 0-17.066667 6.826667-17.066667 17.066667s6.826667 17.066667 17.066667 17.066666 17.066667-6.826667 17.066666-17.066666-6.826667-17.066667-17.066666-17.066667zM795.306667 860.16c-10.24 0-17.066667-6.826667-17.066667-17.066667s6.826667-17.066667 17.066667-17.066666h3.413333c109.226667-6.826667 194.56-95.573333 194.56-204.8 0-112.64-92.16-204.8-204.8-204.8-20.48 0-40.96 3.413333-58.026667 10.24-6.826667 3.413333-17.066667 0-20.48-10.24-47.786667-102.4-146.773333-170.666667-259.413333-170.666667-143.36 0-262.826667 109.226667-283.306667 252.586667 0 6.826667-6.826667 13.653333-13.653333 13.653333-68.266667 17.066667-119.466667 81.92-119.466667 153.6 0 88.746667 68.266667 157.013333 153.6 157.013333 10.24 0 17.066667 6.826667 17.066667 17.066667s-6.826667 17.066667-17.066667 17.066667c-105.813333 0-187.733333-85.333333-187.733333-191.146667 0-85.333333 54.613333-160.426667 133.12-184.32 23.893333-157.013333 157.013333-273.066667 314.026667-273.066667 119.466667 0 228.693333 68.266667 283.306666 177.493334 17.066667-3.413333 37.546667-6.826667 54.613334-6.826667 133.12 0 238.933333 105.813333 238.933333 238.933333 0 126.293333-98.986667 232.106667-225.28 238.933334 0 3.413333 0 3.413333-3.413333 3.413333z"
              fill="#14a7ec" p-id="5301"></path>
            <path
              d="M955.733333 494.933333c-3.413333 0-10.24-3.413333-13.653333-6.826666-37.546667-40.96-85.333333-64.853333-139.946667-68.266667-3.413333 0-10.24-3.413333-13.653333-6.826667-3.413333-3.413333-3.413333-6.826667-3.413333-13.653333 0-10.24 3.413333-20.48 3.413333-34.133333 0-129.706667-85.333333-242.346667-208.213333-279.893334-6.826667-3.413333-13.653333-10.24-13.653334-17.066666s3.413333-13.653333 13.653334-17.066667c30.72-10.24 61.44-13.653333 88.746666-13.653333 177.493333 0 324.266667 146.773333 324.266667 324.266666 0 40.96-6.826667 78.506667-20.48 116.053334-3.413333 10.24-6.826667 13.653333-17.066667 17.066666zM822.613333 385.706667c47.786667 6.826667 92.16 27.306667 126.293334 58.026666 6.826667-27.306667 10.24-51.2 10.24-78.506666 0-167.253333-146.773333-303.786667-314.026667-290.133334 105.813333 54.613333 177.493333 167.253333 177.493333 290.133334v20.48z"
              fill="#14a7ec" p-id="5302"></path>
          </svg>
          <div class="detail-desc">
            <div class="first-desc">{{ source.forecasts[0].nightweather }}</div>
            <div class="second-desc">夜间天气</div>
          </div>
        </div>
        <div class="detail-item">
          <svg t="1692778463891" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="29365" width="32" height="32">
            <path
              d="M785.732269 543.713473V105.886318a102.852849 102.852849 0 1 0-205.654603-1.890489V543.713473a250.924163 250.924163 0 1 0 205.654603 0z m-103.159414 411.922338a182.917635 182.917635 0 0 1-34.182095-362.769611V105.886318a34.187204 34.187204 0 0 1 68.364189-1.277358v488.512712a182.968729 182.968729 0 0 1-34.182094 362.769611z"
              p-id="29366" fill="#14a7ec"></path>
            <path
              d="M682.572855 925.950016a148.582258 148.582258 0 0 1-17.0655-296.347006 34.136109 34.136109 0 1 1 15.788142 66.422605 34.897415 34.897415 0 0 1-8.226184 1.277358v0.613132a79.962597 79.962597 0 0 0 18.393952 158.852214 79.298371 79.298371 0 0 0 69.590452-66.422605 34.028811 34.028811 0 0 1 34.795226-33.517868 34.693037 34.693037 0 0 1 33.517868 31.014247h1.277358a148.173503 148.173503 0 0 1-148.071314 138.107923z m0.664226-372.068775a12.058257 12.058257 0 0 1-12.058258-12.007164V129.287513a12.058257 12.058257 0 0 1 24.065421 0v411.922338a12.160446 12.160446 0 0 1-12.007163 12.67139zM414.634286 278.636185H191.556522a34.182094 34.182094 0 0 1 0-68.364189h223.077764a34.182094 34.182094 0 0 1 0 68.364189z m0-137.290415h-291.237575a33.671151 33.671151 0 0 1-34.795227-33.568962 33.620057 33.620057 0 0 1 33.517869-34.795226h292.514933a34.187204 34.187204 0 0 1 1.277357 68.364188z m0 411.258113H248.526679a34.182094 34.182094 0 1 1 0-68.313094h166.107607a34.182094 34.182094 0 1 1 0 68.313094z m0-137.290415H134.637459a34.182094 34.182094 0 1 1 0-68.364189h279.996827a34.182094 34.182094 0 0 1 0 68.364189z"
              p-id="29367" fill="#14a7ec"></path>
          </svg>
          <div class="detail-desc">
            <div class="first-desc">{{ `${source.forecasts[0].daytemp}℃/${source.forecasts[0].nighttemp}℃` }}</div>
            <div class="second-desc">今日温度</div>
          </div>
        </div>
        <div class="detail-item">
          <svg t="1692846680508" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="6727" width="32" height="32">
            <path
              d="M160 64c21.312 0 32 10.688 32 32v832c0 21.312-10.688 32-32 32-21.312 0-32-10.688-32-32v-832c0-21.312 10.688-32 32-32zM576 419.008l128-12.032V168.96l-128-11.968v262.016z m-64 4.992v-272l-192-17.984V160H256V64l616.96 56c25.344 2.688 46.08 12.992 62.08 31.04 16 17.92 24.32 39.68 24.96 64.96v144c-0.64 25.344-8.96 46.976-24.96 65.024-16 17.92-36.672 28.288-62.08 30.976L256 512V224h64v218.048l192-18.048z m256-23.04l99.008-8.96a29.952 29.952 0 0 0 20.992-10.048 32 32 0 0 0 8-21.952v-144a32 32 0 0 0-8-22.08 29.952 29.952 0 0 0-20.992-9.984L768 174.976v225.984z"
              fill="#14a7ec" p-id="6728"></path>
          </svg>
          <div class="detail-desc">
            <div class="first-desc">{{ `${source.forecasts[0].daypower}/${source.forecasts[0].nightpower}` }}</div>
            <div class="second-desc">今日风力</div>
          </div>
        </div>
      </div>
    </div>
    <div class="next-three-days-box">
      <div class="next-three-days-title">Next {{ source.forecasts.length }} Days</div>
      <div class="next-three-days">
        <div class="three-days-item" v-for="(item, i) in source.forecasts" :key="i">
          <div>{{ item.date.slice(5) }}</div>
          <div>{{ handleWeekNum2Text(item.week) }}</div>
          <div class="icon-wrap" v-html="handleWeatherType2Svg(item.dayweather, 50, '#14a7ec')"></div>
          <div>{{ `${item.daytemp}/${item.nighttemp}℃` }}</div>
        </div>
      </div>
    </div>
    <BackToBtn @myClick="handleBack(-3)" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router'
import TimeLine from '@/components/TimeLine/index.vue'
import BackToBtn from '@/components/BackToBtn/index.vue'
import CityMap from '@/components/aMap/cityMap.vue'
import { handleWeatherType2Svg, handleWeekNum2Text } from '@/configs'
import API_RESULT from '@/configs/weatherAMap.json'

const router = useRouter()

const source = ref()

const formatDate = (date) => {
  return date.slice(0, 11).replaceAll('-', '/')
}

const cityList = ref([])

const isShowCard = ref(false)
const showCityName = ref('')


const openCityInfo = (city) => {
  showCityName.value = city.name
  isShowCard.value = false
  showMonthList.value = false
  source.value = {
    base: API_RESULT.filter(item => {
      return (item.city === city.name) && (formatDate(item.lives[0].reporttime) === city.date)
    })[0].lives[0],
    forecasts: API_RESULT.filter(item => {
      return (item.city === city.name) && (formatDate(item.lives[0].reporttime) === city.date)
    })[0].forecasts[0].casts
  }
};

const monthList = ref([]);

const dayList = ref([])

const onClickMonth = (info) => {
  showMonthList.value = false
  isShowCard.value = false
  const arr = []
  // 日期数据去重处理
  API_RESULT.forEach(item => {
    if (item.lives[0].reporttime.indexOf(info.name) > -1) {
      arr.push(item.lives[0].reporttime.slice(5, 11))
    }
  })
  dayList.value = [...new Set(arr)].map(item => {
    return {
      tag: {
        type: 'day',
        name: item
      }
    }
  })
};
const onClickDay = (info) => {
  showMonthList.value = false
  isShowCard.value = true
  cityList.value = API_RESULT.map((item, i) => {
    return {
      name: item.city,
      date: formatDate(item.lives[0].reporttime)
    }
  }).filter(item => {
    return item.date.slice(5).replace('/', '-') === info.name
  })
};

const showMonthList = ref(true);

const handleBack = (num) => {
  switch (num) {
    case -3:
      isShowCard.value = true
      showMonthList.value = false
      break;
    case -2:
      isShowCard.value = false
      showMonthList.value = false
      source.value = null
      break;
    case -1:
      showMonthList.value = true
      source.value = null
      break;
    case 0:
      router.push('/home')

    default:
      break;
  }
}

onMounted(() => {
  // 月份数据去重初始化
  const monthArr = []
  API_RESULT.forEach(item => {
    const reporttime = item.lives[0].reporttime.slice(0, 7)
    monthArr.push(reporttime)
  })
  monthList.value = [...new Set(monthArr)].map(item => {
    return {
      tag: {
        type: 'month',
        name: item
      }
    }
  })
  cityList.value = API_RESULT.map((item, i) => {
    return {
      name: item.city,
      date: formatDate(item.lives[0].reporttime)
    }
  })
});
</script>

<style lang="scss" scoped>
#city-list {
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  overflow-y: scroll;

  .city-item {
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    background-color: #14a7ec;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40vw;
    padding: 40px 0;
    border: 1px solid #ddd;
    border-radius: 20px;
    box-shadow: 4px 6px 5px 4px #ddd;
  }
}

#card {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  position: relative;

  .search-box {
    position: sticky;
    top: 20px;
    background: #fff;
    margin: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 20px;
    box-shadow: 0px 0px 5px 4px #ddd;
    display: flex;
    align-items: center;

    input {
      background: none;
      outline: none;
      border: none;
      margin-left: 10px;
    }

    input:focus {
      border: none;
    }
  }

  .today-base {
    position: absolute;
    top: 70px;
    z-index: 1;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;

    .base-location {
      display: flex;
      align-items: center;
      padding: 10px 0;

      span {
        font-size: 20px;
        font-weight: 600;
      }
    }

    .base-time {
      color: #929292;
      padding: 10px 0;
    }

    .base-temp {
      display: flex;
      align-items: center;

      span {
        font-size: 36px;
        font-weight: 600;
      }
    }

    .base-more {
      padding: 10px 0;
      font-weight: 600;
      text-align: center;
    }
  }

  #Map {
    width: 100%;
    height: 220px;
  }

  .today-detail-box {
    padding: 20px 20px 0;

    .today-detail-title {
      font-weight: 600;
    }

    .today-details {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      gap: 20px;
      padding: 20px 0;

      .detail-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40vw;
        padding: 20px 0;
        border: 1px solid #ddd;
        border-radius: 30px;
        box-shadow: 4px 6px 5px 4px #ddd;

        .detail-desc {
          font-weight: 600;
          padding: 0 10px;

          .first-desc {
            font-size: 14px;
          }

          .second-desc {
            font-size: 12px;
          }
        }
      }
    }
  }

  .next-three-days-box {
    padding: 20px;

    .next-three-days-title {
      font-weight: 600;
    }

    .next-three-days {
      display: flex;
      padding: 20px 0;

      .three-days-item {
        flex: 1;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        margin: 0 4px;
        padding: 20px 0;
        border: 1px solid #ddd;
        border-radius: 20px;
        box-shadow: 4px 6px 5px 4px #ddd;

        .icon-wrap {
          padding: 10px 0;
        }
      }
    }
  }
}
</style>
