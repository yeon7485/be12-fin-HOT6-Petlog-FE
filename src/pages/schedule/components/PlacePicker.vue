<script setup>
import { ref, onMounted, defineEmits } from "vue";

const mapContainer = ref(null);
const keyword = ref("");
const places = ref([]);
const myLat = ref(null);
const myLng = ref(null);

const emit = defineEmits(["select", "close"]);

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

      const imageSrc = "/src/assets/images/my_place.png";
      const imageSize = new kakao.maps.Size(30, 32);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const myMarker = new kakao.maps.Marker({
        map,
        position: center,
        title: "내 위치",
        image: markerImage,
      });
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

      infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

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

  emit("select", place);
};
</script>

<template>
  <div class="place-box-container">
    <div class="place-box-header">
      <input v-model="keyword" placeholder="검색어 입력" />
      <button @click="searchPlaces">검색</button>
      <button @click="$emit('close')">닫기</button>
    </div>
    <div class="place-box-content">
      <div class="places">
        <ul>
          <li v-for="(place, index) in places" :key="place.id" @click="clickPlace(place, index)">
            <strong>{{ index + 1 }}. {{ place.place_name }}</strong
            ><br />
            <small>{{ place.road_address_name || place.address_name }}</small
            ><br />
            <small v-if="place.phone">📞 {{ place.phone }}</small>
          </li>
        </ul>
      </div>
      <div class="map-box" ref="mapContainer"></div>
    </div>
  </div>
</template>

<style scoped>
.place-box-container {
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
}

.place-box-header {
  display: flex;
  gap: 8px;
  padding: 10px;
  background-color: #f2f2f2;
}

.place-box-header input {
  flex: 1;
  padding: 6px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.place-box-header button {
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  background-color: #8a0206;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.place-box-header button:hover {
  background-color: #6e0105;
}

.place-box-content {
  display: flex;
  flex: 1;
  height: 100%;
}

.places {
  width: 150px;
  overflow-y: auto;
  padding: 10px;
  background: #fafafa;
  border-right: 1px solid #ddd;
  font-size: 14px;
}

.places li {
  margin-bottom: 10px;
  padding: 6px;
  cursor: pointer;
}

.places li:hover {
  background-color: #eee;
}

.map-box {
  flex: 1;
  height: 100%;
  position: relative;
}
</style>
