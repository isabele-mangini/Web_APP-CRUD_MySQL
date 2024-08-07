import React, { useState, useEffect, useMemo, useRef } from "react";
import TestService from "../services/TestService";
import { Pagination } from "@mui/material";
import { useTable } from "react-table"
import { useNavigate } from 'react-router-dom';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


import './style.css';


const TestsList = (props) => {
    const navigate = useNavigate();
    const [tests, setTestes] = useState([]);
    const [searchScenario, setSearchScenario] = useState("");

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(3);

    const pageSizes = [5, 10, 15];
    const testsRef = useRef();

    testsRef.current = tests;

    const onChangeSearchScenario = e => {
        const searchScenario = e.target.value;
        setSearchScenario(searchScenario);
    };

    const getRequestParams = (searchScenario, page, pageSize) => {
        let params = {}; 

        if (searchScenario) {
            params["scenario"] = searchScenario;
        }

        if (page) {
            params["page"] = page - 1;
        }   

        if (pageSize) {
            params["size"] = pageSize;
        }

        return params;
    }

    const retrieveTests = () => {
        const params = getRequestParams(searchScenario, page, pageSize);

        TestService.getAll(params).then((response) => {
            const { tests, totalPages } = response.data;

            setTestes(tests);
            setCount(totalPages);

            console.log(response.data);
        }).catch((e) => {
            console.log(e);
        });
    };

    useEffect(retrieveTests, [page, pageSize]);
 
    const handlePageChange = (event, value) => {
        setPage(value);
    }

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };

    const deleteTest = (rowIndex) => {
        const id = testsRef.current[rowIndex].id;

        TestService.remove(id).then((response) => {
            navigate("/test");

            let newTests = [...testsRef.current];
            newTests.splice(rowIndex, 1);

            setTestes(newTests);
        })
        .catch((e) => {
            console.log(e);
        });
  };

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'tests';

    const exportToCSV = (csvData, fileName) => {
      const ws = XLSX.utils.json_to_sheet(csvData);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {type: fileType});
      FileSaver.saveAs(data, fileName + fileExtension);
    } 

    const openTest = (rowIndex) => {
        const id = testsRef.current[rowIndex].id;
        console.log(id);
        navigate("/test/"+id);
    };

    const findByScenario = () => {
        setPage(1);
        retrieveTests();
    };

    const columns = useMemo(
        () => [
            {
              Header: "Scenario",
              accessor: "scenario",
            },
            {
              Header: "Test",
              accessor: "test",
            },
            {
              Header: "Orig",
              accessor: "orig",
            },
            {
              Header: "Agr",
              accessor: "agr",
            },
            {
              Header: "Cat",
              accessor: "cat",
            },
            {
              Header: "N° UGTs",
              accessor: "n_ugts", 
            },
            {
              Header: "Objet du Test",
              accessor: "objet_du_test"
            },
            {
              Header: "Actions",
              accessor: "actions",
              Cell: (props) => {
                const rowIdx = props.row.id;
                return (
                    <div>

                    <span onClick={() => openTest(rowIdx)}>
                      <i className="fas fa-edit action mr-2"></i>
                    </span>

                    <span onClick={() => deleteTest(rowIdx)} className="action-icon">
                      <i className="fas fa-trash action"></i>
                    </span>

                    </div>
                  );
                },
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: tests,
    });


    return (
        <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by scenario"
                value={searchScenario}
                onChange={onChangeSearchScenario}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByScenario}
                >
                  Search
                </button>
              </div>
              <div className="input-group-appende">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={(e) => exportToCSV(tests,fileName)}
                >
                  Export
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-12 list">
            <h4>Tests List</h4>
            <div className="mt-3">
                {"Items per Page: "}
                <select onChange={handlePageSizeChange} value={pageSize}>
                 {pageSizes.map((size) => (
                    <option key={size} value={size}>
                     {size}
                    </option>
                    
                  ))}
                </select>

                <Pagination
                    className="my-3"
                    count={count}
                    page={page}
                    siblingCount={1}
                    boundaryCount={1}
                    color="standard"
                    variant="outlined"
                    onChange={handlePageChange}
                />
            </div>

            <table
          className="table table-striped"
          {...getTableProps()}
        >
          <thead class="table-light">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} class="table-group-divider table-divider-color">
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  

};



export default TestsList; 


