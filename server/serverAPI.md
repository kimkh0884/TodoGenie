TodoGenie Server API

회원가입
POST 	/users/sign_up

req.body.userName
req.body.userId
req.body.password

클라이언트 쪽에서 axios를 사용할 때  req.body를
{
	userName: Admin,
	userId: admin,
	password: abcde
}
이런식으로 객체로 만들어서 넣어주면 됩니다


로그인
POST /users/login

req.body.userId
req.body.password


로그아웃
GET /users/logout


아래 작업은 모두 로그인 상태에서 진행

Todo 생성
POST /todos

req.body.title
req.body.start (필수 아님)
req.body.end


Todo 목록 조회
GET /todos

특정 날짜 구간의 Todo 목록 조회
GET /todos?start=X&end=Y
X = 시작 날짜의 00시00분을 가리키는 Date Object
Y = 마지막 날짜의 23시 59분을 가리키는 Date Object
ex) http://localhost:8000/todos?start=1669420800000&end=1669680000000


Todo 수정
PUT /todos/:id
req.body.title
req.body.start
req.body.end
req.body.state
(모두 필수 아님)

state 변경의 경우 PUT 요청을 통해 해결
여기서 :id 는 todo 목록을 받아올 때 보이는 Todo object의 _id 값


Todo 삭제
DELETE /todos/:id


Todo 검색 (title로 검색)
GET /todos/search?keyword=XXX

mongodb의 full text search 사용
title에 keyword에 해당하는 단어가 포함되어 있으면 관련도 순으로 정렬되어 응답


Todo 추천
GET /todos/recommendation

데이터베이스에 있는 todo들 중 title 기준으로 가장 많은 것 5개 응답
