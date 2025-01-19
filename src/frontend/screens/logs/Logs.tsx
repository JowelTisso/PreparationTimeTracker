import { Input, Spin } from "antd";
import { SearchProps } from "antd/es/input";
import { debounce } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import {
  appendLogs,
  appendSearchLogs,
  initialLogState,
  LogsResponse,
  restoreLogs,
  updateLogs,
} from "../../reducer/logSlice";
import { AppDispatch, RootState } from "../../store/store";
import { GET } from "../../utils/helper";
import LogItem from "./LogItem";
import {
  ContentWrapper,
  FilterWrapper,
  StyledInfiniteScroll,
  Wrapper,
} from "./LogsStyles";

interface GetLogType {
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
}

const Logs: React.FC = () => {
  const { logs: logsData, pagination } = useSelector(
    ({ logState }: RootState) => logState
  );

  const dispatch = useDispatch<AppDispatch>();
  const { Search } = Input;

  const getLogs = async () => {
    let urlString = "dashboard/logs/all?";
    try {
      const logs: LogsResponse = await GET(urlString, true);
      if (logs) {
        dispatch(updateLogs(logs));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getQueryLogs = async ({
    page = 0,
    limit = 10,
    search = "",
    startDate = "",
    endDate = "",
  }: GetLogType) => {
    let urlString = "dashboard/logs/all?";
    if (page) {
      urlString = urlString.concat(`page=${page}&`);
    }
    if (limit) {
      urlString = urlString.concat(`limit=${limit}&`);
    }
    if (search) {
      urlString = urlString.concat(`search=${search}&`);
    }
    if (startDate) {
      urlString = urlString.concat(`startDate=${startDate}&`);
    }
    if (endDate) {
      urlString = urlString.concat(`endDate=${endDate}&`);
    }
    const logs: LogsResponse = await GET(urlString, true);
    return logs;
  };

  const onSearch: SearchProps["onSearch"] = debounce(async (value) => {
    try {
      if (value) {
        const logs = await getQueryLogs({
          search: value.trim(),
        });
        if (logs) {
          dispatch(appendSearchLogs(logs));
        }
      }
    } catch (e: any) {
      console.error(e);
      if (e?.status === 404) {
        dispatch(appendSearchLogs(initialLogState));
      }
    }
  }, 500);

  const fetchData = async () => {
    const logs = await getQueryLogs({
      page: pagination.currentPage + 1,
    });
    if (logs) {
      dispatch(appendLogs(logs));
    }
  };

  const onClear = () => {
    dispatch(restoreLogs());
  };

  const heightOfInfiniteScroll = Math.floor(window.innerHeight * 0.8);

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
          placeholder="Search by Date"
          allowClear
          onSearch={onSearch}
          style={{ width: 200 }}
          onClear={onClear}
        />
      </FilterWrapper>
      <ContentWrapper>
        {logsData.length ? (
          <StyledInfiniteScroll
            dataLength={logsData.length}
            next={fetchData}
            hasMore={logsData.length < pagination.totalLogs}
            loader={<Spin size="small" />}
            height={heightOfInfiniteScroll}
          >
            {logsData?.map((log) => (
              <LogItem key={log._id} log={log} />
            ))}
          </StyledInfiniteScroll>
        ) : (
          <p className="search-msg">No Logs Found!</p>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

export default Logs;
