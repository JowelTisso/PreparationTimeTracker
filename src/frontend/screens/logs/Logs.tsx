import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import { LogsResponse, updateLogs } from "../../reducer/logSlice";
import { AppDispatch, RootState } from "../../store/store";
import { GET } from "../../utils/helper";
import LogItem from "./LogItem";
import { ContentWrapper, FilterWrapper, Wrapper } from "./LogsStyles";

const Logs: React.FC = () => {
  const logsData = useSelector(({ logState }: RootState) => logState.logs);
  const dispatch = useDispatch<AppDispatch>();
  const { Search } = Input;

  const getLogs = async () => {
    const logs: LogsResponse = await GET(`dashboard/logs/all?limit=5`, true);
    if (logs) {
      dispatch(updateLogs(logs));
      return logs;
    }
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
  };

  const fetchData = () => {
    console.log("fetchData");
  };

  useEffect(() => {
    if (!logsData.length) {
      getLogs();
    }
  }, []);

  return (
    <Wrapper>
      <Header title="Logs" />
      <FilterWrapper>
        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{ width: 200 }}
        />
      </FilterWrapper>
      <ContentWrapper>
        <InfiniteScroll
          dataLength={5}
          next={fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          height={400}
          endMessage={<p>You have seen it all</p>}
        >
          {logsData?.map((log, i) => (
            <LogItem key={i} log={log} />
          ))}
          <div style={{ height: 20 }}></div>
        </InfiniteScroll>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Logs;
