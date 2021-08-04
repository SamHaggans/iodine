let sources;
$('document').ready(function () {
  loadTable();
});

function loadTable() {
  $.get('/getSourcesList').always(function (response) {
    if (response.ok) {
      sources = response.sources;
      renderTable(sources);
    }
  });
}

function filterSources() {
  let search = document.getElementById('search').value;
  const filteredSources = sources.filter(source => source.description.toLowerCase().includes(search));
  renderTable(filteredSources);
}

function renderTable(sources) {
  let html = `
    <table>
      <tr>
        <th>DB_ID</th>
        <th>NDB No.</th>
        <th>TDS No.</th>
        <th>Description</th>
        <th>n</th>
        <th>Iodine mcg/100g</th>
        <th>SD</th>
        <th>Min</th>
        <th>Max</th>
        <th>Source(s)</th>
      </tr>
    `;

    for (source of sources) {
      html += `
      <tr>
        <td>${source.id}</td>
        <td>${source.NDB}</td>
        <td>${source.TDS}</td>
        <td>${source.description}</td>
        <td>${source.n}</td>
        <td>${source.mcg}</td>
        <td>${source.SD}</td>
        <td>${source.min}</td>
        <td>${source.max}</td>
        <td>${source.sources}</td>
      `;
    }

    html += `</table>`;
    $('.container').html(html);
}
