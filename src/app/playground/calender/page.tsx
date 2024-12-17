"use client";

import { useCallback, useMemo, useState } from "react";

class YearMonth {
    readonly year: number;
    readonly month: number;

    constructor(year?: number, month?: number) {
        const date = new Date();
        this.year = year ?? date.getFullYear();
        this.month = month ?? date.getMonth();
    }

    toString(): string {
        return `${this.year}.${this.month}`;
    }

    getNext(): YearMonth {
        if (this.month === 11) {
            return new YearMonth(this.year + 1, 0);
        } else {
            return new YearMonth(this.year, this.month + 1);
        }
    }

    getPrevious(): YearMonth {
        if (this.month === 0) {
            return new YearMonth(this.year - 1, 11);
        } else {
            return new YearMonth(this.year, this.month - 1);
        }
    }

    getLastDay(): number {
        const date = new Date();
        date.setMonth(this.month + 1);
        date.setDate(0);
        return date.getDate();
    }
}

class _Date {
    readonly year: number;
    readonly month: number;
    readonly date: number; //日にち
    readonly day: number; // 曜日

    constructor(year: number, month: number, date: number) {
        this.year = year;
        this.month = month;
        this.date = date;
        this.day = new Date(year, month - 1, date).getDay();
    }

    // YearMonthからDateを生成
    static fromYearMonth(yearMonth: YearMonth, date: number): _Date {
        return new _Date(yearMonth.year, yearMonth.month, date);
    }

    // 年月と日付の配列からDateを生成
    static fromDays(year: number, month: number, days: number[]): _Date[] {
        return days.map((date) => new _Date(year, month, date));
    }

    toString(): string {
        return `${this.year}.${this.month}.${this.date}`;
    }
}

// startからendまでの整数の順列を生成
const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const useYearMonth = () => {
    const [selectedDate, setSelectedDate] = useState<YearMonth>(new YearMonth());
    const nextMonth = useCallback(() => {
        setSelectedDate(selectedDate.getNext());
    }, [selectedDate]);
    const previousMonth = useCallback(() => {
        setSelectedDate(selectedDate.getPrevious());
    }, [selectedDate]);

    return { selectedDate, nextMonth, previousMonth };
};

const useCalenderDays = (targetDate: YearMonth) => {
    console.log(new _Date(2024, 7, 1));

    const generateDays = useMemo((): _Date[] => {
        const currentYearMonth = targetDate;
        const prevYearMonth = targetDate.getPrevious();
        const nextYearMonth = targetDate.getNext();

        const currentMonthFirstDay = new _Date(currentYearMonth.year, currentYearMonth.month, 1);
        const currentMonthLastDay = new _Date(currentYearMonth.year, currentYearMonth.month, currentYearMonth.getLastDay());

        // 求める月の最初の日の曜日番号の個数だけ前月の日付を生成
        const prevMonthDays = range(prevYearMonth.getLastDay() - currentMonthFirstDay.day + 1, prevYearMonth.getLastDay());
        console.log(prevYearMonth.getLastDay(), currentMonthFirstDay.day, prevYearMonth.getLastDay());

        // 現在の月
        const currentMonthDays = range(1, currentMonthLastDay.date);

        // (7-現在の月の最後の日の曜日番号-1) + 7*[行数] 個だけ次の月の日付を生成
        const nextMonthDays = range(1, 7 - currentMonthLastDay.day - 1 + 7 * 1);

        const prevMonthDates = _Date.fromDays(prevYearMonth.year, prevYearMonth.month, prevMonthDays);
        const currentMonthDates = _Date.fromDays(currentYearMonth.year, currentYearMonth.month, currentMonthDays);
        const nextMonthDates = _Date.fromDays(nextYearMonth.year, nextYearMonth.month, nextMonthDays);

        return [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];
    }, [targetDate]);

    return generateDays;
};

export default function Calendar() {
    const { selectedDate, nextMonth, previousMonth } = useYearMonth();

    const calendarDays = useCalenderDays(selectedDate);

    return (
        <div className="flex size-fit flex-col">
            <text>
                {selectedDate.year}. {selectedDate.month}
            </text>
            <button onClick={() => nextMonth()}>Next month</button>
            <button onClick={() => previousMonth()}>Previous month</button>
            <div className="grid grid-flow-row grid-cols-7 grid-rows-7">
                {calendarDays.map((day) =>
                    day.month === selectedDate.month ? (
                        <div key={day.toString()} className="grid border bg-lime-200">
                            {day.date}
                        </div>
                    ) : (
                        <div key={day.toString()} className="grid border">
                            {day.date}
                        </div>
                    ),
                )}
            </div>
        </div>
    );
}
