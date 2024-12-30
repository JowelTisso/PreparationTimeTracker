import styled from "styled-components";
import { COLORS } from "../../utils/Colors";

export const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 120px;
  height: 100%;
`;

export const FilterWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 85%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const LogItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;

  .date-wrapper {
    width: 100%;
    text-align: left;
    p {
      margin: 0;
      padding: 3px 5px;
      font-size: 0.9rem;
    }
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
