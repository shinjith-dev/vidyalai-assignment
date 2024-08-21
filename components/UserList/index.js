import React, { useState } from 'react';
import styled from '@emotion/styled';
import useUserData from '../hooks/useUserData';

const Table = styled.table(() => ({
  width: '100%',
  borderCollapse: 'collapse',

  th: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    cursor: 'pointer',
  },

  td: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },

  '.sort-icon': {
    verticalAlign: 'middle',
    marginLeft: '5px',
  },
}));

const columnFields = [
  { value: 'id', label: 'Id' },
  { value: 'name', label: 'Name', enableSearch: true },
  { value: 'email', label: 'Email', enableSearch: true },
  { value: 'username', label: 'Username' },
  { value: 'phone', label: 'Phone' },
  { value: 'website', label: 'Website' },
];

const UserList = () => {
  const [search, setSearch] = useState({ name: 'name', value: '' })
  const [sortBy, setSortBy] = useState({ column: columnFields[0].value, direction: 'asc' })

  const {
    users
  } = useUserData({ search, sortBy })

  const handleOnSearch = event => {
    setSearch(_ => ({ name: event.target.name, value: event.target.value }));
  }

  const handleSort = column => {
    if (column === sortBy.column)
      setSortBy(prev => ({ ...prev, direction: prev.direction === 'asc' ? 'dsc' : 'asc' }))

    else setSortBy({ column, direction: 'asc' })
  }

  return (
    <div>
      <Table>
        <thead>
          <tr>
            {columnFields.map(field => {
              return (
                <th key={field.value}>
                  <div
                    onClick={() => handleSort(field.value)}
                    style={{ paddingBottom: 8 }}
                  >
                    {field.label}
                    {sortBy.column === field.value &&
                      (sortBy.direction === 'asc' ? (
                        <span className={'sort-icon'}>▲</span>
                      ) : (
                        <span className={'sort-icon'}>▼</span>
                      ))}
                  </div>

                  {field.enableSearch ? (
                    <input
                      type={'text'}
                      placeholder={`Search by ${field.label}`}
                      name={field.value}
                      onChange={handleOnSearch}
                      style={{ padding: 6, width: 200 }}
                    />
                  ) : null}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              {columnFields.map(field => (
                <td key={field.value}>{user[field.value]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div></div>
    </div>
  );
}


export default UserList;
