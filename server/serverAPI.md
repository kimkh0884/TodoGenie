const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    owner: { type: String, required: true },
    start: { type: Date, required: true},
    end: { type: Date, required: true},
    state: { type: String, required: true}
  },
  {
    timestamps: true,
  }
);
const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true },
    username: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const alarmSchema = new mongoose.Schema(
    {
        owner:  { type: String, required: true },
        time:   { type: String, required: true },
        todo
        // mobile 이면 music??
    }
)
tag {
    name
}

/users
    GET /users          => 전체 유저 리스트 (확인용으로만 사용)

    POST /login
    POST /logout
    
    // todos가 user를 request로 받아 실행되기 때문에 user에 대한 요청은 별도의 처리 필요없을 것으로 생각


/todos
    GET /todos          => 해당 유저의 todos 반환
    GET /todos?date=0201
    POST /todos         => 새로운 todo 생성 (request.body 이용)
    DELETE /todos/:id   => id에 해당하는 todo 제거
    PUT /todos/:id      => id에 해당하는 todo 수정 (request.body 이용)

    /todos/recommendation
        GET /todos/recommendation                       => 가장 많은 todo (title 기준)
        GET /todos/recommendation?day=MON&time=8-10     => 해당 요일&시간

        // recommendations는 전체 유저의 데이터