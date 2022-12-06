import db from '../db/db';
import { auth } from '../db/auth';
import express from 'express';
import { User } from '../db/schema';
import { Project } from '../db/projectSchema';
//import { Commit } from '../db/commitSchema';

// UI 모두 완료
const dynamicRouter = express.Router();

db;

// post/projectinfo 완료
dynamicRouter.post('/projectinfo', auth, (req, res) => {
  var i = 0;
  let howManyTimes = req.user.project.length;
  function f() {
    i++;
    if (i < howManyTimes) {
      setTimeout(f, 2000);
    }
  }
  while (i < howManyTimes) {
    if (req.user.project[i].Pname == req.body.pname) {
      break;
    }
    f();
  }

  let lis = '';
  let j;
  console.log(req.user.project[i].commit.length);
  for (j = req.user.project[i].commit.length - 1; j >= 0; j--) {
    lis += `<div>
    <div class = "writer">${req.user.project[i].commit[j].Cname}</div>
    <div class = "writer">${req.user.project[i].commit[j].participant}</div>
    <div class = "title">${req.user.project[i].commit[j].context}</div>
    <div class = "writer"><img src = '/file/${req.user.project[i].commit[j].file}'  height="200" width="200"></div>
    </div>`;
  }

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
          <!-- Navbar Search-->
        
              </div>
          </form>
          <!-- Navbar-->
         
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

          <h1 class="mt-4">${req.user.project[i].Pname}</h1>
          <ol class="breadcrumb mb-4">
              <li class="breadcrumb-item active">프로젝트의 상세 커밋들</li>
          </ol>
          <div class="board_list">
          <div class="top">
                    <div class = "writer">커밋명</div>
                    <div class = "writer">커밋 제출자</div>
                    <div class = "title">내용</div>
                    <div class = "writer">작품 미리보기</div>
          </div>
            
                ${lis}

      
         </div>
                  
  
  
                  <div class="bt_se">
                      <form method = "get" action = "/writecommit"><input type="hidden" name="onPname" value="${
                        req.user.project[i].Pname
                      }"><input type="hidden" name="onCname" value="${
    req.user.project[i].commit[req.user.project[i].commit.length - 1].Cname
  }"><button>커밋 등록하기</button></form>
                      <a></a>
                      <form method = "get" action = "/invitepart1"><input type="hidden" name="Pname" value="${
                        req.user.project[i].Pname
                      }"><button>참여자 추가하기</button></form>
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
dynamicRouter.post('/projectinfo1', auth, (req, res) => {
  var i = 0;
  let howManyTimes = req.user.project.length;
  function f() {
    i++;
    if (i < howManyTimes) {
      setTimeout(f, 2000);
    }
  }
  while (i < howManyTimes) {
    if (req.user.project[i].Pname == req.body.pname) {
      break;
    }
    f();
  }

  let lis = '';
  let j;
  console.log(req.user.project[i].commit.length);
  for (j = req.user.project[i].commit.length - 1; j >= 0; j--) {
    lis += `<div>
      <div class = "writer">${req.user.project[i].commit[j].Cname}</div>
      <div class = "writer">${req.user.project[i].commit[j].participant}</div>
      <div class = "title">${req.user.project[i].commit[j].context}</div>
      <div class = "writer"><img src = '/file/${req.user.project[i].commit[j].file}'  height="200" width="200"></div>
      </div>`;
  }

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
            <!-- Navbar Search-->
          
                </div>
            </form>
            <!-- Navbar-->
           
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
  
            <h1 class="mt-4">${req.user.project[i].Pname}</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item active">프로젝트의 상세 커밋들</li>
            </ol>
            <div class="board_list">
            <div class="top">
                      <div class = "writer">커밋명</div>
                      <div class = "writer">커밋 제출자</div>
                      <div class = "title">내용</div>
                      <div class = "writer">작품 미리보기</div>
            </div>
              
                  ${lis}
  
        
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

// get/invitepart 완료
dynamicRouter.get('/invitepart', auth, (req, res) => {
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
            <!-- Navbar Search-->
            
                </div>
            </form>
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
            <h4>참가자를 추가해보세요</h4>
            <div id="write_area" style="margin: center;">
                <form method="post" action="/invitepart">
                    <div id="in_title">
                        <input id="pass" type="text" class="form-control" placeholder = "프로젝트명" name="pname" style="width:600px;height:100px;font-size:15px;">
                    </div>
                    <div id="in_title">
                        <input id="pass" type="text" class="form-control" placeholder = "초대할 사람 아이디" name="id" style="width:600px;height:100px;font-size:15px;">
                    </div>
                    <div id="in_title">
                        <input id="pass" type="text" class="form-control" placeholder = "초대할 사람 이름" name="name" style="width:600px;height:100px;font-size:15px;">
                    </div>
                
                    <div class="bt_se">
                        <input type="submit" class="button" value="초대하기">
                    </div>
                </form>
            </div>
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

dynamicRouter.get('/invitepart1', auth, (req, res) => {
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
              <!-- Navbar Search-->
              
                  </div>
              </form>
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
              <h4>${req.query['Pname']} 프로젝트에 </h4>
              <h4>참가자를 추가해보세요</h4>
              <div id="write_area" style="margin: center;">
                  <form method="post" action="/invitepart">
                      <div id="in_title">
                      <input type="hidden" name="pname" value="${req.query['Pname']}">
                      </div>
                      <div id="in_title">
                          <input id="pass" type="text" class="form-control" placeholder = "초대할 사람 아이디" name="id" style="width:600px;height:100px;font-size:15px;">
                      </div>
                      <div id="in_title">
                          <input id="pass" type="text" class="form-control" placeholder = "초대할 사람 이름" name="name" style="width:600px;height:100px;font-size:15px;">
                      </div>
                  
                      <div class="bt_se">
                          <input type="submit" class="button" value="초대하기">
                      </div>
                  </form>
              </div>
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
// post/invitepart 완료
dynamicRouter.post('/invitepart', auth, (req, res) => {
  var i = 0;
  let howManyTimes = req.user.project.length;
  function f() {
    i++;
    if (i < howManyTimes) {
      setTimeout(f, 2000);
    }
  }
  while (i < howManyTimes) {
    if (req.user.project[i].Pname == req.body.pname) {
      req.user.project[i].participant.push(req.body.name);
      break;
    }
    f();
  }
  User.findOneAndUpdate({ _id: req.user._id }, { project: req.user.project }, (err) => {
    if (err) return res.json({ message: 'failed', err });
  });

  User.findOneAndUpdate({ id: req.body.id }, { $push: { project: req.user.project[i] } }, (err) => {
    if (err) return res.json({ message: 'error!!', err });
  });

  Project.findOneAndUpdate({ Pname: req.body.pname }, { $push: { participant: req.body.name } }, (err) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).redirect('/myprojects');
  });
});
export default dynamicRouter;
