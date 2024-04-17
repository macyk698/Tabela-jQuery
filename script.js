$(document).ready(function() {
    // Inicjujemy DataTables z pustymi danymi
    var table = $('#przyklad').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.11.5/i18n/Polish.json" // Dodajemy plik z tłumaczeniem na język polski
        },
        "columns": [
            { "data": "name" }, // Nazwa repozytorium
            { "data": "full_name" }, // Pełna nazwa repozytorium
            { "data": "owner.login" }, // Login właściciela
            { "data": "html_url" } // Link do repozytorium
        ],
        "order": [[ 0, "asc" ]],
        "paging": true,
        "searching": true,
        "deferRender": true,
        "lengthMenu": [ [10, 25, 50, 100, 150, -1], [10, 25, 50, 100, 150, "All"] ], // Możliwość wyboru ilości wpisów na stronie
        "pagingType": "full_numbers", // Typ paginacji
        "lengthChange": true, // Umożliwienie zmiany ilości wpisów na stronie
        "ajax": {
            "url": "https://api.github.com/repositories",
            "dataSrc": ""
        },
        "createdRow": function (row, data, index) {
            $(row).addClass('parent');
            $(row).attr('data-details', JSON.stringify(data));
        }
    });

    // Rozwijane wiersze
    $('#przyklad tbody').on('click', 'td', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        var rowData = JSON.parse(tr.attr('data-details'));

        if (row.child.isShown()) {
            // Wiersz jest już rozwinięty - ukryj go
            row.child.hide();
            tr.removeClass('shown');
        } else {
            // Rozwiń wiersz, aby pokazać dodatkowe informacje
            row.child(format(rowData)).show();
            tr.addClass('shown');
        }
    });

    // Formatowanie dodatkowych danych do rozwijanych wierszy
    function format(data) {
        return '<div>'+
            '<p><strong>Opis:</strong> ' + (data.description || 'Brak') + '</p>' +
            '<p><strong>Liczba gwiazdek:</strong> ' + data.stargazers_count + '</p>' +
            '<p><strong>Data utworzenia:</strong> ' + data.created_at + '</p>' +
            '<p><strong>Ostatnia aktualizacja:</strong> ' + data.updated_at + '</p>' +
        '</div>';
    }
});
