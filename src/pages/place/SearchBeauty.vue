<script setup>
import { ref, onMounted } from 'vue'

const mapContainer = ref(null)
const keyword = ref('애견 미용')
const places = ref([])
const myLat = ref(null)
const myLng = ref(null)

let map = null
let infowindow = null
let markers = []

onMounted(() => {
  getMyLocation()
})

const getMyLocation = () => {
  if (!navigator.geolocation) {
    alert('이 브라우저는 위치 정보를 지원하지 않습니다.')
    return
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      myLat.value = pos.coords.latitude
      myLng.value = pos.coords.longitude
      loadKakaoMap(mapContainer.value)
    },
    () => {
      alert('위치 정보를 가져올 수 없습니다. 기본 위치로 이동합니다.')
      myLat.value = 37.566826
      myLng.value = 126.9786567
      loadKakaoMap(mapContainer.value)
    }
  )
}

const loadKakaoMap = (container) => {
  const kakaoApiKey = 'fab4f10cbc7daa7c404b3ba5f68a92fa'

  const script = document.createElement('script')
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&libraries=services&autoload=false`
  document.head.appendChild(script)

  script.onload = () => {
    window.kakao.maps.load(() => {
      const { kakao } = window
      const center = new kakao.maps.LatLng(myLat.value, myLng.value)

      map = new kakao.maps.Map(container, {
        center,
        level: 3,
      })

      infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })

      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'
      const imageSize = new kakao.maps.Size(30, 42)
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)

      const myMarker = new kakao.maps.Marker({
        map,
        position: center,
        title: '내 위치',
        image: markerImage
      })

      const myInfo = new kakao.maps.InfoWindow({
        position: center,
        content: '<div style="padding:4px 10px;font-size:13px;">📍 내 위치</div>'
      })
      myInfo.open(map, myMarker)

      searchPlaces()
    })
  }
}

const searchPlaces = () => {
  const { kakao } = window
  const ps = new kakao.maps.services.Places()

  if (!keyword.value.trim()) {
    alert('키워드를 입력해주세요!')
    return
  }

  ps.keywordSearch(
    keyword.value,
    placesSearchCB,
    {
      location: new kakao.maps.LatLng(myLat.value, myLng.value),
      radius: 2000
    }
  )
}

const placesSearchCB = (data, status) => {
  const { kakao } = window

  if (status === kakao.maps.services.Status.OK) {
    places.value = data
    removeMarkers()

    const bounds = new kakao.maps.LatLngBounds()

    data.forEach((place, index) => {
      const position = new kakao.maps.LatLng(place.y, place.x)
      const marker = new kakao.maps.Marker({
        map,
        position
      })

      kakao.maps.event.addListener(marker, 'click', () => {
        const phone = place.phone ? `<br/>📞 ${place.phone}` : ''
        infowindow.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}${phone}</div>`)
        infowindow.open(map, marker)
      })

      markers.push(marker)
      bounds.extend(position)
    })

    map.setBounds(bounds)
  } else {
    alert('검색 결과가 없습니다.')
  }
}

const removeMarkers = () => {
  markers.forEach((marker) => marker.setMap(null))
  markers = []
}

const clickPlace = (place, index) => {
  const { kakao } = window
  const position = new kakao.maps.LatLng(place.y, place.x)
  map.setCenter(position)

  const phone = place.phone ? `<br/>📞 ${place.phone}` : ''
  infowindow.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}${phone}</div>`)
  infowindow.open(map, markers[index])
}
</script>

<template>
  <div class="page-container">
    <h1 class="title">주변 미용실</h1>
    <div class="map-wrapper">
      <div class="side">
        <h3 class="place">📍 반경 2km 내 장소</h3>
        <div class="search-bar">
          <input v-model="keyword" placeholder="검색어 입력" @keyup.enter="searchPlaces" />
          <button @click="searchPlaces">검색</button>
        </div>
        <ul class="places">
          <li
            v-for="(place, index) in places"
            :key="place.id"
            @click="clickPlace(place, index)"
          >
            <strong>{{ place.place_name }}</strong><br />
            <small>{{ place.road_address_name || place.address_name }}</small><br />
            <small v-if="place.phone">📞 {{ place.phone }}</small>
          </li>
        </ul>
      </div>
      <div class="map-box" ref="mapContainer"></div>
    </div>
  </div>
</template>

<style scoped>
:global(body) {
  margin: 0;
  padding: 0;
}

.page-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0;
}

.title {
  font-size: 32px;
  margin: 0 0 24px 30px;
  padding: 0;
  text-align: left;
  line-height: 1.2;
}

.place {
  margin-bottom: 15px;
}

.map-wrapper {
  display: flex;
  width: 100%;
  max-width: 960px;
  height: 70vh;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
}

.side {
  width: 300px;
  background: #f9f9f9;
  padding: 12px;
  overflow-y: auto;
  border-right: 1px solid #ddd;
  font-size: 14px;
}

.search-bar {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
}

.search-bar input {
  flex: 1;
  padding: 6px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-bar button {
  padding: 6px 10px;
  font-size: 14px;
  background-color: #8a0206;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #6e0105;
}

.places {
  list-style: none;
  padding: 0;
  margin: 0;
}

.places li {
  padding: 6px;
  margin-bottom: 6px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.places li:hover {
  background: #f2f2f2;
}

.map-box {
  flex: 1;
  height: 100%;
}
</style>
