<script setup>
import { ref, onMounted } from "vue";

const mapContainer = ref(null);
const keyword = ref("동물 병원");
const places = ref([]);
const myLat = ref(null);
const myLng = ref(null);

let map = null;
let infowindow = null;
let markers = [];

onMounted(() => {
  getMyLocation();
});

const getMyLocation = () => {
  if (!navigator.geolocation) {
    alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      myLat.value = pos.coords.latitude;
      myLng.value = pos.coords.longitude;
      loadKakaoMap(mapContainer.value);
    },
    () => {
      alert("위치 정보를 가져올 수 없습니다. 기본 위치로 이동합니다.");
      myLat.value = 37.566826;
      myLng.value = 126.9786567;
      loadKakaoMap(mapContainer.value);
    }
  );
};

const loadKakaoMap = (container) => {
  const kakaoApiKey = import.meta.env.VITE_KAKAO_MAP_KEY;

  const script = document.createElement("script");
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&libraries=services&autoload=false`;
  document.head.appendChild(script);

  script.onload = () => {
    window.kakao.maps.load(() => {
      const { kakao } = window;
      const center = new kakao.maps.LatLng(myLat.value, myLng.value);

      map = new kakao.maps.Map(container, {
        center,
        level: 3,
      });

      const mapTypeControl = new kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      const imageSrc = "/src/assets/icons/my_place.png";
      const imageSize = new kakao.maps.Size(40, 40);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const myMarker = new kakao.maps.Marker({
        map,
        position: center,
        title: "내 위치",
        image: markerImage,
      });

      searchPlaces();
    });
  };
};

const searchPlaces = () => {
  const { kakao } = window;
  const ps = new kakao.maps.services.Places();

  if (!keyword.value.trim()) {
    alert("키워드를 입력해주세요!");
    return;
  }

  ps.keywordSearch(keyword.value, placesSearchCB, {
    location: new kakao.maps.LatLng(myLat.value, myLng.value),
    radius: 2000,
  });
};

const placesSearchCB = (data, status) => {
  const { kakao } = window;

  if (status === kakao.maps.services.Status.OK) {
    places.value = data;
    removeMarkers();

    const bounds = new kakao.maps.LatLngBounds();

    data.forEach((place, index) => {
      const position = new kakao.maps.LatLng(place.y, place.x);
      const marker = new kakao.maps.Marker({
        map,
        position,
      });

      kakao.maps.event.addListener(marker, "click", () => {
        const phone = place.phone ? `<br/>📞 ${place.phone}` : "";
        infowindow.setContent(
          `<div style="padding:5px;font-size:12px;">${place.place_name}${phone}</div>`
        );
        infowindow.open(map, marker);
      });

      markers.push(marker);
      bounds.extend(position);
    });

    map.setBounds(bounds);
  } else {
    alert("검색 결과가 없습니다.");
  }
};

const removeMarkers = () => {
  markers.forEach((marker) => marker.setMap(null));
  markers = [];
};

const clickPlace = (place, index) => {
  const { kakao } = window;
  const position = new kakao.maps.LatLng(place.y, place.x);
  map.setCenter(position);

  const phone = place.phone ? `<br/>📞 ${place.phone}` : "";
  infowindow.setContent(
    `<div style="padding:5px;font-size:12px;">${place.place_name}${phone}</div>`
  );
  infowindow.open(map, markers[index]);
};

const moveToMyLocation = () => {
  const { kakao } = window;
  if (myLat.value && myLng.value && map) {
    const moveLatLon = new kakao.maps.LatLng(myLat.value, myLng.value);
    map.panTo(moveLatLon);
  } else {
    alert("현재 위치를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
  }
};
</script>

<template>
  <div class="page-container">
    <h1 class="title">주변 병원</h1>
    <div class="map-wrapper">
      <div class="side">
        <h3 class="place">📍 반경 2km 내 장소</h3>
        <div class="search-bar">
          <input v-model="keyword" placeholder="검색어 입력" @keyup.enter="searchPlaces" />
          <button @click="searchPlaces">검색</button>
        </div>
        <ul class="places">
          <li v-for="(place, index) in places" :key="place.id" @click="clickPlace(place, index)">
            <strong>{{ index + 1 }}. {{ place.place_name }}</strong
            ><br />
            <small>{{ place.road_address_name || place.address_name }}</small
            ><br />
            <small v-if="place.phone">📞 {{ place.phone }}</small>
          </li>
        </ul>
      </div>
      <div class="map-box" ref="mapContainer">
        <button @click="moveToMyLocation" class="my-location-btn">
          <img src="/src/assets/icons/my_place.png" alt="내 위치" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0;
}

.title {
  font-size: 28px;
  margin-bottom: 30px;
}

.place {
  font-size: 16px;
  margin-bottom: 15px;
}

.map-wrapper {
  display: flex;
  width: 100%;
  max-width: 960px;
  height: 70vh;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.side {
  width: 270px;
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
  width: 180px;
  padding: 6px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-bar button {
  padding: 6px 10px;
  font-size: 14px;
  background-color: var(--main-color-brown);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.search-bar button:hover {
  background-color: var(--main-color-hover);
}

.places {
  list-style: none;
  padding: 0;
  margin: 0;
}

.places li {
  padding: 10px 5px;
  border-bottom: 1px solid var(--gray300);
  cursor: pointer;
  line-height: 130%;
}

.places li:hover {
  background: #f2f2f2;
}

.map-box {
  position: relative;
  flex: 1;
  height: 100%;
}

.my-location-btn {
  position: absolute;
  bottom: 16px;
  right: 16px;
  padding: 10px 14px;
  background-color: white;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  z-index: 10;
  transition: all 0.3s;
}

.my-location-btn > img {
  width: 20px;
  height: 20px;
}

.my-location-btn:hover {
  background-color: var(--main-color-light);
}
</style>
