# YesterdayBoxofflce

### 프로젝트 설명

이 프로젝트는 어제자 박스오피스 순위를 조회할 수 있는 리액트 기반 웹 애플리케이션입니다. 사용자는 특정 날짜를 선택하여 해당 날짜의 박스오피스 순위와 관련 정보를 볼 수 있습니다.

### 기능 목록

- 어제자 박스오피스 순위 자동 조회
- 날짜 선택을 통한 박스오피스 순위 조회
- 각 영화의 포스터, 제목, 순위, 개봉일, 누적관람객 정보 표시

### 시작하기

이 섹션은 프로젝트를 로컬 환경에서 실행하기 위한 지침을 제공합니다.

#### 필수 조건

- Node.js가 설치되어 있어야 합니다.
- KOBIS API 키와 KOREAFILM API 키가 필요합니다. 이 키들은 각각 [한국영화진흥위원회(KOBIS)](https://www.kobis.or.kr/kobisopenapi/homepg/main/main.do)와 [한국영화 데이터베이스(KMDB)](https://www.kmdb.or.kr/main)에서 발급받을 수 있습니다.
- 발급받은 `REACT_APP_KOBIS_API_KEY`와 `REACT_APP_KOREAFILM_API_KEY` 환경변수를 프로젝트에 설정해야 합니다.

#### 설치

1. 리포지토리를 클론합니다.
   ```sh
   git clone https://github.com/maskelog/YesterdayBoxofflce.git
   ```
2. NPM 패키지를 설치합니다.
   ```sh
   npm install
   ```
3. 개발 모드에서 애플리케이션을 실행합니다.
   ```sh
   npm start
   ```

### 사용된 기술

- [React.js](https://reactjs.org/) - 프런트엔드 개발 프레임워크
- [Axios](https://github.com/axios/axios) - HTTP 클라이언트 라이브러리
- [CSS](https://www.w3.org/Style/CSS/Overview.en.html) - 스타일링
