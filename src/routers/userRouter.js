import db from '../db/db';
import { User } from '../db/schema';
import { Note } from '../db/noteschema';
import { auth } from '../db/auth';
import express from 'express';

//UI 모두 완료
const userRouter = express.Router();

db;

userRouter.use(express.static(__dirname + '/html'));

userRouter.get('/login', (req, res) => {
  res.sendFile(__dirname + '/html/login1.html');
});

userRouter.get('/myprofile', auth, (req, res) => {
  let theUser = req.user;
  var output = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Project management</title>
        <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" />
        <link href="css/styles.css" rel="stylesheet" />
        <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="css/css.css">
    </head>
    
    <body class="sb-nav-fixed">
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <!-- Navbar Brand-->
            <a class="navbar-brand ps-3" href="/main">청년 예술인</a>
            <!-- Sidebar Toggle-->
            
        </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading">나의 프로필</div>
                            <a class="nav-link" href="/myprofile">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                나의 프로필
                            </a>
                            <a class="nav-link" href="/editintro">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                자기소개 수정하기
                            </a>
                            
                            <div class="sb-sidenav-menu-heading">프로젝트</div>
                           
                            <a class="nav-link" href="/myprojects">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                나의 프로젝트
                              </a>
                            
                          <a class="nav-link" href="/projects">
                              <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                              모두의 프로젝트
                            </a>

                        <a class="nav-link" href="/writeproject">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            프로젝트 등록하기
                          </a>
                        
                          <a class="nav-link" href="/invitepart">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            구성원 초대하기
                          </a>
  
                            <div class="sb-sidenav-menu-heading">커뮤니케이션</div>
                            <a class="nav-link" href="/mynotes">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                쪽지
                            </a>
                            <a class="nav-link" href="/writenote">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                쪽지보내기
                            </a>
                            <a class="nav-link">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                <form method = "post" action = "/findintro">
                                <input type= "text" class = "form-control" placeholder= "ID로 사용자 검색" name ="name">
                                <input type="submit" class="button" value="검색">
                                </form>
                            </a>
                            
                            <div class="sb-sidenav-menu-heading">계정</div>
                            <a class="nav-link" href="/logout">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                로그아웃
                            </a>
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div class="small">${req.user.name}님</div>
                        반갑습니다
                    </div>
                </nav>
            </div>
            <div id="layoutSidenav_content" style="margin: center;">
                
                <<div class="container-fluid px-4">
                <h1 class="mt-4">${theUser.name}님의 프로필</h1>
                <ol class="breadcrumb mb-4">
                    <li class="breadcrumb-item active">자기소개 : ${theUser.intro}</li>
                </ol>

                <div class="card mb-4">
                    <div class="card-header">
                        <i class="fas fa-table me-1"></i>
                        계정 정보
                    </div>
                    
                    <div class="board_list_wrap">
                      <div class="board_list">
                          <div class="top">
                                    <div class = "title">ID : ${theUser.id}</div>
                                    
                                         
                          </div>
                          <div class="top">
                                    
                                    <div class = "title">이름 : ${theUser.name}</div>
                                         
                          </div>
                          <div class="top">
                          <div class = "title">최근 진행 프로젝트 : ${
                            theUser.project[theUser.project.length - 1].Pname
                          }</div>
                                         
                          </div>

                          <div class="top">
                          <div class = "title">카테고리 : ${theUser.project[theUser.project.length - 1].category}</div>
                                         
                          </div>

                          <div class="top">
                          <div class = "title">작품 진행 상황 </div>
                                         
                          </div>

                          <div class="top">
                          <div class = "title">
                            
                       <img src= "/file/${
                         theUser.project[theUser.project.length - 1].commit[
                           theUser.project[theUser.project.length - 1].commit.length - 1
                         ].file
                       }"  width="300" height="300"> </div>
                                         
                          </div>
                          <div class="top">
                          <div class = "title">
                            
                          <a type = "button" href = "/editintro">자기소개 수정하기<a></div>
                                         
                          </div>
                          
                         
                          </div>
                          
                            
                      </div>
                      
                </div>
            </div>
                </div>
            </div>
                
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Young Artist 2022</div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
            crossorigin="anonymous"></script>
        <script src="js/scripts.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
        <script src="assets/demo/chart-area-demo.js"></script>
        <script src="assets/demo/chart-bar-demo.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossorigin="anonymous"></script>
        <script src="js/datatables-simple-demo.js"></script>
    </body>
    
    </html>`;
  res.send(output);
});

userRouter.get('/writenote', auth, (req, res) => {
  var output = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="description" content="" />
      <meta name="author" content="" />
      <title>Project management</title>
      <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" />
      <link href="css/styles.css" rel="stylesheet" />
      <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
      <link rel="stylesheet" href="css/css.css">
  </head>
  
  <body class="sb-nav-fixed">
      <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          <!-- Navbar Brand-->
          <a class="navbar-brand ps-3" href="/main">청년 예술인</a>
          <!-- Sidebar Toggle-->
          <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i
                  class="fas fa-bars"></i></button>
      </nav>
      <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
              <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                  <div class="sb-sidenav-menu">
                      <div class="nav">
                      <div class="sb-sidenav-menu-heading">나의 프로필</div>
                      <a class="nav-link" href="/myprofile">
                          <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                          나의 프로필
                      </a>
                      <a class="nav-link" href="/editintro">
                          <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                          자기소개 수정하기
                      </a>
                      
                      <div class="sb-sidenav-menu-heading">프로젝트</div>
                     
                      <a class="nav-link" href="/myprojects">
                          <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                          나의 프로젝트
                        </a>
                      
                    <a class="nav-link" href="/projects">
                        <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                        모두의 프로젝트
                      </a>

                  <a class="nav-link" href="/writeproject">
                      <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                      프로젝트 등록하기
                    </a>
                  
                    <a class="nav-link" href="/invitepart">
                      <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                      구성원 초대하기
                    </a>


                      <div class="sb-sidenav-menu-heading">커뮤니케이션</div>
                      <a class="nav-link" href="/mynotes">
                          <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                          쪽지
                      </a>
                      <a class="nav-link" href="/writenote">
                          <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                          쪽지보내기
                      </a>
                      <a class="nav-link">
                          <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                          <form method = "post" action = "/findintro">
                          <input type= "text" class = "form-control" placeholder= "ID로 사용자 검색" name ="name">
                          <input type="submit" class="button" value="검색">
                          </form>
                      </a>
                      
                      <div class="sb-sidenav-menu-heading">계정</div>
                      <a class="nav-link" href="/logout">
                          <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                          로그아웃
                          </a>
                      </div>
                  </div>
                  <div class="sb-sidenav-footer">
                      <div class="small">${req.user.name}님</div>
                      반갑습니다
                  </div>
              </nav>
          </div>
          <div id="layoutSidenav_content" style="margin: center;">
              
              <div id="board_write style="margin: center ;"">
              <h4>쪽지를 작성해서 소통하세요.</h4>
              <div id="write_area" style="margin: center;">
                  <form method="post" action="/writenote">
                      <div id="in_title">
                          <input id="pass" type="text" class="form-control" placeholder = "받는사람 ID" name="reader" style="width:300px;height:100px;font-size:15px;">
                      </div>
      
                      <div class="wi_line"></div>
                      <div id="in_content">
                          <input id="pass" type="text" class="form-control" placeholder="내용" name="context" style="width:600px;height:600px;font-size:15px;">
                      </div>
    
                      <div class="bt_se">
                          <input type="submit" class="button" value="쪽지 보내기">
                      </div>
                  </form>
              </div>
          </div>
              
              <footer class="py-4 bg-light mt-auto">
                  <div class="container-fluid px-4">
                      <div class="d-flex align-items-center justify-content-between small">
                          <div class="text-muted">Copyright &copy; Young Artist 2022</div>
                      </div>
                  </div>
              </footer>
          </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          crossorigin="anonymous"></script>
      <script src="js/scripts.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
      <script src="assets/demo/chart-area-demo.js"></script>
      <script src="assets/demo/chart-bar-demo.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossorigin="anonymous"></script>
      <script src="js/datatables-simple-demo.js"></script>
  </body>
  
  </html>`;
  res.send(output);
});

userRouter.post('/writenote', auth, (req, res) => {
  const note = new Note({ reader: req.body.reader, writer: req.user.id, context: req.body.context });
  note.save((err) => {
    if (err) return err;
    return res.redirect('/mynotes');
  });
});

userRouter.get('/mynotes', auth, (req, res) => {
  let read = '';
  let write = '';

  Note.find({})
    .exec()
    .then((notes) => {
      let i = 0;
      function f() {
        i++;
        if (i < notes.length) {
          setTimeout(f, 2000);
        }
      }

      while (i < notes.length) {
        if (notes[i].reader == req.user.id) {
          read += `
          <div>
        
          <div class="writer">${notes[i].writer}</div>
          <div class="title">${notes[i].context} </div>
          
          </div>`;
        }
        f();
      }

      return read, notes;
    })
    .then((notes, read) => {
      let i = 0;
      function f() {
        i++;
        if (i < notes.length) {
          setTimeout(f, 2000);
        }
      }

      while (i < notes.length) {
        if (notes[i].writer == req.user.id) {
          write += `
          <div>
          
          <div class="writer">${notes[i].reader}"</div>
          <div class="title">${notes[i].context}</div>
          
          </div>`;
        }
        f();
      }

      return notes, read, write;
    })
    .then(() => {
      console.log(read);
      console.log(write);
      var output = `<!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="description" content="" />
          <meta name="author" content="" />
          <title>Project management</title>
          <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" />
          <link href="css/styles.css" rel="stylesheet" />
          <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
          <link rel="stylesheet" href="css/css.css">
      </head>
      
      <body class="sb-nav-fixed">
          <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
              <!-- Navbar Brand-->
              <a class="navbar-brand ps-3" href="/main">청년 예술인</a>
              <!-- Sidebar Toggle-->
              <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i
                      class="fas fa-bars"></i></button>
    
          </nav>
          <div id="layoutSidenav">
              <div id="layoutSidenav_nav">
                  <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                  <div class="sb-sidenav-menu">
                  <div class="nav">
                      <div class="sb-sidenav-menu-heading">나의 프로필</div>
                            <a class="nav-link" href="/myprofile">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                나의 프로필
                            </a>
                            <a class="nav-link" href="/editintro">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                자기소개 수정하기
                            </a>
                            
                            <div class="sb-sidenav-menu-heading">프로젝트</div>
                           
                            <a class="nav-link" href="/myprojects">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                나의 프로젝트
                              </a>
                            
                          <a class="nav-link" href="/projects">
                              <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                              모두의 프로젝트
                            </a>

                        <a class="nav-link" href="/writeproject">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            프로젝트 등록하기
                          </a>
                        
                          <a class="nav-link" href="/invitepart">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            구성원 초대하기
                          </a>
    
  
                            <div class="sb-sidenav-menu-heading">커뮤니케이션</div>
                            <a class="nav-link" href="/mynotes">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                쪽지
                            </a>
                            <a class="nav-link" href="/writenote">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                쪽지보내기
                            </a>
                            <a class="nav-link">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                <form method = "post" action = "/findintro">
                                <input type= "text" class = "form-control" placeholder= "ID로 사용자 검색" name ="name">
                                <input type="submit" class="button" value="검색">
                                </form>
                            </a>
                            
                            <div class="sb-sidenav-menu-heading">계정</div>
                            <a class="nav-link" href="/logout">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                로그아웃
                            </a>
                        </div>
                      </div>
                      <div class="sb-sidenav-footer">
                          <div class="small">${req.user.name}님</div>
                          반갑습니다
                      </div>
                  </nav>
              </div>
              <div id="layoutSidenav_content">
                  <main>
                      <div class="container-fluid px-4">
                          <h1 class="mt-4">나의 쪽지 <a href="/writenote"><button>쪽지 쓰러가기</button></a></h1>
                          <ol class="breadcrumb mb-4">
                              <li class="breadcrumb-item active">쪽지로 서로 소통하세요!</li>
                              <li class="breadcrumb-item active">소통한 사람의 정보를 보고싶다면 소통한 사람의 id를 클릭하세요!</li>
                          </ol>
      
                          <div class="card mb-4">
                              <div class="card-header">
                                  <i class="fas fa-table me-1"></i>
                                  나에게 온 쪽지
                              </div>
                              
                              <div class="board_list_wrap">
                                <div class="board_list">
                                    <div class="top">
                                              <div class = "writer">보낸 사람</div>
                                             
                                              <div class = "title">내용</div>
                                             
                                    </div>
                                      
                                          ${read}
      
                                </div>
                                <div class="card-header">
                                  <i class="fas fa-table me-1"></i>
                                  내가 보낸 쪽지
                               </div>
    
                                <div class="board_list">
                                    <div class="top">
                                              <div class = "writer">받는 사람</div>
                                      
                                              <div class = "title">내용</div>
                                    
                                    </div>
                                      
                                          ${write}
      
                                </div>
                                
                          </div>
                      </div>
                  </main>
                  <footer class="py-4 bg-light mt-auto">
                      <div class="container-fluid px-4">
                          <div class="d-flex align-items-center justify-content-between small">
                              <div class="text-muted">Copyright &copy; Young Artist 2022</div>
                          </div>
                      </div>
                  </footer>
              </div>
          </div>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
              crossorigin="anonymous"></script>
          <script src="js/scripts.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
          <script src="assets/demo/chart-area-demo.js"></script>
          <script src="assets/demo/chart-bar-demo.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossorigin="anonymous"></script>
          <script src="js/datatables-simple-demo.js"></script>
      </body>
      
      </html>`;
      res.send(output);
    });
});

userRouter.get('/editintro', auth, (req, res) => {
  var output = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="description" content="" />
      <meta name="author" content="" />
      <title>Project management</title>
      <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" />
      <link href="css/styles.css" rel="stylesheet" />
      <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
      <link rel="stylesheet" href="css/css.css">
  </head>
  
  <body class="sb-nav-fixed">
      <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          <!-- Navbar Brand-->
          <a class="navbar-brand ps-3" href="/main">청년 예술인</a>
          <!-- Sidebar Toggle-->
          <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i
                  class="fas fa-bars"></i></button>
      </nav>
      <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
              <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                  <div class="sb-sidenav-menu">
                      <div class="nav">
                      <div class="sb-sidenav-menu-heading">나의 프로필</div>
                      <a class="nav-link" href="/myprofile">
                          <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                          나의 프로필
                      </a>
                      <a class="nav-link" href="/editintro">
                          <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                          자기소개 수정하기
                      </a>
                      
                      <div class="sb-sidenav-menu-heading">프로젝트</div>
                     
                      <a class="nav-link" href="/myprojects">
                          <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                          나의 프로젝트
                        </a>
                      
                    <a class="nav-link" href="/projects">
                        <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                        모두의 프로젝트
                      </a>

                  <a class="nav-link" href="/writeproject">
                      <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                      프로젝트 등록하기
                    </a>
                  
                    <a class="nav-link" href="/invitepart">
                      <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                      구성원 초대하기
                    </a>


                      <div class="sb-sidenav-menu-heading">커뮤니케이션</div>
                      <a class="nav-link" href="/mynotes">
                          <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                          쪽지
                      </a>
                      <a class="nav-link" href="/writenote">
                          <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                          쪽지보내기
                      </a>
                      <a class="nav-link">
                          <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                          <form method = "post" action = "/findintro">
                          <input type= "text" class = "form-control" placeholder= "ID로 사용자 검색" name ="name">
                          <input type="submit" class="button" value="검색">
                          </form>
                      </a>
                      
                      <div class="sb-sidenav-menu-heading">계정</div>
                      <a class="nav-link" href="/logout">
                          <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                          로그아웃
                      </a>
                  </div>
                  </div>
                  <div class="sb-sidenav-footer">
                      <div class="small">${req.user.name}님</div>
                      반갑습니다
                  </div>
              </nav>
          </div>
          <div id="layoutSidenav_content" style="margin: center;">
              
              <div id="board_write style="margin: center ;"">
              <h4>자기소개를 수정하여 사람들에게 보여주세요.</h4>
              <div id="write_area" style="margin: center;">
                  <form method="post" action="/editintro">
                      
                      <div class="wi_line"></div>
                      <div id="in_content">
                          <input id="pass" type="text" class="form-control" placeholder="내용" name="intro" style="width:600px;height:600px;font-size:15px;">
                      </div>
    
                      <div class="bt_se">
                          <input type="submit" class="button" value="자기소개 작성하기">
                      </div>
                  </form>
              </div>
          </div>
              
              <footer class="py-4 bg-light mt-auto">
                  <div class="container-fluid px-4">
                      <div class="d-flex align-items-center justify-content-between small">
                          <div class="text-muted">Copyright &copy; Young Artist 2022</div>
                      </div>
                  </div>
              </footer>
          </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          crossorigin="anonymous"></script>
      <script src="js/scripts.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
      <script src="assets/demo/chart-area-demo.js"></script>
      <script src="assets/demo/chart-bar-demo.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossorigin="anonymous"></script>
      <script src="js/datatables-simple-demo.js"></script>
  </body>
  
  </html>`;
  res.send(output);
});

userRouter.post('/editintro', auth, (req, res) => {
  User.findOneAndUpdate({ name: req.user.name }, { intro: req.body.intro }).then(() => {
    res.redirect('/myprofile');
  });
});

userRouter.post('/findintro', auth, (req, res) => {
  User.findOne({ id: req.body.name }).then((theUser) => {
    if (theUser != null) {
      var output = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Project management</title>
        <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" />
        <link href="css/styles.css" rel="stylesheet" />
        <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="css/css.css">
    </head>
    
    <body class="sb-nav-fixed">
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <!-- Navbar Brand-->
            <a class="navbar-brand ps-3" href="/main">청년 예술인</a>
            <!-- Sidebar Toggle-->
            <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i
                    class="fas fa-bars"></i></button>
  
        </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                <div class="nav">
                    <div class="sb-sidenav-menu-heading">나의 프로필</div>
                    <a class="nav-link" href="/myprofile">
                        <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                        나의 프로필
                    </a>
                    <div class="sb-sidenav-menu-heading">프로젝트</div>
                   
                    <a class="nav-link" href="/myprojects">
                        <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                        진행중인 프로젝트
                      </a>
  
                    <div class="sb-sidenav-menu-heading">커뮤니케이션</div>
                    <a class="nav-link" href="/mynotes">
                        <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                        쪽지
                    </a>
                    <div class="sb-sidenav-menu-heading">계정</div>
                    <a class="nav-link" href="/logout">
                        <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                        로그아웃
                    </a>
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div class="small">${req.user.name}님</div>
                        반갑습니다
                    </div>
                </nav>
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">
                        <h1 class="mt-4">${theUser.name}님의 프로필</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active">자기소개 : ${theUser.intro}</li>
                        </ol>
    
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table me-1"></i>
                                계정 정보
                            </div>
                            
                            <div class="board_list_wrap">
                              <div class="board_list">
                                  <div class="top">
                                            <div class = "title">ID : ${theUser.id}</div>
                                            
                                                 
                                  </div>
                                  <div class="top">
                                            
                                            <div class = "title">이름 : ${theUser.name}</div>
                                                 
                                  </div>
                                  <div class="top">
                                  <div class = "title">최근 진행 프로젝트 : ${
                                    theUser.project[theUser.project.length - 1].Pname
                                  }</div>
                                                 
                                  </div>

                                  <div class="top">
                                  <div class = "title">카테고리 : ${
                                    theUser.project[theUser.project.length - 1].category
                                  }</div>
                                                 
                                  </div>

                                  <div class="top">
                                  <div class = "title">작품 진행 상황 </div>
                                                 
                                  </div>

                                  <div class="top">
                                  <div class = "title">
                                    
                               <img src= "/file/${
                                 theUser.project[theUser.project.length - 1].commit[
                                   theUser.project[theUser.project.length - 1].commit.length - 1
                                 ].file
                               }"  width="300" height="300"> </div>
                                                 
                                  </div>
                                  <div class="top">
                                  <div class = "title">
                                    
                                  <a type = "button" href = "/invitepart">내 프로젝트에 사용자 초대하기<a></div>
                                                 
                                  </div>
                                  
                                 
                                  </div>
                                  
                                    
                              </div>
                              
                        </div>
                    </div>
                </main>
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Young Artist 2022</div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
            crossorigin="anonymous"></script>
        <script src="js/scripts.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
        <script src="assets/demo/chart-area-demo.js"></script>
        <script src="assets/demo/chart-bar-demo.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossorigin="anonymous"></script>
        <script src="js/datatables-simple-demo.js"></script>
    </body>
    
    </html>`;
      res.send(output);
    } else {
      res.send('존재하지 않는 사용자입니다.');
    }
  });
});

userRouter.post('/register', (req, res) => {
  const user = new User(req.body);
  user.save((err) => {
    if (err) return res.json({ success: false, err });
    return res.sendFile(__dirname + '/html/login1.html');
  });
});

userRouter.post('/login', (req, res) => {
  //로그인을할때 아이디와 비밀번호를 받는다
  User.findOne({ id: req.body.id }, (err, user) => {
    if (err) {
      return res.json({
        loginSuccess: false,
        message: '존재하지 않는 아이디입니다.',
      });
    }
    user
      .comparePassword(req.body.password)
      .then((isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: '비밀번호가 일치하지 않습니다',
          });
        }

        user
          .generateToken()
          .then((user) => {
            res.cookie('x_auth', user.token).status(200).redirect('/main');
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      })
      .catch((err) => res.json({ loginSuccess: false, err }));
  });
});

userRouter.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req._id,
    isAuth: true,
    name: req.user.name,
  });
});

userRouter.get('/logout', auth, (req, res) => {
  console.log(req.user.name);
  console.log(req.user.id);
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err) => {
    if (err) return res.json({ success: false, err });
    res.clearCookie('x_auth');
    return res.status(200).redirect('/');
  });
});

export default userRouter;
