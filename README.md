# 🍎 파인드애플(FindApple) FrontEnd

<img src="https://i.ibb.co/BjYLwvp/cover.jpg"/>

## 💻 프로젝트 소개
[서비스 목적]  중고거래 사이트 가격 책정 한계 개선(불합리한 가격 제안 방지)

##  🎯 주요 기능
- 중고 애플 맥북 및 아이폰 가격을 책정 받을 수 있다.
(실제 데이터 + 판매 로직에 따른 데이터)
- 책정된 가격을 커뮤니티에 올려 물건을 바로 판매할 수 있다.
- 만약 책정 가격이 마음에 들지 않을 시 이의제기를 할 수 있는 커뮤니티가 있다.
- MyPage를 통해 개인정보 변경, 찜한 물건, 올린 물건, 이의제기 내용을 확인할 수 있다.
- 댓글 뿐 아니라 실시간 채팅을 통해 유저 간 거래가 가능하다.

### 🔨 구현한 기능들
- JWT를 이용한 일반 회원가입 및 이메일 인증 서비스
- 소셜 로그인 및 로그아웃(카카오톡)
- 무한 스크롤 통한 게시글 전체 보기
- 단계별 절차에 따른 가격책정 로직
- 게시물 및 이의제기, 댓글 CRUD
- Stomp 활용한 실시간 채팅
- Hook 이용한 다중 및 용량 압축 사진 업로드
- SlickSlider 통한 사진 가로 스크롤
- TailWind 를 활용한 CSS 적용
- Redux-Toolkit의 Thunk를 활용한 MiddleWare 사용
- 코드 모듈화 통한 리팩토링 및 유지 보수 효율성 증대
- Axios 통한 BackEnd 송수신
- Rudux 활용한 전역 상태 관리
<br/>
(page 이동 간 전역관리 : 가격책정로직 단계별 상태 , Footer State)
<br/>
(component 간 전역 관리 : Get State ; 카테고리, 정렬, 검색, 무한스크롤 페이지)

##  👥 FrontEnd 팀원 소개
 | Name | Position|
| --- | --- |
| 안다민 | 리더  |
| 김원규 | 팀원 |
| 김재욱 | 팀원 |

## ⏰ 프로젝트 기간
2022년 11월 07일 ~ 12월 16일

### 🛠 기술 아키텍쳐

![finalarc](https://user-images.githubusercontent.com/70747064/207752611-102a2d71-5c1d-4745-a0d1-ba3a5f20cbf4.png)

## ⚙️ 개발환경 및 라이브러리
<div><img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/><img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=Tailwind-CSS&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/><img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/kakao login-FFCD00?style=for-the-badge&logo=kakao&logoColor=black"><img src="https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white"></div>


## ⛔️ 주요 트러블 슈팅

### 1. 가격책정 단계별 뒤로가기 기능 구현
    - 문제상황 : 가격책정에서 뒤로가기 섹션이 불가능 ⇒ 각 스텝 당 값을 저장하지 못 한다.
    - 발생한 문제 : 한 번 가격 책정을 마쳤을 때 수정하려면 처음부터 다시 해야 한다.
    - 해결 방안 :  store에 스탭 당 각 state(리스트, 현재 선택한 스탭)을 저장, 초기화가 필요할 시 footer에 + button을 눌러서 store 초기화 가능 or 다시하기 button
    - 해결방안에서 생긴 고민 : store 상태값을 언제 바꿔 줄 것인가에 대한 고민
    - get할 때 바꿔주고(Thunk) 뒤로가기 시 stepState만 변경해주는 action을 추가하여 변경
    - 해결 : 뒤로가기를 하여도 가격책정의 값이 남아있다.
    - 트러블슈팅 간의 트러블 : 뒤로가기 이후 스토어 내의 값이 이미 존재하기에 값을 고르지 않아도 다음으로 넘어가지는 상황이 발생(validation이 뚫리는 현상)
    - 해결 : 스탭마다 store를 초기화 해주는 방식을 고려 ⇒ 초기화 과정에서 오류 다수 발생, 초기화 되지 않으면 get 하는데 오류가 발생 ⇒ 기존에 골랐던 store내에 존재하는 전에 선택했던 state를 default value로 주어 해결(이미 선택되어 있는 상황으로)
    
### 2. Post가 안 되었던 현상 & 프로필 사진 업데이트가 안 되었던 것
    - 게시물 작성 및 프로필 수정 부분(POST)에서 map이 돌지 않는다는 에러 발생.
    - 브라우저 이슈인줄 알았으나 리덕스 사용중 서버와의 통신과 페이지 이동 과정에서의 즉 navigate하는 위치 문제로 확인.
    - 원인 1 : 이미지 크기가 서버에서 저장 할수있는 크기보다 큰 경우 작성이 안되는 문제.
    - 해결 : 이미지 압축 라이브러리를 도입하여 해결
    - 원인 2 : 게시물 작성시 Axios로 서버와 통신중 새로고침되어 게시물 작성이 안되는 문제.
    - 근본적인 문제 : 게시물 작성시 Action을 dispatch 직후 페이지 이동을 하여 Axios로 서버와 통신중 페이지 이동을 하는 잘못된 로직. 이를 해결하기 위해 새로고침을 했던 부분 때문에 게시물 작성 오류 발생
    - 해결 : 서버에서 통신 성공 응답 도착 시 페이지 이동을 하는 것으로 근본적인 원인 해결.

## 💯 LightHouse 성능 측정 결과

### 게시물 수정
1) 사진 압축 Hook 전
![게시물 수정 압축전](https://user-images.githubusercontent.com/70747064/207323022-0f2bcf8b-6255-4faa-b136-2a8e541ab9a8.png)
2) 사진 압축 Hook 후
![게시물 수정 압축후](https://user-images.githubusercontent.com/70747064/207323032-6a6e964c-4c9c-41f2-b4ce-662d1cbee63d.png)

### 프로필 사진 변경
1) 사진 압축 Hook 전
![프로필(맥북사진)](https://user-images.githubusercontent.com/70747064/207323039-adec7778-bbf5-4975-afd7-20c1f55a6120.png)
2) 사진 압축 Hook 후
![프로필(후 맥북사진)](https://user-images.githubusercontent.com/70747064/207323043-c02cf739-4dcf-4177-bed1-e98a02d6bbc4.png)

→ 성능 대비 6.82%, 52.54% 효율성 증가

## <div>✅ 노션 Link(https://www.notion.so/1-2048c4aab357410e922fe426d5c24c99)</div>
- 노션을 통해 회의록 및 저희 팀원이 하루 하루 노력해온 흔적을 엿보실 수 있습니다. 꼭 들어와서 확인해주세요!

## 🎬 Youtube 영상 링크
- https://youtu.be/2j1oMwgvp0c (약 9분)
