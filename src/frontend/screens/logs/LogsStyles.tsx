import styled from "styled-components";
import { COLORS } from "../../utils/Colors";
import InfiniteScroll from "react-infinite-scroll-component";

interface InfiniteScrollWrapperProps {
  children: React.ReactNode;
  dataLength: number;
  next: () => {};
  hasMore: boolean;
  loader: React.ReactNode;
  height: number;
}

export const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 110px;
  height: 100%;
  @media screen and (min-width: 800px) {
    margin-top: 90px;
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  background-color: ${COLORS.white};
  z-index: 1;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .search-msg {
    color: ${COLORS.Secondary};
  }
`;

const InfiniteScrollWrapper: React.FC<InfiniteScrollWrapperProps> = ({
  children,
  ...rest
}) => <InfiniteScroll {...rest}>{children}</InfiniteScroll>;

export const StyledInfiniteScroll = styled(InfiniteScrollWrapper)`
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (min-width: 800px) {
    height: 500px !important;
  }
`;

export const LogItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;

  .date-wrapper {
    width: 95%;
    text-align: left;
    margin: 0;
    padding: 3px 5px;
    font-size: 0.9rem;
    background-color: ${COLORS.Background};
    border-radius: 7px;
  }
  .content-wrapper {
    width: 100%;
    display: flex;
    gap: 5px;
    margin-top: 10px;
    max-width: 500px;

    .item {
      border: 1.5px solid #edebeb;
      border-radius: 5px;
      margin-bottom: 10px;
      flex: 1;
      display: flex;
      flex-direction: column;

      .title {
        margin: 5px;
        text-align: left;
        color: ${COLORS.Primary};
        border-radius: 7px;
        padding-left: 5px;
      }

      .time {
        margin: 0 5px;
        padding-top: 10px;
        text-align: left;
        padding-left: 5px;
        font-size: 1.1rem;
        flex: 1;

        span {
          font-size: 0.7rem;
        }
      }

      .progress-bar {
        margin: 0 9px;
      }
    }
  }
`;

export const PaginationWrapper = styled.div`
  padding-top: 10px;
  /* height: 75px; */
`;
