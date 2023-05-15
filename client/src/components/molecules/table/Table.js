import React, { useEffect, useState } from "react";
import { Text, Title } from "../../atoms";
import { BiArrowFromRight, BiArrowFromLeft } from "react-icons/bi";
import { Loader, Pagination } from "../../organisms";
import { ObjectCopy } from "../../../utils/data";

const Table = ({
  header = [],
  data = [],
  minRows = 3,
  loader = false,
  isVerticalBorder = false,
  onHandleTable = () => {},
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [tableActionFn, setTableActionFn] = useState({});
  const onHandlePageChange = ({ selected }) => setCurrentPage(selected);
  const onHandleExtreme = (side = -1) =>
    setCurrentPage(side == -1 ? 0 : data.length / minRows - 1);

  const onHandleAction = (index, props, accessor) => {
    setTableActionFn((prevState) => ({
      ...prevState,
      [props]: { index, ...data[index] },
    }));
  };

  useEffect(() => {
    if (Object.keys(tableActionFn).length) {
      const tableFnCopy = ObjectCopy(tableActionFn);
      onHandleTable(tableFnCopy);
      setTableActionFn({});
    }
  }, [tableActionFn]);

  return (
    <div>
      <table
        className={`table ${isVerticalBorder ? "table__verticalBorder" : ""}`}
        cellSpacing="0"
      >
        <thead>
          <tr>
            {header.map(({ heading }, index) => (
              <th key={index}>
                <Title variant="alb-16-3">{heading}</Title>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!loader &&
            data
              .slice(currentPage * minRows, currentPage * minRows + minRows)
              .map((value, idx) => (
                <tr key={idx}>
                  {header.map(({ accessor, cell = null }, index) => (
                    <td key={index}>
                      {!!cell ? (
                        cell({
                          [accessor]: value[accessor],
                          details: value,
                          onHandleAction: onHandleAction.bind(this, idx),
                        })
                      ) : (
                        <Text variant="alr-14-1">{value[accessor] || ""}</Text>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
      {loader && (
        <div className="table__loader">
          <div>
            <Loader load={loader} />
          </div>
        </div>
      )}
      <div className="table__pagination">
        <Text variant="p-13-400-1">{`Showing ${currentPage * minRows + 1} to ${
          currentPage * minRows + minRows
        } of ${data.length} Items`}</Text>
        <div>
          <div className="table__paginationBox">
            <ul>
              <li
                className={`pagination__pages pagination__pages--actionLeft ${
                  currentPage == 0 ? "pagination__pages--disabled" : ""
                }`}
                onClick={onHandleExtreme}
              >
                <BiArrowFromRight />
              </li>
              <Pagination
                total={data.length}
                pagePerView={minRows}
                onHandlePageChange={onHandlePageChange}
              />
              <li
                className={`pagination__pages pagination__pages--actionRight ${
                  currentPage == data.length / minRows - 1
                    ? "pagination__pages--disabled"
                    : ""
                }`}
                onClick={onHandleExtreme.bind(this, 1)}
              >
                <BiArrowFromLeft />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
