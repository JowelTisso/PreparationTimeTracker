import {
  CaretLeftFilled,
  CaretRightFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Calendar,
  CheckboxChangeEvent,
  Select,
  Spin,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { debounce, isEmpty } from "lodash";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SwipeDirections, useSwipeable } from "react-swipeable";
import { isMobile } from "../../components/BottomNav/BottomNav";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader";
import {
  saveFetchedCompleteDates,
  saveFetchedNotes,
  updateCompleteDates,
  updateCurrentDate,
  updateLoading,
  updateModalOpen,
  updateNotes,
} from "../../reducer/calendarSlice";
import { AppDispatch, RootState } from "../../store/store";
import { COLORS } from "../../utils/Colors";
import { GET, getLocalStorage, POST } from "../../utils/helper";
import {
  BottomModal,
  CalendarContainer,
  StyledButton,
  StyledCheckbox,
  StyledTextArea,
  Wrapper,
} from "./CalendarStyles";

interface completedDateType {
  userId: string;
  date: string;
  isChecked: boolean;
}

const CalendarWithCheckbox = () => {
  const { completedDates, isModalOpen, loading, notes, currentDateString } =
    useSelector(({ calendarState }: RootState) => calendarState);
  const dispatch = useDispatch<AppDispatch>();
  const userData = JSON.parse(getLocalStorage("userData") || "{}");

  const currentDate = dayjs(currentDateString);
  const dateString = currentDate.format("YYYY-MM-DD");

  const fetchMonthData = async (date: Dayjs) => {
    dispatch(updateLoading({ spin: true, tick: false }));
    const userId = userData.id;
    const year = date.year();
    let month = (date.month() + 1).toString();
    month = parseInt(month) < 10 ? `0${month}` : month;

    const daysInMonth = date.daysInMonth();
    const startDate = `${year}-${month}-01`;
    const endDate = `${year}-${month}-${daysInMonth}`;
    const urlString = `/calendar/month?userId=${userId}&startDate=${startDate}&endDate=${endDate}`;
    try {
      const res = await GET(urlString, true);

      if (res) {
        const notesData = Object.entries(res.data)?.reduce(
          (acc: Record<string, string>, [date, value]: any) => {
            acc[date] = value.note;
            return acc;
          },
          {}
        );
        dispatch(saveFetchedCompleteDates(res.data));
        dispatch(saveFetchedNotes(notesData));
      }
    } catch (e) {
      console.error(e);
    }
    dispatch(updateLoading({ spin: false, tick: false }));
  };

  const onMonthChange = (direction: SwipeDirections) => {
    let newDate =
      direction === "Left"
        ? currentDate.add(1, "month")
        : currentDate.subtract(1, "month");

    fetchMonthData(newDate);
    dispatch(updateCurrentDate(newDate.toISOString()));
  };

  const swipeHandlers = useSwipeable({
    onSwiped: (eventData) => {
      const direction = eventData.dir;
      onMonthChange(direction);
    },
    delta: { up: 500, down: 500, left: 80, right: 80 },
  });

  const saveCompletedDates = useCallback(
    debounce(async (data: completedDateType) => {
      try {
        dispatch(updateLoading({ spin: true, tick: false }));
        await POST("/calendar/update", data);
        dispatch(updateLoading({ spin: false, tick: true }));
      } catch (e) {
        console.error(e);
      } finally {
        setTimeout(() => {
          dispatch(updateLoading({ spin: false, tick: false }));
        }, 1000);
      }
    }, 500),
    []
  );

  const handleCheckboxChange = (date: Dayjs, e: CheckboxChangeEvent) => {
    const dateString = date.toISOString().split("T")[0];
    const userId = userData.id;

    const data = {
      userId,
      date: dateString,
      isChecked: e.target.checked,
    };

    saveCompletedDates(data);
    dispatch(
      updateCompleteDates({
        dateString,
        checked: e.target.checked,
      })
    );
  };

  const handleDateSelect = (date: Dayjs) => {
    if (document.activeElement?.className.includes("ant-checkbox-input")) {
      return;
    }
    dispatch(updateModalOpen(true));
    dispatch(updateCurrentDate(date.toISOString()));
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(
      updateNotes({
        dateString,
        value: e.target.value,
      })
    );
  };

  const handleSaveNote = async () => {
    if (notes[dateString]) {
      const userId = userData.id;
      const data = {
        userId,
        date: dateString,
        isChecked: completedDates[dateString]?.checked,
        note: notes[dateString],
      };
      await saveCompletedDates(data);
    }
  };

  const dateCellRender = (date: Dayjs) => {
    const dateString = date.format("YYYY-MM-DD");
    const isCompleted = completedDates[dateString]?.checked;
    const isToday = date.isSame(dayjs(), "day");
    const isFuture = date.isAfter(dayjs(), "day");

    return (
      <div
        className="custom-checkbox-container"
        onClick={(e) => e.stopPropagation()}
      >
        <StyledCheckbox
          checked={isCompleted}
          onChange={(e) => handleCheckboxChange(date, e)}
          // disabled={!isToday}
          isFuture={isFuture}
        />
        {notes[dateString] && <Badge color={COLORS.Active} />}
      </div>
    );
  };

  const handleMonthChange = (month: number) => {
    const newDate = currentDate.month(month);
    fetchMonthData(newDate);
    dispatch(updateCurrentDate(newDate.toISOString()));
  };

  const handleYearChange = (year: number) => {
    const newDate = currentDate.year(year);
    fetchMonthData(newDate);
    dispatch(updateCurrentDate(newDate.toISOString()));
  };

  const headerRender = () => {
    const months = Array.from({ length: 12 }, (_, i) => ({
      label: dayjs().month(i).format("MMMM"),
      value: i,
    }));

    const years = Array.from({ length: 10 }, (_, i) => ({
      label: dayjs().year() - 5 + i,
      value: dayjs().year() - 5 + i,
    }));

    return (
      <div className="custom-calendar-header">
        <Select
          value={currentDate.month()}
          options={months}
          onChange={handleMonthChange}
          style={{ width: 120 }}
        />
        <Select
          value={currentDate.year()}
          options={years}
          onChange={handleYearChange}
          style={{ width: 100 }}
        />
      </div>
    );
  };

  const onLeftClick = () => {
    onMonthChange("Right");
  };

  const onRightClick = () => {
    onMonthChange("Left");
  };

  useEffect(() => {
    if (isEmpty(completedDates)) {
      fetchMonthData(currentDate);
    }
  }, []);

  return (
    <Wrapper {...swipeHandlers}>
      <Header title="Calendar" />
      <CalendarContainer>
        {!isMobile() && (
          <Button
            onClick={onLeftClick}
            shape="circle"
            icon={<CaretLeftFilled />}
          />
        )}
        <Calendar
          mode="month"
          value={currentDate}
          cellRender={dateCellRender}
          headerRender={headerRender}
          onSelect={handleDateSelect}
        />
        {!isMobile() && (
          <Button
            onClick={onRightClick}
            shape="circle"
            icon={<CaretRightFilled />}
          />
        )}
      </CalendarContainer>
      <BottomModal
        title={`Add Note for ${dateString}`}
        open={isModalOpen}
        onOk={handleSaveNote}
        onCancel={() => dispatch(updateModalOpen(false))}
        footer={[
          <StyledButton
            key="save"
            type="primary"
            onClick={handleSaveNote}
            disabled={loading?.spin || !notes[dateString]}
          >
            {loading?.spin ? (
              <Spin
                indicator={<LoadingOutlined spin />}
                style={{
                  color: "#fff",
                }}
              />
            ) : loading?.tick ? (
              "Saved"
            ) : (
              "Save Note"
            )}
          </StyledButton>,
        ]}
      >
        <StyledTextArea
          value={notes[dateString] || ""}
          onChange={handleNoteChange}
          placeholder="Enter your note here..."
        />
      </BottomModal>
      {loading.spin && <Loader />}
    </Wrapper>
  );
};

export default CalendarWithCheckbox;
