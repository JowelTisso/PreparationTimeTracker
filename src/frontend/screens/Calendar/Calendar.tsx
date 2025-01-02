import { Calendar, CheckboxChangeEvent, CheckboxRef, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { debounce } from "lodash";
import { useCallback, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import Header from "../../components/Header/Header";
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

const userData = JSON.parse(getLocalStorage("userData") || "{}");

const CalendarWithCheckbox = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [completedDates, setCompletedDates] = useState<Record<string, boolean>>(
    {}
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const checkboxRef = useRef<HTMLDivElement>(null);

  const fetchMonthData = async (date: Dayjs) => {
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
        setCompletedDates(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwiped: (eventData) => {
      const direction = eventData.dir;
      let newDate =
        direction === "Left"
          ? currentDate.add(1, "month")
          : currentDate.subtract(1, "month");

      fetchMonthData(newDate);
      setCurrentDate(newDate);
    },
    delta: { up: 500, down: 500, left: 80, right: 80 },
  });

  const saveCompletedDates = useCallback(
    debounce(async (data: completedDateType) => {
      try {
        await POST("/calendar/update", data);
      } catch (e) {
        console.error(e);
      }
    }, 500),
    []
  );

  const handleCheckboxChange = (date: Dayjs, e: CheckboxChangeEvent) => {
    e.stopPropagation();
    const dateString = date.toISOString().split("T")[0];
    const userId = userData.id;

    const data = {
      userId,
      date: dateString,
      isChecked: e.target.checked,
    };

    saveCompletedDates(data);

    setCompletedDates((prev) => ({
      ...prev,
      [dateString]: !prev[dateString],
    }));
  };

  const handleDateSelect = (date: Dayjs) => {
    if (document.activeElement?.className.includes("ant-checkbox-input")) {
      return;
    }
    setIsModalOpen(true);
    setCurrentDate(date);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const dateString = currentDate.format("YYYY-MM-DD");
    setNotes((prev) => ({
      ...prev,
      [dateString]: e.target.value,
    }));
  };

  const handleSaveNote = () => {
    console.log(notes);

    setIsModalOpen(false);
  };

  const dateCellRender = (date: Dayjs) => {
    const dateString = date.format("YYYY-MM-DD");
    const isCompleted = completedDates[dateString];
    const isToday = date.isSame(dayjs(), "day");
    const isFuture = date.isAfter(dayjs(), "day");

    return (
      <div className="custom-checkbox-container" ref={checkboxRef}>
        <StyledCheckbox
          checked={isCompleted}
          onChange={(e) => handleCheckboxChange(date, e)}
          disabled={!isToday}
          isFuture={isFuture}
        />
      </div>
    );
  };

  const handleMonthChange = (month: number) => {
    const newDate = currentDate.month(month);
    fetchMonthData(newDate);
    setCurrentDate(newDate);
  };

  const handleYearChange = (year: number) => {
    const newDate = currentDate.year(year);
    fetchMonthData(newDate);
    setCurrentDate(newDate);
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

  return (
    <Wrapper {...swipeHandlers}>
      <Header title="Calendar" />
      <CalendarContainer>
        <Calendar
          mode="month"
          value={currentDate}
          cellRender={dateCellRender}
          headerRender={headerRender}
          onSelect={handleDateSelect}
        />
      </CalendarContainer>
      <BottomModal
        title={`Add Note for ${currentDate.format("YYYY-MM-DD")}`}
        open={isModalOpen}
        onOk={handleSaveNote}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <StyledButton key="save" type="primary" onClick={handleSaveNote}>
            Save Note
          </StyledButton>,
        ]}
      >
        <StyledTextArea
          value={notes[currentDate.format("YYYY-MM-DD")] || ""}
          onChange={handleNoteChange}
          placeholder="Enter your note here..."
        />
      </BottomModal>
    </Wrapper>
  );
};

export default CalendarWithCheckbox;
