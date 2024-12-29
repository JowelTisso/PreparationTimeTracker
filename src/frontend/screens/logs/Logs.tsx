import { useEffect } from "react";
import Header from "../../components/Header/Header";
import { GET } from "../../utils/helper";
import LogItem from "./LogItem";
import { ContentWrapper, Wrapper } from "./LogsStyles";
import { useSelector, useDispatch } from "react-redux";
import { updateLogs } from "../../reducer/logSlice";
import { RootState, AppDispatch } from "../../store/store";
import { Table } from "antd";

const Logs: React.FC = () => {
  const logsData = useSelector((state: RootState) => state.logs.data);
  const dispatch = useDispatch<AppDispatch>();
  const getLogs = async () => {
    const logs = await GET("dashboard/logs/all", true);
    if (logs) {
      dispatch(updateLogs(logs));
    }
  };

  useEffect(() => {
    if (!logsData.length) {
      getLogs();
    }
  }, []);

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Coding",
      dataIndex: "coding",
      key: "coding",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <Wrapper>
      <Header title="Logs" />
      <ContentWrapper>
        {logsData.map((log) => (
          <LogItem log={log} />
        ))}
        {/* <Table dataSource={dataSource} columns={columns} />; */}
      </ContentWrapper>
    </Wrapper>
  );
};

export default Logs;
