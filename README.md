<br>
<img src="https://capsule-render.vercel.app/api?type=venom&height=250&color=bb8378&fontColor=FFFFFF&text=🐾펫로그&fontSize=70&fontAlignY=30&animation=fadeIn&rotate=0&desc=반려동물%20일정 관리%20·%20커뮤니티%20플랫폼&descSize=25&reversal=false" style="width: 120%;">

<br>

## 🕵️ 팀원 소개

> **[한화시스템 BEYOND SW캠프 12기] Final Project**  
> Team Hot6🔥

<div align="center">

|      <img src="src/assets/images/냐옹이.jpg" width="100" />      |     <img src="src/assets/images/로사.jpg" width="100" />     |    <img src="src/assets/images/로이.jpg" width="100" />    |   <img src="src/assets/images/마자용.jpg" width="100" />   |
| :--------------------------------------------------------------: | :----------------------------------------------------------: | :--------------------------------------------------------: | :--------------------------------------------------------: |
| 🐳 **박동휘**<br/>[@parkdonghwi-git](https://github.com/donghwi) | 🐢 **유승호**<br/>[@seungho99](https://github.com/seungho99) | 🧶 **박세연**<br/>[@yeon7485](https://github.com/yeon7485) | ⚽ **안규호**<br/>[@Ahngyuho](https://github.com/Ahngyuho) |

</div>

<br>

### 목차

- [🐶 기술 스택](#-기술-스택)
- [🐱 펫로그 데모 사이트 링크](#-펫로그-데모-사이트-바로가기)
- [🐹 펫로그 서비스 소개](#-펫로그-서비스-소개)
- [🐰 시스템 아키텍처](#-시스템-아키텍처)
- [🐦 프론트엔드 프로젝트 목표](#-프론트엔드-프로젝트-목표)
- [🐟 프로젝트 설계](#-프로젝트-설계)
- [🐢 핵심 로직 상세 설명](#-핵심-로직-상세-설명)
- [🦎 프로젝트 폴더 바로가기](#-프로젝트-폴더-바로가기)

<br>
<br>

## 🐶 기술 스택

### 🎨 Frontend

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D) <!-- Vue.js -->
![Pinia](https://img.shields.io/badge/Pinia-ffe564?style=for-the-badge&logo=pinia&logoColor=black) <!-- 상태관리 라이브러리 -->
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white) <!-- Nginx -->

### 🧠 Backend

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white) <!-- 스프링 부트 -->
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white) <!-- 인증/인가 -->
![Spring Cloud](https://img.shields.io/badge/Spring_Cloud-6DB33F?style=for-the-badge&logo=spring&logoColor=white) <!-- 클라우드 마이크로서비스 -->

### 🗄 DB

![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

### ⚙️ CI/CD

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) <!-- 컨테이너화 -->
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white) <!-- 오케스트레이션 -->
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white) <!-- CI/CD -->

### 💻 Etc

![Kafka](https://img.shields.io/badge/kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) <!-- 형상 관리 -->
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white) <!-- GitHub -->
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![Discord](https://img.shields.io/badge/discord-326CE5?style=for-the-badge&logo=discord&logoColor=white)

<br><br>

## 🐱 펫로그 데모 사이트 바로가기

### [펫로그 사이트](https://www.petlog.kro.kr)</a>

<br>

## 🐹 펫로그 서비스 소개

<img src="src/assets/images/logo_white.png" />

#### 프로젝트 배경

반려동물 일정 관리 & 커뮤니티 플랫폼

#### 세부 기능

- **`📆 일정 관리`**<br>
  반려동물의 병원, 산책 등 다양한 일정을 날짜별로 등록 및 조회
- **`🧾 일일 기록`**<br>
  반려동물의 건강 상태, 이상 현상, 오늘의 사진 등 일일 단위로 기록 및 관리
- **`📍 위치 기반 탐색`**<br>
  현재 위치를 기준으로 주변 동물병원, 펫샵 등의 반려동물 시설을 탐색
- **`🔔 실시간 알림`**<br>
  스케줄 알림을 실시간 알림으로 받아볼 수 있는 기능
- **`💬 그룹 채팅`**<br>
  사용자들이 실시간으로 소통하고, 채팅방에서 일정 또는 반려동물 카드도 함께 공유
- **`📇 반려동물 카드`**<br>
  반려동물 정보를 카드 형식으로 등록 및 관리

---

<br>

## 🐰 시스템 아키텍처

## 🐦 프론트엔드 프로젝트 목표

- `사용자 인터페이스(UI) 개발` : 직관적이고 반응형 디자인 구현
- `사용자 경험(UX) 향상` : 사용자의 편의성과 흐름을 고려한 화면 흐름 설계
- `프론트엔드 기술 활용` : HTML, CSS, JavaScript, 프레임워크(Vue)를 사용할 때 확장성을 고려하여 프로젝트를 진행
- `API 연동` : 백엔드와의 데이터 통신 (axios)

## 🐟 프로젝트 설계

#### [1. 기획서 바로가기](https://docs.google.com/document/d/1VGoL4hW_HWG3-ZIIZwwbtjm14G55dLhh8RdMGFEjTf4/edit?usp=sharing)

#### [2. 요구사항 정의서](https://docs.google.com/spreadsheets/d/1-6Z2yJZRFkM0Ix6biRMdWBmkby0E4XW_g9UfPiDfsH4/edit?usp=sharing)

#### [3. WBS](https://docs.google.com/spreadsheets/d/10GJK2OFHPAkFplNyjtBtaEh8kxCxARNC_aAOHAJr77M/edit?usp=sharing)

#### [4. 화면설계서 바로가기](https://www.figma.com/design/7sBqcCVXnFPHhrHAJN9N9l/Petlog?node-id=0-1&t=6T5v5WcuWWnwHpGS-1)

<br>

## 🦔 주요 기능 시연

<details>
<summary>회원가입</summary>

![image]()

> 이메일, 비밀번호, 닉네임으로 회원 가입을 한다.  
> 이메일, 닉네임은 **중복이 불가능**하다.

</details>

<details>
<summary>로그인</summary>

![image]()

> 일반 로그인, 카카오 로그인

> 이메일, 비밀번호를 입력하여 로그인한다.
> 카카오 로그인은 카카오로 로그인 한 후 최초 로그인시 동의를 받는다.

</details>

<details>
<summary>메인 페이지</summary>

</details>

<details>
<summary>일정/기록</summary>

### 전체 일정 조회

---

### 반려동물별 일정 조회

---

### 날짜별 일정 조회

---

### 일정 생성

---

### 일정 상세

---

### 기록 생성

---

### 기록 상세

---

</details>

<details>
<summary>주변 장소 조회</summary>

</details>

<details>
<summary>자유/정보공유 게시판</summary>

### 목록

---

### 게시글 상세

---

### 게시글 등록

---

### 댓글 등록

</details>

<details>
<summary>Q&A 게시판</summary>

### 질문 목록

---

### 질문 상세

---

### 질문 등록

---

### AI 답변

---

### 답변 등록

---

### 답변 채택

</details>

<details>
<summary>그룹 채팅</summary>

### 채팅방 목록

---

### 채팅방 생성

---

### 채팅방 참여

---

### 채팅 메시지 전송

---

### 채팅방 상세

</details>

<details>
<summary>마이페이지 - 반려동물 카드</summary>

### 반려동물 카드 목록록

---

### 카드 생성

</details>

<details>
<summary>마이페이지 - 내 정보</summary>

### 내 정보 조회

---

### 내 정보 수정

</details>

<details>
<summary>관리자</summary>

### 카테고리 목록

---

### 카테고리 등록

---

### 이벤트 채팅방 생성

</details>

<br>

## 🐢 핵심 로직 상세 설명

### [📃 프로젝트 Wiki](https://github.com/beyond-sw-camp/be12-fin-HOT6-Petlog-FE/wiki) <br>

<br>

## 🐷 백엔드 프로젝트 폴더 바로가기

### [🗂️ Backend](https://github.com/beyond-sw-camp/be12-fin-HOT6-Petlog-BE)
