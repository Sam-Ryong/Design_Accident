import { User } from './schema';

//auth middleware
//token을 찾으면 req.token에 token과 user정보를 넣어준다.
//auth는 /auth 혹은 로그아웃 회원정보 수정및 여러가지 요소에 인증을 위한 요소로 사용이 된다.

let auth = (req, res, next) => {
  let token = req.cookies.x_auth;

  User.findByToken(token)
    .then((user) => {
      if (!user) return res.json({ isAuth: false, error: true });
      req.token = token;
      req.user = user;
      next();
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = { auth };
