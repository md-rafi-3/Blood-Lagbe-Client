import React from 'react';

const FundingTable = ({fund,index,page}) => {
    return (
        <tr>
        <th>{(index+1)+((page-1)*10)}</th>
        <td>{fund.name}</td>
        <td>{fund.amount}$</td>
       <td>
              {new Date(fund.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </td>
      </tr>
    );
};

export default FundingTable;