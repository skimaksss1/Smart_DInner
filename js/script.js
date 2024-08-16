function update(percentage) {
    var width = 120,
        height = 120,
        cx = width / 2,
        cy = height / 2,
        start_angle = 0,
        barsize = 10;
  
    var r = Math.min(cx, cy) - barsize/2;
    
    if (percentage === 100) {
      percentage -= 0.0001;
    }
    
    var end_angle = start_angle + percentage * Math.PI * 2/100;
  
    var x1 = cx + r * Math.sin(start_angle),
        y1 = cy - r * Math.cos(start_angle),
        x2 = cx + r * Math.sin(end_angle),
        y2 = cy - r * Math.cos(end_angle);
  
    // This is a flag for angles larger than than a half circle
    // It is required by the SVG arc drawing component
    var big = 0;
    if (end_angle - start_angle > Math.PI) big = 1;
  
    // This string holds the path details
    var d = "M" + x1 + "," + y1 +     // Start at (x1,y1)
        " A" + r + "," + r +       // Draw an arc of radius r
        " 0 " + big + " 1 " +      // Arc details...
        x2 + "," + y2;
  
    $('#path').attr('d', d);
  }
  
  function animate(start, finish) {
    setTimeout(function () {
      update(start)
      $('.progress__content').text(start + '%');
      start += 1;
      if (start <= finish) {
        animate(start, finish);
      } else {
        return;
      }
    }, 10);
  }
  
  
  $(document).ready(function () {
  
     animate(0, 60);
    
  });
  
  function selectClass(event, dropdownId) {
    event.preventDefault();
    const selectedClass = event.target.textContent;
    document.querySelector(`#${dropdownId} .dropbtn`).textContent = selectedClass;
}


function sortTable(n) {
  const table = document.getElementById("employeeTable");
  let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  switching = true;
  dir = "asc"; 

  while (switching) {
      switching = false;
      rows = table.rows;

      for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];

          if (dir == "asc") {
              if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                  shouldSwitch = true;
                  break;
              }
          } else if (dir == "desc") {
              if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                  shouldSwitch = true;
                  break;
              }
          }
      }
      if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          switchcount++;
      } else {
          if (switchcount == 0 && dir == "asc") {
              dir = "desc";
              switching = true;
          }
      }
  }

  const headers = table.getElementsByTagName("th");
  for (i = 0; i < headers.length; i++) {
      headers[i].classList.remove("asc", "desc");
  }
  headers[n].classList.add(dir);
}



function selectDate() {
  var date = document.getElementById("calendar").value;
  document.querySelector(".dropbtn2").textContent = date;
}