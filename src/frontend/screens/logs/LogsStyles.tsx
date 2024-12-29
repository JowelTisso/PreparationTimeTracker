import styled from "styled-components";
import { COLORS } from "../../utils/Colors";

export const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const LogItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;

  .date-wrapper {
    width: 100%;
    text-align: left;
    p {
      margin: 0;
      padding: 3px 5px;
      font-size: 0.9rem;
      /* width: max-content; */
    }
    background-color: ${COLORS.Background};
  }
  .content-wrapper {
    width: 100%;
    display: flex;
    gap: 5px;
    margin-top: 10px;

    .item {
      /* max-width: 100px; */
      margin-bottom: 10px;
      flex: 1;
      /* background-color: ${COLORS.Background}; */
      /* height: 150px; */
      display: flex;
      flex-direction: column;

      .title {
        margin: 5px;
        text-align: left;
        color: ${COLORS.Primary};
        /* border: 1.7px solid ${COLORS.Text}; */
        background-color: ${COLORS.Idle};
        border-radius: 7px;
        padding-left: 5px;
      }

      .time {
        margin: 0 5px;
        padding-top: 10px;
        text-align: left;
        padding-left: 5px;
        font-size: 1.1rem;
        /* border-left: 1.5px dashed ${COLORS.Active}; */
        /* border-right: 1.5px dashed ${COLORS.Active}; */
        /* background-color: lightgreen; */
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
