import db from '../db/db';
import { auth } from '../db/auth';
import express from 'express';
import { User } from '../db/schema';
import { Project } from '../db/projectSchema';
import { Commit } from '../db/commitSchema';

// UI 모두 완료
const featureRouter = express.Router();

db;

// get/myprojects 완료
featureRouter.get('/myprojects', auth, function (req, res) {
  let lis = '';
  let i;
  for (i = 0; i < req.user.project.length; i++) {
    lis += `<div>
          <div class="title"><form method = "post" action="/projectinfo"><input type="submit" name = "pname" class="button" value="${
            req.user.project[i].Pname
          }"></input></form></div>
          <div class="writer">${req.user.project[i].category}</div>
          <div class="writer">${req.user.project[i].participant}</div>
          <div class="date">${req.user.project[i].context}</div>
          <div class="count">${req.user.project[i].commit[req.user.project[i].commit.length - 1].Cname}</div>
    </div>`;
  }
  // 자바스크립트 새로운 표준 formatted text 기능
  // ` `(grave accent) 사용을 통해서 JS에서 여려줄의 코드를 넣을 수 없는 문제를 해결
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
                      <h1 class="mt-4">나의 프로젝트 <a href="/writeproject"><button >새 프로젝트 개시</button></a></h1>
                      <ol class="breadcrumb mb-4">
                          <li class="breadcrumb-item active">프로젝트 이력을 남겨보세요!</li>
                      </ol>
  
                      <div class="card mb-4">
                          <div class="card-header">
                              <i class="fas fa-table me-1"></i>
                              참여중인 프로젝트
                          </div>
                          
                          <div class="board_list_wrap">
                            <div class="board_list">
                                <div class="top">
                                          <div class = "title">프로젝트 명</div>
                                          <div class = "writer">분야</div>
                                          <div class = "writer">참여자</div>
                                          <div class = "date">내용</div>
                                          <div class = "count">최근 커밋</div>
                                </div>
                                  
                                      ${lis}
  
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

featureRouter.get('/projects', auth, function (req, res) {
  let lis = '';
  let i;
  Project.find({})
    .exec()
    .then((projects) => {
      for (i = 0; i < projects.length; i++) {
        lis += `<div>
                <div class="title"><form method = "post" action="/projectinfo1"><input type="submit" name = "pname" class="button" value="${
                  projects[i].Pname
                }"></input></form></div>
                <div class="writer">${projects[i].category}</div>
                <div class="writer">${projects[i].participant}</div>
                <div class="date">${projects[i].context}</div>
                <div class="count">${projects[i].commit[projects[i].commit.length - 1].Cname}</div>
          </div>`;
      }
    })
    .then(() => {
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
                            <h1 class="mt-4">모두의 프로젝트 <a href="/writeproject"><button >새 프로젝트 개시</button></a></h1>
                            <ol class="breadcrumb mb-4">
                                <li class="breadcrumb-item active">프로젝트를 탐색해보세요</li>
                            </ol>
        
                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-table me-1"></i>
                                    참여중인 프로젝트
                                </div>
                                
                                <div class="board_list_wrap">
                                  <div class="board_list">
                                      <div class="top">
                                                <div class = "title">프로젝트 명</div>
                                                <div class = "writer">분야</div>
                                                <div class = "writer">참여자</div>
                                                <div class = "date">내용</div>
                                                <div class = "count">최근 커밋</div>
                                      </div>
                                        
                                            ${lis}
        
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

  // 자바스크립트 새로운 표준 formatted text 기능
  // ` `(grave accent) 사용을 통해서 JS에서 여려줄의 코드를 넣을 수 없는 문제를 해결
});

// get/writeproject 완료
featureRouter.get('/writeproject', auth, function (req, res) {
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
              <h4>프로젝트를 등록해보세요.</h4>
              <div id="write_area" style="margin: center;">
                  <form method="post" action="/myprojects">
                      <div id="in_title">
                          <input id="pass" type="text" class="form-control" placeholder = "프로젝트 명" name="pname" style="width:600px;height:100px;font-size:15px;">
                      </div>
                      <div id="in_title">
    
                          <input id="id" type="text" class="form-control"  placeholder="카테고리" name="category" style="width:600px;height:100px;font-size:15px;">
                      </div>
      
                      <div class="wi_line"></div>
                      <div id="in_content">
                          <input id="pass" type="text" class="form-control" placeholder="내용" name="context" style="width:600px;height:600px;font-size:15px;">
                      </div>
    
                      <div class="bt_se">
                          <input type="submit" class="button" value="프로젝트 등록">
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

// get/writecommit 완료
featureRouter.get('/writecommit', auth, function (req, res) {
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
                <h4>${req.query['onPname']} 프로젝트에</h4>
                <h4>커밋을 등록해보세요.</h4>
                <div id="write_area" style="margin: center;">
                    <form method="post" action="/addcommits">
                    <input type="hidden" name="onPname" value="${req.query['onPname']}">
                    <input type="hidden" name="onCname" value="${req.query['onCname']}">
                        <div id="in_title">
                            <input id="pass" type="text" class="form-control" placeholder = "커밋 명" name="cname" style="width:600px;height:100px;font-size:15px;">
                        </div>
        
        
                        <div class="wi_line"></div>
                        <div id="in_content">
                            <input id="pass" type="text" class="form-control" placeholder="내용" name="context" style="width:600px;height:600px;font-size:15px;">
                        </div>
        
                        <input type="file" name="file" class ="form-control"/>
        
        
                        <div class="bt_se">
                            <input type="submit" class="button" value="커밋">
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

// post/myprojects 완료
featureRouter.post('/myprojects', auth, (req, res) => {
  const project = new Project({
    Pname: req.body.pname,
    category: req.body.category,
    participant: [req.user.name],
    context: req.body.context,
    commit: {
      Cname: 'Initialize',
      participant: req.user.name,
      Pname: req.body.pname,
      file: '',
      pointer: 'Initialize',
      context: 'Initialized commit',
    },
  });
  const initcommit = new Commit({
    Cname: 'Initialize',
    participant: req.user.name,
    Pname: req.body.pname,
    file: '',
    pointer: 'Initialize',
    context: 'Initialized commit',
  });
  req.user.project.push(project);
  User.findOneAndUpdate({ _id: req.user._id }, { project: req.user.project }, (err) => {
    if (err) return res.json({ success: false, err });
  });
  initcommit.save((err) => {
    if (err) return res.json({ messeage: 'FAIL', err });
  });
  project.save((err) => {
    if (err) return res.json({ success: false, err });
    return res.redirect('/myprojects');
  });
});

// post/addcommits 완료
featureRouter.post('/addcommits', auth, (req, res) => {
  const pcommit = new Commit({
    Cname: req.body.cname,
    Pname: req.body.onPname,
    file: req.body.file,
    participant: req.user.name,
    context: req.body.context,
    pointer: req.body.onCname,
  });

  var i = 0;
  let howManyTimes = req.user.project.length;
  function f() {
    i++;
    if (i < howManyTimes) {
      setTimeout(f, 2000);
    }
  }

  while (i < howManyTimes) {
    if (req.user.project[i].Pname == req.body.onPname) {
      break;
    }
    f();
  }

  req.user.project[i].commit.push(pcommit);

  Project.findOneAndUpdate({ Pname: req.body.onPname }, { $push: { commit: pcommit } }, (err) => {
    if (err) return { err };
  });

  User.findOneAndUpdate({ _id: req.user._id }, { project: req.user.project }, (err) => {
    if (err) return { err }; //res.json({ success: false, err });
  });

  let j = 0;
  function g() {
    j++;
    if (j < req.user.project[i].participant.length) {
      setTimeout(f, 2000);
    }
  }

  while (j < req.user.project[i].participant.length) {
    User.findOne({ name: req.user.project[i].participant[j] })
      .exec()
      .then((theUser) => {
        theUser.project = theUser.project.filter((v) => v.Pname != req.user.project[i].Pname);

        theUser.project.push(req.user.project[i]);

        return theUser;
      })
      .then((theUser) => {
        User.findOneAndUpdate({ name: theUser.name }, { project: theUser.project }, (err) => {
          if (err) return { err };
        });
      });
    g();
  }

  if (j == req.user.project[i].participant.length) {
    pcommit.save((err) => {
      if (err) return err; //res.json({ success: false, err });
      return res.redirect('/myprojects');
    });
  }
});

export default featureRouter;
