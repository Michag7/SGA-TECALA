import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import classNames from "classnames";
import { rankItem } from "@tanstack/match-sorter-utils";
import {
  MagnifyingGlassIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  ChevronUpDownIcon,
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronDoubleRightIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import BotonExcel from "../../components/BotonExcel";
import { BotonPdf } from "../../components/BotonPdf";


const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({ itemRank });

  return itemRank.passed;
};

const DebouncedInput = ({ value: keyWord, onChange, ...props }) => {
  const [value, setValue] = useState(keyWord);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const DataTable = ({ columns, Data, columnsPdf, nombreArchivo, tituloPdf, }) => {
  const [data, setData] = useState(Data);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

  // // const columns = [
  // //   {
  // //     accessorKey: 'name',
  // //     header: () => <span>Nombre</span>,
  // //     cell: info => <span className='font-bold'>{info.getValue()}</span>
  // //   },
  // //   {
  // //     accessorKey: 'lastName',
  // //     header: () => <span>Apellidos</span>
  // //   },
  // //   {
  // //     accessorKey: 'age',
  // //     header: () => <span>Edad</span>
  // //   },
  // //   {
  // //     accessorKey: 'status',
  // //     header: () => <span>Estado</span>,
  // //     cell: info => {
  // //       return (
  // //         <span className={classNames({
  // //           'text-white px-2 rounded-full font-semibold': true,
  // //           'bg-red-500': 'Inactivo' === info.getValue(),
  // //           'bg-green-500': 'Activo' === info.getValue()
  // //         })}>
  // //           {info.getValue()}
  // //         </span>
  // //       )
  // //     },
  // //     enableSorting: true
  // //   },
  // //   {
  // //     accessorKey: 'actions',
  // //     header: 'Acciones',
  // //     cell: info => {
  // //       return (
  // //         <div className='space-x-2'>
  // //           <button className='text-red-600'>Eliminar</button>
  // //           <button className='text-blue-600'>Editar</button>
  // //         </div>
  // //       )
  // //     },
  // //     enableSorting: false
  // //   }
  // // ]



  const getStateTable = () => {
    const totalRows = table.getFilteredRowModel().rows.length;
    const pageSize = table.getState().pagination.pageSize;
    const pageIndex = table.getState().pagination.pageIndex;
    const rowsPerPage = table.getRowModel().rows.length;

    const firstIndex = pageIndex * pageSize + 1;
    const lastIndex = pageIndex * pageSize + rowsPerPage;

    return {
      totalRows,
      firstIndex,
      lastIndex,
    };
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: fuzzyFilter,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <div className="p-4">
      <div className="my-4 flex flex-wrap justify-end ">
        <BotonExcel datos={data}></BotonExcel>
        <BotonPdf columsName={columnsPdf} datos={data} titleDocument={tituloPdf} archivoName={nombreArchivo}></BotonPdf>
        
        <div className="relative">
          <DebouncedInput
            type="text"
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="py-2 px-1 text-gray-600 border border-gray-300 rounded outline-blue-500"
            placeholder="Buscar..."
          />
          <MagnifyingGlassIcon className="w-5 h-5 absolute top-3 left-40" />
        </div>
      </div>
      <div id="contenedorTabla" className="overflow-auto">
        <table id="tablaD" className="table-auto w-full  min-w-[560px] ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b rounded-md border-gray-300 bg-gray-200"
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="py-2 px-4 text-left uppercase">
                    {header.isPlaceholder ? null : (
                      <div
                        className={classNames({
                          "cursor-pointer select-none flex justify-between":
                            header.column.getCanSort(),
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <BarsArrowUpIcon className="w-5 h-5" />,
                          desc: <BarsArrowDownIcon className="w-5 h-5" />,
                        }[header.column.getIsSorted()] ??
                          (header.column.getCanSort() ? (
                            <ChevronUpDownIcon className="w-5 h-5" />
                          ) : null)}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="text-gray-600 hover:bg-blue-500 hover:text-white"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-2 px-4 ">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 md:flex items-center justify-between space-y-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <button
            className="text-gray-600 bg-gray-50 py-0.5 px-1 rounded border border-gray-300 
            disabled:hover:bg-white disabled:hover:text-gray-300"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronDoubleLeftIcon className="w-5 h-5" />
          </button>
          <button
            className="text-gray-600 bg-gray-50 py-0.5 px-1 rounded border border-gray-300
            disabled:hover:bg-white disabled:hover:text-gray-300"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>

          {table.getPageOptions().map((value, key) => (
            <button
              key={key}
              className={classNames({
                "text-gray-600 bg-gray-50 py-0.5 px-2 font-bold rounded border border-gray-300 hover:bg-blue-400 hover:text-white disabled:hover:text-white": true,
                "bg-blue-400 text-white":
                  value === table.getState().pagination.pageIndex,
              })}
              onClick={() => table.setPageIndex(value)}
            >
              {value + 1}
            </button>
          ))}

          <button
            className="text-gray-600 bg-gray-50 py-0.5 px-1 rounded border border-gray-300
            disabled:hover:bg-white disabled:hover:text-gray-300"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
          <button
            className="text-gray-600 bg-gray-50 py-0.5 px-1 rounded border border-gray-300
            disabled:hover:bg-white disabled:hover:text-gray-300"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronDoubleRightIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="text-gray-600 font-semibold">
          Mostrando de {getStateTable().firstIndex}&nbsp; a{" "}
          {getStateTable().lastIndex}&nbsp; del total de{" "}
          {getStateTable().totalRows} registros
        </div>
        <select
          className="text-gray-600 border border-gray-300 rounded outline-indigo-700 py-2"
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          <option value="5">5 pág.</option>
          <option value="10">10 pág.</option>
          <option value="20">20 pág.</option>
          <option value="25">25 pág.</option>
          <option value="50">50 pág.</option>
        </select>
      </div>
    </div>
  );
};

export default DataTable;
