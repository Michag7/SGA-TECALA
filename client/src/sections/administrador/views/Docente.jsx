import { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import './Docente.css';

export const Docente = () => {
  const loadDataTable = () => {
    const dataTableOptions = {
      dom: "<'row'<'col-md-4'l><'col-md-5 text-end'B><'col-md-3'f>>rt<'row'<'col-md-6'i><'col-md-6'p>>",
      buttons: [
        {
          extend: 'excelHtml5',
          text: "<i class= 'fa-solid fa-file-csv'></i> Excel",
          titleAttr: 'Exportar a Excel',
          className: 'btn btn-success',
        },
        {
          extend: 'pdfHtml5',
          text: "<i class= 'fa-solid fa-file-pdf'></i> PDF",
          titleAttr: 'Exportar a PDF',
          className: 'btn btn-danger',
        },
        {
          extend: 'print',
          text: "<i class= 'fa-solid fa-print'></i> Print",
          titleAttr: 'Imprimir',
          className: 'btn btn-danger',
        }
      ],
      lengthMenu: [5, 10, 15, 20],
      columnDefs: [
        { orderable: false, targets: [2, 3, 4, 5, 6, 7] },
        { searchable: false, targets: [1] },
        { width: '10%', targets: [0] },
      ],language: {
        "processing": "Procesando...",
        "lengthMenu": "Mostrar _MENU_ registros",
        "zeroRecords": "No se encontraron resultados",
        "emptyTable": "Ningún dato disponible en esta tabla",
        "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
        "infoFiltered": "(filtrado de un total de _MAX_ registros)",
        "search": "Buscar:",
        "infoThousands": ",",
        "loadingRecords": "Cargando...",
        "paginate": {
            "first": "Primero",
            "last": "Último",
            "next": "Siguiente",
            "previous": "Anterior"
        },
        "aria": {
            "sortAscending": ": Activar para ordenar la columna de manera ascendente",
            "sortDescending": ": Activar para ordenar la columna de manera descendente"
        },
        "buttons": {
            "copy": "Copiar",
            "colvis": "Visibilidad",
            "collection": "Colección",
            "colvisRestore": "Restaurar visibilidad",
            "copySuccess": {
                "1": "Copiada 1 fila al portapapeles",
                "_": "Copiadas %ds fila al portapapeles"
            },
            "copyTitle": "Copiar al portapapeles",
            "csv": "CSV",
            "excel": "Excel",
            "pageLength": {
                "-1": "Mostrar todas las filas",
                "_": "Mostrar %d filas"
            },
            "pdf": "PDF",
            "print": "Imprimir",
            "renameState": "Cambiar nombre",
            "updateState": "Actualizar",
            "createState": "Crear Estado",
            "removeAllStates": "Remover Estados",
            "removeState": "Remover",
            "savedStates": "Estados Guardados",
            "stateRestore": "Estado %d"
        },
        "autoFill": {
            "cancel": "Cancelar",
            "fill": "Rellene todas las celdas con <i>%d</i>",
            "fillHorizontal": "Rellenar celdas horizontalmente",
            "fillVertical": "Rellenar celdas verticalmentemente"
        },
        "decimal": ",",
        "searchBuilder": {
            "add": "Añadir condición",
            "button": {
                "0": "Constructor de búsqueda",
                "_": "Constructor de búsqueda (%d)"
            },
            "clearAll": "Borrar todo",
            "condition": "Condición",
            "conditions": {
                "date": {
                    "after": "Despues",
                    "before": "Antes",
                    "between": "Entre",
                    "empty": "Vacío",
                    "equals": "Igual a",
                    "notBetween": "No entre",
                    "notEmpty": "No Vacio",
                    "not": "Diferente de"
                },
                "number": {
                    "between": "Entre",
                    "empty": "Vacio",
                    "equals": "Igual a",
                    "gt": "Mayor a",
                    "gte": "Mayor o igual a",
                    "lt": "Menor que",
                    "lte": "Menor o igual que",
                    "notBetween": "No entre",
                    "notEmpty": "No vacío",
                    "not": "Diferente de"
                },
                "string": {
                    "contains": "Contiene",
                    "empty": "Vacío",
                    "endsWith": "Termina en",
                    "equals": "Igual a",
                    "notEmpty": "No Vacio",
                    "startsWith": "Empieza con",
                    "not": "Diferente de",
                    "notContains": "No Contiene",
                    "notStartsWith": "No empieza con",
                    "notEndsWith": "No termina con"
                },
                "array": {
                    "not": "Diferente de",
                    "equals": "Igual",
                    "empty": "Vacío",
                    "contains": "Contiene",
                    "notEmpty": "No Vacío",
                    "without": "Sin"
                }
            },
            "data": "Data",
            "deleteTitle": "Eliminar regla de filtrado",
            "leftTitle": "Criterios anulados",
            "logicAnd": "Y",
            "logicOr": "O",
            "rightTitle": "Criterios de sangría",
            "title": {
                "0": "Constructor de búsqueda",
                "_": "Constructor de búsqueda (%d)"
            },
            "value": "Valor"
        },
        "searchPanes": {
            "clearMessage": "Borrar todo",
            "collapse": {
                "0": "Paneles de búsqueda",
                "_": "Paneles de búsqueda (%d)"
            },
            "count": "{total}",
            "countFiltered": "{shown} ({total})",
            "emptyPanes": "Sin paneles de búsqueda",
            "loadMessage": "Cargando paneles de búsqueda",
            "title": "Filtros Activos - %d",
            "showMessage": "Mostrar Todo",
            "collapseMessage": "Colapsar Todo"
        },
        "select": {
            "cells": {
                "1": "1 celda seleccionada",
                "_": "%d celdas seleccionadas"
            },
            "columns": {
                "1": "1 columna seleccionada",
                "_": "%d columnas seleccionadas"
            },
            "rows": {
                "1": "1 fila seleccionada",
                "_": "%d filas seleccionadas"
            }
        },
        "thousands": ".",
        "datetime": {
            "previous": "Anterior",
            "next": "Proximo",
            "hours": "Horas",
            "minutes": "Minutos",
            "seconds": "Segundos",
            "unknown": "-",
            "amPm": [
                "AM",
                "PM"
            ],
            "months": {
                "0": "Enero",
                "1": "Febrero",
                "10": "Noviembre",
                "11": "Diciembre",
                "2": "Marzo",
                "3": "Abril",
                "4": "Mayo",
                "5": "Junio",
                "6": "Julio",
                "7": "Agosto",
                "8": "Septiembre",
                "9": "Octubre"
            },
            "weekdays": [
                "Dom",
                "Lun",
                "Mar",
                "Mie",
                "Jue",
                "Vie",
                "Sab"
            ]
        },
        "editor": {
            "close": "Cerrar",
            "create": {
                "button": "Nuevo",
                "title": "Crear Nuevo Registro",
                "submit": "Crear"
            },
            "edit": {
                "button": "Editar",
                "title": "Editar Registro",
                "submit": "Actualizar"
            },
            "remove": {
                "button": "Eliminar",
                "title": "Eliminar Registro",
                "submit": "Eliminar",
                "confirm": {
                    "_": "¿Está seguro que desea eliminar %d filas?",
                    "1": "¿Está seguro que desea eliminar 1 fila?"
                }
            },
            "error": {
                "system": "Ha ocurrido un error en el sistema (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Más información&lt;\\/a&gt;).</a>"
            },
            "multi": {
                "title": "Múltiples Valores",
                "info": "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.",
                "restore": "Deshacer Cambios",
                "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo."
            }
        },
        "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
        "stateRestore": {
            "creationModal": {
                "button": "Crear",
                "name": "Nombre:",
                "order": "Clasificación",
                "paging": "Paginación",
                "search": "Busqueda",
                "select": "Seleccionar",
                "columns": {
                    "search": "Búsqueda de Columna",
                    "visible": "Visibilidad de Columna"
                },
                "title": "Crear Nuevo Estado",
                "toggleLabel": "Incluir:"
            },
            "emptyError": "El nombre no puede estar vacio",
            "removeConfirm": "¿Seguro que quiere eliminar este %s?",
            "removeError": "Error al eliminar el registro",
            "removeJoiner": "y",
            "removeSubmit": "Eliminar",
            "renameButton": "Cambiar Nombre",
            "renameLabel": "Nuevo nombre para %s",
            "duplicateError": "Ya existe un Estado con este nombre.",
            "emptyStates": "No hay Estados guardados",
            "removeTitle": "Remover Estado",
            "renameTitle": "Cambiar Nombre Estado"
        }
      } 
    };

    $(".button-shadow").hover(
      function () {
        $(this).find("i").css("color", "white");
      },
      function () {
        $(this).find("i").css("color", "#1877f2");
      }
    );

    // Verificar si el DataTable ya ha sido inicializado
    if (!$.fn.DataTable.isDataTable('#example')) {
      $('#example').DataTable(dataTableOptions);
    }
  };

  useEffect(() => {
    loadDataTable();
  }, []);


  return (
    <div className="container my-5">
       <div className="contenedor-titulo-docente">
        <p className="bx bx-message-rounded-add"></p>
        <h4>¡Información docentes!</h4>
      </div>
      <div className="row">
        <div className="col-12">
         <div className="data_table">
          <div className="table-responsive">
            <table id="example" className="table table-borderless" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th className="text-center">Cédula</th>
                  <th className="text-center">Nombre</th>
                  <th className="text-center">Foto</th>
                  <th className="text-center">Email</th>
                  <th>Credencial</th>
                  <th>Asignaciones</th>
                  <th>Contraseña</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">211028253</td>
                  <td className="text-center">Brayan Banderas</td>
                  <td className="text-center">
                    <i className="fa-regular fa-image fa-xl"></i>
                  </td>
                  <td>ferney11@gmail.com</td>
                  <td className="text-center align-middle">
                    <div className="d-flex flex-column justify-content-center" style={{ margin: '2px', lineHeight: '5px' }}>
                      <button className="btn btn-sm btn-warning text-white">
                        Carnet <i className="fa-solid fa-address-card ms-1 text-white"></i>
                      </button>
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    <div className="d-flex flex-column justify-content-center" style={{ margin: '2px', lineHeight: '5px' }}>
                      <button className="btn btn-sm btn-primary text-white">
                        Informe <i className="fa-solid fa-folder ms-1 text-white"></i>
                      </button>
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    <div className="d-flex flex-column justify-content-center" style={{ margin: '2px', lineHeight: '5px' }}>
                      <button className="btn btn-sm btn-success text-white">
                        Recuperar <i className="fa-solid fa-wrench ms-1 text-white"></i>
                      </button>
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    <div className="dropdown d-flex flex-column justify-content-center">
                      <button className="btn btn-sm btn-danger dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Acción
                      </button>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Ver perfil</a>
                        <a className="dropdown-item" href="#">Desactivar cuenta</a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">111028253</td>
                  <td className="text-center">Ferney Banderas</td>
                  <td className="text-center">
                    <i className="fa-regular fa-image fa-xl"></i>
                  </td>
                  <td>ferney11@gmail.com</td>
                  <td className="text-center align-middle">
                    <div className="d-flex flex-column justify-content-center" style={{ margin: '2px', lineHeight: '5px' }}>
                      <button className="btn btn-sm btn-warning text-white">
                        Carnet <i className="fa-solid fa-address-card ms-1 text-white"></i>
                      </button>
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    <div className="d-flex flex-column justify-content-center" style={{ margin: '2px', lineHeight: '5px' }}>
                      <button className="btn btn-sm btn-primary text-white">
                        Informe <i className="fa-solid fa-folder ms-1 text-white"></i>
                      </button>
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    <div className="d-flex flex-column justify-content-center" style={{ margin: '2px', lineHeight: '5px' }}>
                      <button className="btn btn-sm btn-success text-white">
                        Recuperar <i className="fa-solid fa-wrench ms-1 text-white"></i>
                      </button>
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    <div className="dropdown d-flex flex-column justify-content-center">
                      <button className="btn btn-sm btn-danger dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Acción
                      </button>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Ver perfil</a>
                        <a className="dropdown-item" href="#">Desactivar cuenta</a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">111028253</td>
                  <td className="text-center">Ferney Banderas</td>
                  <td className="text-center">
                    <i className="fa-regular fa-image fa-xl"></i>
                  </td>
                  <td>ferney11@gmail.com</td>
                  <td className="text-center align-middle">
                    <div className="d-flex flex-column justify-content-center" style={{ margin: '2px', lineHeight: '5px' }}>
                      <button className="btn btn-sm btn-warning text-white">
                        Carnet <i className="fa-solid fa-address-card ms-1 text-white"></i>
                      </button>
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    <div className="d-flex flex-column justify-content-center" style={{ margin: '2px', lineHeight: '5px' }}>
                      <button className="btn btn-sm btn-primary text-white">
                        Informe <i className="fa-solid fa-folder ms-1 text-white"></i>
                      </button>
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    <div className="d-flex flex-column justify-content-center" style={{ margin: '2px', lineHeight: '5px' }}>
                      <button className="btn btn-sm btn-success text-white">
                        Recuperar <i className="fa-solid fa-wrench ms-1 text-white"></i>
                      </button>
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    <div className="dropdown d-flex flex-column justify-content-center">
                      <button className="btn btn-sm btn-danger" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Acción
                      </button>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">Ver perfil</a>
                        <a className="dropdown-item" href="#">Desactivar cuenta</a>
                      </div>
                    </div>
                  </td>
                  <td className="text-center align-middle">
                  </td>
                </tr>
                <tr>
                  <td className="text-center">111028253</td>
                  <td className="text-center">Ferney Banderas</td>
                  <td className="text-center">
                    <i className="fa-regular fa-image fa-xl"></i>
                  </td>
                  <td>ferney11@gmail.com</td>
                  <td className="text-center align-middle">
                    <div className="d-flex flex-column justify-content-center" style={{ margin: '2px', lineHeight: '5px' }}>
                      <button className="btn btn-sm btn-warning text-white">
                        Carnet <i className="fa-solid fa-address-card ms-1 text-white"></i>
                      </button>
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    <div className="d-flex flex-column justify-content-center" style={{ margin: '2px', lineHeight: '5px' }}>
                      <button className="btn btn-sm btn-primary text-white">
                        Informe <i className="fa-solid fa-folder ms-1 text-white"></i>
                      </button>
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    <div className="d-flex flex-column justify-content-center" style={{ margin: '2px', lineHeight: '5px' }}>
                      <button className="btn btn-sm btn-success text-white">
                        Recuperar <i className="fa-solid fa-wrench ms-1 text-white"></i>
                      </button>
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    <div className="dropdown d-flex flex-column justify-content-center">
                      <button className="btn btn-sm btn-danger dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Acción
                      </button>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Ver perfil</a>
                        <a className="dropdown-item" href="#">Desactivar cuenta</a>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
           </div>
          </div>
        </div>
      </div>
      <button className="button-shadow">
    Añadir <i className="fa fa-solid fa-plus" style={{ color: '#1877f2' }}></i>
    </button>
    </div>
  );
};

