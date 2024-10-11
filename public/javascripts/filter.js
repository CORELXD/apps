document.getElementById("witelFilter").addEventListener("change", function () {
  var filterValue = this.value;
  var rows = document.querySelectorAll(".rekon-row");

  rows.forEach(function (row) {
    var witel = row.getAttribute("data-witel");
    if (filterValue === "" || witel === filterValue) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});
