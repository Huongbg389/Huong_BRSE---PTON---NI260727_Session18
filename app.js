// Xây dựng một ứng dụng quản lý danh sách sinh viên với các chức năng:
// Thêm sinh viên mới: Nhập thông tin sinh viên (tên, tuổi, lớp)
// vào một biểu mẫu và thêm vào danh sách.
// Hiển thị danh sách sinh viên: Thông tin sinh viên sẽ được hiển thị dưới dạng bảng.
// Xóa sinh viên: Mỗi dòng trong bảng có một nút xóa để xóa sinh viên khỏi danh sách.
// Sửa thông tin sinh viên: Khi bấm nút "Sửa", cho phép chỉnh sửa thông tin sinh viên.
// Tìm kiếm sinh viên: Tìm kiếm sinh viên theo tên.

// CRUD => R - C - D - U

// B1: Tạo dữ liệu mẫu => Chuyển dữ liệu mẫu lên Local
let students = JSON.parse(localStorage.getItem("students")) || [];

// B2: Hiển thị dữ liệu ra màn hình
// B2.1: Xác định dữ liệu hiển thị trong cấu trúc HTML
let tBody = document.getElementById("table-body");

function renderStudent() {
  tBody.innerHTML = "";

  students.forEach((element) => {
    // Mỗi lần lặp sinh ra thêm 1 tr
    let tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${element.fullName}</td>
      <td>${element.age}</td>
      <td>${element.class}</td>
      <td>
        <div class="action-buttons">
          <button id="${element.id}" class="btn-edit">Sửa</button>
          <button id="${element.id}" class="btn-delete">Xóa</button>
        </div>
      </td>
    `;

    tBody.appendChild(tr);
  });
}

renderStudent();

// Mỗi khi người dùng thao tác trên web
// => ảnh hưởng/thay đổi trạng thái của trang
// => render lại trang


// B3: Thực hiện chức năng C - Thêm mới sinh viên
let btnAdd = document.getElementById("btn-add");

btnAdd.addEventListener("click", function (e) {
  e.preventDefault();

  // Người dùng nhập dữ liệu => Lấy dữ liệu người dùng nhập
  let inputName = document.getElementById("name").value;
  let inputAge = document.getElementById("age").value;
  let inputClass = document.getElementById("class").value;

  // Tạo đối tượng mới
  let newStudent = {
    id: Date.now(),
    fullName: inputName,
    age: inputAge,
    class: inputClass,
  };

  // Đưa đối tượng mới vào bên trong mảng students
  students.push(newStudent);

  // Đưa dữ liệu mới lên Local
  localStorage.setItem("students", JSON.stringify(students));

  // Hiển thị lại dữ liệu
  renderStudent();

  // Xóa dữ liệu người dùng vừa nhập
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("class").value = "";
});


// U - D - Tìm kiếm

// e.target
// e.target.classList.contains("className")

tBody.addEventListener("click", function (e) {

  // DELETE - XÓA SINH VIÊN

  if (e.target.classList.contains("btn-delete")) {

    // Lấy id của sinh viên cần xóa
    let deleteID = Number(e.target.id);
     console.log(deleteID);
    //Su dung vong lap for => index 
     let flag= -1
     for (let i = 0; i < students.length; i++) {
       if(students[i].id === deleteID){
         flag=i;
         break;
       }
     }

    // Tìm index của sinh viên cần xóa
    let deleteIndex = students.findIndex(
      (student) => student.id === deleteID
    );

    // Xóa phần tử trong mảng
    students.splice(deleteIndex, 1);

    // Đưa dữ liệu mới lên Local
    localStorage.setItem(
      "students",
      JSON.stringify(students)
    );

    // Render lại dữ liệu
    renderStudent();
  }
    // UPDATE - SỬA SINH VIÊN


    if (e.target.classList.contains("btn-edit")) {

    // Lấy id của sinh viên cần sửa
    let editID = Number(e.target.id);

    console.log(editID);

    // Tìm sinh viên theo id
    let findStudent = students.find(
      (student) => student.id === editID
    );

    console.log(findStudent);

    // Đưa thông tin sinh viên lên input
    document.getElementById("name").value =
      findStudent.fullName;

    document.getElementById("age").value =
      findStudent.age;

    document.getElementById("class").value =
      findStudent.class;

    // Thay đổi nút Thêm sinh viên thành nút Cập nhật
    document.getElementById("btn-add").style.display =
      "none";

    document.getElementById("btn-update").style.display =
      "inline-block";

    // Lưu id sinh viên đang sửa
    let editStudentID = editID;

    // Gán sự kiện click cho nút Cập nhật
    let btnUpdate = document.getElementById("btn-update");

    btnUpdate.onclick = function (e) {
      e.preventDefault();

      // Lấy thông tin mới người dùng nhập
      let newName = document.getElementById("name").value;
      let newAge = document.getElementById("age").value;
      let newClass = document.getElementById("class").value;

      console.log(newName, newAge, newClass);

      // Tìm sinh viên cần sửa
      let findStudent = students.find(
        (student) => student.id === editStudentID
      );

      // Update dữ liệu mới
      findStudent.fullName = newName;
      findStudent.age = newAge;
      findStudent.class = newClass;

      console.log("Sau khi thay đổi dữ liệu",students);

      // Xóa dữ liệu người dùng vừa nhập
      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
      document.getElementById("class").value = "";

      // Đổi lại nút Cập nhật thành nút Thêm
      document.getElementById("btn-add").style.display =
        "inline-block";

      document.getElementById("btn-update").style.display =
        "none";

      // Đưa dữ liệu mới lên Local
      localStorage.setItem(
        "students",
        JSON.stringify(students)
      );

      // Render lại dữ liệu
      renderStudent();
    };
  }
});

// TÌM KIẾM SINH VIÊN

let btnSearch = document.getElementById("search");

btnSearch.addEventListener("input", function () {

  // Lấy dữ liệu người dùng nhập
  let inputSearch = btnSearch.value.toLowerCase();

  // Xóa dữ liệu cũ
  tBody.innerHTML = "";

  // Duyệt qua mảng students
  students.forEach((student) => {

    // Tìm kiếm theo tên
    if (
      student.fullName.toLowerCase().includes(inputSearch)) {

      let tr = document.createElement("tr");

      tr.innerHTML = `
        <td> ${student.fullName}</td>
        <td> ${student.age}</td>
        <td> ${student.class}</td>
        <td>
          <div class="action-buttons">
            <button id="${student.id}" class="btn-edit">
              Sửa
            </button>
            <button id="${student.id}" class="btn-delete">
              Xóa
            </button>
          </div>
        </td>
      `;

      tBody.appendChild(tr);
    }
  });
});

