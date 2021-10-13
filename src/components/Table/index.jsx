import React from "react";
import { sortAddress } from "../../utils/sortAddress";
import { timeDuration } from "../../utils/timeDuration";
const Table = (props) => {
  const { data } = props;

  return (
    <div class="table-responsive" style={{ height: "200px" }}>
      <table
        class="text-center  table 
      
    "
      >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Address</th>
            <th scope="col">Message</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{sortAddress(item.address)}</td>
              <td>{item.message}</td>
              <td>{timeDuration(item.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
