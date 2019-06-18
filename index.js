//TODO: Command 수정기능
//TODO: Comment 수정기능
//TODO: Copy 기능
//TODO: New category 기능 (O)
//TODO: Command 추가기능 (O)
//TODO: Command 삭제기능 (O)
//TODO: Comment 삭제기능
//TODO: Command 이동기능
//TODO: 추가기능
//TODO: 접는기능

var categories = [];

function newCategory(category_name) {
  // div class="category"
  if (category_name == null) {
    var new_title = prompt("카테고리의 제목을 입력해주세요");
    if (new_title == null) return;
    var key = "category_" + new_title;
    localStorage.setItem(key, new_title);
  }

  var div = document.createElement("div");
  var str = " category_" + (category_name ? category_name : new_title);
  div.setAttribute("class", "category" + str);
  ////////////////////////////////////////////////////////header
  var category_header = document.createElement("div");
  category_header.setAttribute("class", "category_header");

  var bars = document.createElement("i");
  bars.setAttribute("class", "fas fa-bars");

  var category_title = document.createElement("span");
  category_title.setAttribute("class", "category_title");
  category_title.innerHTML = category_name ? category_name : new_title;

  var plus_circle = document.createElement("i");
  plus_circle.setAttribute("class", "fas fa-plus-circle");
  plus_circle.setAttribute("onclick", "newItem(this)");

  var trash = document.createElement("i");
  trash.setAttribute("class", "fas fa-trash-alt");
  trash.setAttribute("onclick", "deleteCategory(this)");

  category_header.appendChild(bars);
  category_header.appendChild(category_title);
  category_header.appendChild(plus_circle);
  category_header.appendChild(trash);

  var category_body = document.createElement("div");
  category_body.setAttribute("class", "category_body");
  ////////////////////////////////////////////////////////header

  div.appendChild(category_header);
  div.appendChild(category_body);
  var category_container = document.getElementById("category_container");
  category_container.appendChild(div);
}

function newItem(obj, key) {
  ////////////////////////////////////////////////////////body
  if (!key) {
    var key = category_body.parentNode.className.split(" ")[1].split("_")[1];
    key += "_command_" + Math.floor(Math.random() * 1000);
    while (localStorage.getItem(str)) {
      key += Math.floor(Math.random() * 1000);
      //   console.log(str);
    }
  }

  var parent_node = obj.parentNode;
  var category_body = parent_node.nextElementSibling;
  //   console.log(category_body);

  var category_item = document.createElement("div");
  category_item.setAttribute("class", "category_item");

  var category_command = document.createElement("div");
  category_command.setAttribute(
    "class",
    "category_command " + (key ? " " + key : "")
  );

  var copy_button = document.createElement("button");
  copy_button.setAttribute("class", "copy_button");
  copy_button.innerHTML = "copy";

  var command_text = document.createElement("command_text");

  var edit = document.createElement("i");
  edit.setAttribute("class", "far fa-edit");

  var trash = document.createElement("i");
  trash.setAttribute("class", "far fa-trash-alt");
  trash.setAttribute("onclick", "deleteItem(this)");

  //////////////////////////////////
  var category_comment = document.createElement("category_comment");
  category_comment.setAttribute(
    "class",
    "category_comment" + (key ? " " + key.replace("command", "comment") : "")
  );

  var comment_text = document.createElement("span");
  comment_text.setAttribute("class", "comment_text");

  category_body.appendChild(category_item);
  category_item.appendChild(category_command);
  category_command.appendChild(copy_button);
  category_command.appendChild(command_text);
  category_command.appendChild(edit);
  category_command.appendChild(trash);

  category_comment.appendChild(comment_text);
  category_comment.appendChild(edit);
  category_item.appendChild(category_comment);

  localStorage.setItem(key, command_text.innerHTML);
  key = key.replace("command", "comment");
  localStorage.setItem(key, comment_text.innerHTML);
}

function readItem(obj, key) {
  ////////////////////////////////////////////////////////body
  var category_body = obj.childNodes[1];
  //   console.log(category_body);

  var category_item = document.createElement("div");
  category_item.setAttribute("class", "category_item");

  var category_command = document.createElement("div");
  category_command.setAttribute(
    "class",
    "category_command " + (key ? " " + key : "")
  );

  var copy_button = document.createElement("button");
  copy_button.setAttribute("class", "copy_button");
  copy_button.innerHTML = "copy";

  var command_text = document.createElement("command_text");

  var edit = document.createElement("i");
  edit.setAttribute("class", "far fa-edit");

  var trash = document.createElement("i");
  trash.setAttribute("class", "far fa-trash-alt");
  trash.setAttribute("onclick", "deleteItem(this)");

  //////////////////////////////////
  var category_comment = document.createElement("category_comment");
  category_comment.setAttribute(
    "class",
    "category_comment" + (key ? " " + key.replace("command", "comment") : "")
  );

  var comment_text = document.createElement("span");
  comment_text.setAttribute("class", "comment_text");

  category_body.appendChild(category_item);
  category_item.appendChild(category_command);
  category_command.appendChild(copy_button);
  category_command.appendChild(command_text);
  category_command.appendChild(edit);
  category_command.appendChild(trash);

  category_comment.appendChild(comment_text);
  category_comment.appendChild(edit);
  category_item.appendChild(category_comment);

  if (!key) {
    var str = category_body.parentNode.className.split(" ")[1].split("_")[1];
    str += "_command_" + Math.floor(Math.random() * 1000);
    while (localStorage.getItem(str)) {
      str += Math.floor(Math.random() * 1000);
      //   console.log(str);
    }
    localStorage.setItem(str, command_text.innerHTML);
    str = str.replace("command", "comment");
    localStorage.setItem(str, comment_text.innerHTML);
  }
}

function deleteCategory(obj) {
  var parent_node = obj.parentNode.parentNode.parentNode;
  //   console.log(obj.parentNode.parentNode);
  var key = obj.parentNode.parentNode.className.split(" ")[1];
  //   console.log(key);
  parent_node.removeChild(obj.parentNode.parentNode);
  localStorage.removeItem(key);
}

function deleteItem(obj) {
  var parent_node = obj.parentNode.parentNode.parentNode;
  //   console.log(obj.parentNode.parentNode);
  var key = obj.parentNode.parentNode.parentNode.className.split(" ")[1];
  console.log(key);
  parent_node.removeChild(obj.parentNode.parentNode);
  localStorage.removeItem(key);
}

function init() {
  // localStorage에서 categories 읽기
  if (!window.localStorage) {
    alert(
      "localStorage를 지원하지 않는 브라우저입니다. 다른 브라우저를 이용해 주세요."
    );
    return;
  } else {
    for (var i = 0; i < localStorage.length; i++) {
      //   console.log(localStorage.key(i).substr(0, 8));
      if (localStorage.key(i).substr(0, 8) == "category") {
        categories[categories.length] = localStorage.key(i).split("_")[1];
      }
    }
  }
  // categories 생성
  for (var i = 0; i < categories.length; i++) {
    // console.log(categories[i]);
    newCategory(categories[i]);
    var command_prefix = categories[i] + "_command_";
    var comment_prefix = categories[i] + "_comment_";
    var class_name = "category_" + categories[i];
    var node = document.getElementsByClassName(class_name)[0];
    console.log(node);
    for (var j = 0; j < localStorage.length; j++) {
      if (localStorage.key(j).indexOf(command_prefix) != -1) {
        readItem(node, localStorage.key(j));
        // console.log(localStorage.key(j));
      }
    }
  }
}

window.onload = init;