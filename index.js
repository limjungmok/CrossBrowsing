//초기 셋팅을 위한 색상값 배열
var initialCount=12;
var color = [
  '#D5E0D0',
  '#AF9FA2',
  '#A592A4',
  '#91979C',
  '#BDC4BA',
  '#9C9294',
  '#928391',
  '#928391',
  '#95A18F',
  '#988185',
  '#A07D9E',
  '#717B85'
];

// Mozilla, Opera, Webkit 에서 dom Ready를 위해
if (document.addEventListener) {
document.addEventListener("DOMContentLoaded", function () {
  document.removeEventListener("DOMContentLoaded", arguments.callee, false);
  domReady();
}, false);
}

// Internet Explorer 에서 dom Ready를 위해
else if (document.attachEvent) {
document.attachEvent("onreadystatechange", function () {
  if (document.readyState === "complete") {
    document.detachEvent("onreadystatechange", arguments.callee);
    domReady();
  }
});
}

//DOM이 모두 로드 되었을 때
function domReady () {
var rootTable = document.getElementById("app_body_list_table");

//초기에 12개의 APP이 일단 셋팅되어있기 위해서
for(var i=0; i<initialCount; i++){
  var newNode = document.createElement("DIV");
  newNode.setAttribute('class', 'app_body_item');


  newNode.setAttribute('id', 'APP'+(i+1));
  newNode.setAttribute('onclick', "handleGetItemId(this.id)");

  var newNodeImg = document.createElement("DIV");
  newNodeImg.setAttribute('class', 'item_img');
  newNodeImg.setAttribute('style', 'background-color:'+ color[i]);

  var newNodeText = document.createElement("DIV");
  newNodeText.setAttribute('class', 'item_title');

  function checkDigit(i){ return i > 8 ? "APP" + (i+1): "APP0" + (i+1);}

  newNodeText.appendChild(document.createTextNode(checkDigit(i)));
  newNode.appendChild(newNodeImg);
  newNode.appendChild(newNodeText);

  rootTable.appendChild(newNode);
}
}

var global_item = -1; //클릭한 버튼의 App id를 담아놓을 전역 변수

function handleDelTab(clicked_id){
//삭제 버튼 누를 때 발생하는 핸들러

var removeApp = document.getElementById(clicked_id);
if(removeApp === null){
  alert('삭제할 APP을 선택 해 주세요');
}else{
  //선택된 App을 숨긴다.
  removeApp.style.display = "none";
  console.log(removeApp);
  alert(removeApp.children[1].childNodes[0].nodeValue+"이(가) 삭제되었습니다.");
  global_item = -1;
}
};

function handleGetItemId(clicked_id){
//App을 선택했을때 발생

//앱 선택후, 삭제하기않고 다른앱을 누르는걸 위해서
if(global_item !== -1){
  document.getElementById(global_item).children[0].style.filter = "brightness(100%)";
}

//선택한 App의 ID값을 참조하는 핸들러
global_item = clicked_id;
var selectedApp = document.getElementById(clicked_id);
selectedApp.children[0].style.filter = "brightness(40%)";
alert(selectedApp.children[1].childNodes[0].nodeValue+" 아이템을 선택하셨습니다. \n좌측 상단의 삭제버튼을 누르면 삭제됩니다.");
}

function handleCompleteTab(){
//완료 버튼 누를 때 발생하는 핸들러

//input태그의 값 참조
var newAppColor = document.getElementById("appColor").value;
var newAppName = document.getElementById("appName").value;

//완료버튼을 누르면 호출되는 APP생성 함수
makeApp(newAppColor, newAppName);
};

function makeApp(color, name){
var isValid = true;

//실제 App 생성, 노드를 만들고 테이블에 추가해주는 부분
if(color === "" || name === ""){
  if(color === "" && name !== ""){
    isValid = false;
    document.getElementById("appColor").value = "";
    document.getElementById("appColor").focus();
    alert("앱 색상 값을 확인하세요.");
  }else if (color !=="" && name === "") {
    if(color.length !==7){
      isValid = false;
      document.getElementById("appColor").value = "";
      document.getElementById("appColor").focus();
      alert("앱 색상값을 6자리 숫자로 지정하세요.");
    }else{
      isValid = false;
      document.getElementById("appName").value = "";
      document.getElementById("appName").focus();
      alert("앱 이름을 확인하세요.");
    }
  }else{
    isValid = false;
    document.getElementById("appName").value = "";
    document.getElementById("appColor").value = "";
    document.getElementById("appColor").focus();
    alert("앱 색상값과 이름값을 모두 확인하세요.");
  }
}else{
  if(color.length !== 7){
    isValid = false;
    document.getElementById("appColor").value = "";
    document.getElementById("appColor").focus();
    alert("앱 색상값을 6자리 숫자로 지정하세요.");
  }
}

if(isValid){
  var rootTable = document.getElementById("app_body_list_table");

  //var count = rootTable.childElementCount + 1;
  ++initialCount;

  var newNode = document.createElement("DIV");
  newNode.setAttribute('class', 'app_body_item');
  newNode.setAttribute('id', 'APP'+initialCount);
  newNode.setAttribute('onclick', "handleGetItemId(this.id)");

  var newNodeImg = document.createElement("DIV");
  newNodeImg.setAttribute('class', 'item_img');
  newNodeImg.setAttribute('style', 'background-color:'+ color);

  var newNodeText = document.createElement("DIV");
  newNodeText.setAttribute('class', 'item_title');
  newNodeText.appendChild(document.createTextNode(name));

  newNode.appendChild(newNodeImg);
  newNode.appendChild(newNodeText);

  rootTable.appendChild(newNode);

  //APP을 만들고, 메인으로 돌아갈지 물어보는 Alert
  var confirm_value = confirm("메인화면으로 돌아가시겠습니까?");
  if(confirm_value){
    //배경바꾸기
    document.getElementById("app_background").style.backgroundImage = 'url(src/app_list_bg.jpg)';

    //완료탭 만들기
    document.getElementById("btn_complete").style.display ="none";
    //취소탭 만들기
    document.getElementById("btn_cancle").style.display ="none";
    //추가탭 만들기
    document.getElementById("btn_add").style.display="block";
    //삭제탭 만들기
    document.getElementById("btn_del").style.display="block";

    //list 보이고, input 태그 숨기기
    document.getElementById("app_body_list_table").style.display = "block";
    document.getElementById("app_body_input_table").style.display = "none";
    document.getElementById("appName").value = "";
    document.getElementById("appColor").value = "";

    alert(name + "이(가) 생성되었습니다");
  }else{
    document.getElementById("appColor").value = "";
    document.getElementById("appName").value = "";
    document.getElementById("appColor").focus();
    alert(name + "이(가) 생성되었습니다");
  }
}
};

function handleCancleTab(){
//취소버튼 누를 때 발생하는 핸들러
//배경바꾸기
app_background.style.backgroundImage = 'url(src/app_list_bg.jpg)';

//완료탭 만들기
document.getElementById("btn_complete").style.display ="none";
//취소탭 만들기
document.getElementById("btn_cancle").style.display ="none";
//추가탭 만들기
document.getElementById("btn_add").style.display="block";
//삭제탭 만들기
document.getElementById("btn_del").style.display="block";

//list 보이고, input 태그 숨기기
document.getElementById("app_body_list_table").style.display = "block";
document.getElementById("app_body_input_table").style.display = "none";

};

function handleAddTab(){
//추가 버튼 눌렀을때
//배경바꾸기
document.getElementById("app_background").style.backgroundImage = 'url(src/app_add_bg.jpg)';

//완료탭 만들기
document.getElementById("btn_complete").style.display ="block";
//취소탭 만들기
document.getElementById("btn_cancle").style.display ="block";
//추가탭 만들기
document.getElementById("btn_add").style.display="none";
//삭제탭 만들기
document.getElementById("btn_del").style.display="none";

//list 숨기고, input 태그 보이기
document.getElementById("app_body_list_table").style.display = "none";
document.getElementById("app_body_input_table").style.display = "block";
}
