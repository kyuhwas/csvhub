// find all files in the page
files = document.querySelectorAll("div#files.diff-view .file");
for (var f = 0; f < files.length; f++) {

  // check if this is a CSV file
  filename = files[f].querySelector("[data-path]").getAttribute('data-path');
  if (filename.match(".*\.csv")) {

    // Get all diff lines
    lines = files[f].querySelectorAll(".diff-line-pre");

    // Get data
    var old_data = []
    var new_data = []

    for (var l = 0; l < lines.length; l++) {

      line = lines[l].textContent;

      if (line.indexOf("+") == 0) {
        new_data.push(line.substr(1).split(","));
      }
      if (line.indexOf("-") == 0) {
        old_data.push(line.substr(1).split(","));
      }
      if (line.indexOf(" ") == 0) {
        new_data.push(line.substr(1).split(","));
        old_data.push(line.substr(1).split(","));
      }
    }

    var old_table = new coopy.CoopyTableView(old_data);
    var new_table = new coopy.CoopyTableView(new_data);

    var alignment = coopy.compareTables(old_table,new_table).align();

    var data_diff = [];
    var table_diff = new coopy.CoopyTableView(data_diff);

    var flags = new coopy.CompareFlags();
    var highlighter = new coopy.TableDiff(alignment,flags);
    highlighter.hilite(table_diff);

    var diff2html = new coopy.DiffRender();
    diff2html.render(table_diff);
    diff_html = diff2html.html()

    files[f].querySelector("div.data").innerHTML = diff_html;

  }

}