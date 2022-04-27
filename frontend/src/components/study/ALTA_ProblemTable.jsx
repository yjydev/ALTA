import styled from '@emotion/styled';

export default function ALTA_ProblemTable() {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>제목</Th>
          <Th>user user user user user user</Th>
          <Th>user user user user user user</Th>
          <Th>user user user user user user</Th>
          <Th>user user user user user user</Th>
          <Th>user user user user user user</Th>
          <Th>user user user user user user</Th>
        </Tr>
      </Thead>
      <Tbody>
        {[0, 0, 0, 0].map((v, i) => (
          <Tr key={i}>
            <Td>
              test problem test problem test problem test problem test problem
            </Td>
            <Td>user user user user user user</Td>
            <Td>user user user user user user</Td>
            <Td>user user user user user user</Td>
            <Td>user user user user user user</Td>
            <Td>user user user user user user</Td>
            <Td>user user user user user user</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

const Table = styled.table`
  width: 100%;
  margin-bottom: 40px;
  padding: 10px 0;
  border-spacing: 0px;
  border-collapse: separate;
`;

const Thead = styled.thead`
  text-align: center;
  background-color: #d9cab3;
`;
const Tbody = styled.tbody`
  text-align: center;
`;

const Tr = styled.tr`
  border: 1px solid #6d9886;
  padding: 5px;
  &:nth-child(even) {
    background-color: rgba(224, 212, 194, 0.3);
  }
`;
const Th = styled.th`
  width: 90px;
  max-width: 90px;
  &:first-child {
    width: 200px;
    max-width: 200px;
  }
  padding: 5px;
  border-top: 1px solid #6d9886;
  border-bottom: 1px solid #6d9886;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Td = styled.td`
  width: 90px;
  max-width: 90px;
  &:first-child {
    width: 200px;
    max-width: 200px;
  }
  padding: 5px;
  border-bottom: 1px solid #6d9886;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
