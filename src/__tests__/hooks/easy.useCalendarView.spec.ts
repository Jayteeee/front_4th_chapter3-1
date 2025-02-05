import { act, renderHook } from '@testing-library/react';

import { useCalendarView } from '../../hooks/useCalendarView.ts';
import { assertDate } from '../utils.ts';
import { getDaysInMonth } from '../../utils/dateUtils.ts';

describe('초기 상태', () => {
  it('view는 "month"이어야 한다', () => {
    const { result } = renderHook(() => useCalendarView());
    expect(result.current.view).toBe('month');
  });

  it('currentDate는 오늘 날짜인 "2024-10-01"이어야 한다', () => {
    const { result } = renderHook(() => useCalendarView());
    const expectedDate = new Date('2024-10-01'); // 기대하는 날짜를 Date 객체로 생성
    expect(result.current.currentDate).toEqual(expectedDate); // Date 객체 비교
  });

  it('holidays는 10월 휴일인 개천절, 한글날이 지정되어 있어야 한다', () => {
    const { result } = renderHook(() => useCalendarView());
    expect(result.current.holidays).toEqual({
      '2024-10-03': '개천절',
      '2024-10-09': '한글날',
    });
  });
});

it("view를 'week'으로 변경 시 적절하게 반영된다", () => {
  const { result } = renderHook(() => useCalendarView());
  act(() => {
    result.current.setView('week'); // view 변경 함수 호출
  });
  expect(result.current.view).toBe('week');
});

it("주간 뷰에서 다음으로 navigate시 7일 후 '2024-10-08' 날짜로 지정이 된다", () => {
  const { result } = renderHook(() => useCalendarView());
  const after7days = new Date(new Date().setDate(result.current.currentDate.getDate() + 7)); // 7일 후 날짜
  act(() => {
    result.current.setView('week'); // 주간 뷰로 변경
  });
  act(() => {
    result.current.navigate('next'); // 다음 주로 이동
  });
  expect(result.current.currentDate).toStrictEqual(after7days);
});

it("주간 뷰에서 이전으로 navigate시 7일 후 '2024-09-24' 날짜로 지정이 된다", () => {
  const { result } = renderHook(() => useCalendarView());
  const before7days = new Date(new Date().setDate(result.current.currentDate.getDate() - 7)); // 7일 전 날짜
  act(() => {
    result.current.setView('week'); // 주간 뷰로 변경
  });
  act(() => {
    result.current.navigate('prev'); // 이전 주로 이동
  });
  expect(result.current.currentDate).toStrictEqual(before7days);
});

it("월간 뷰에서 다음으로 navigate시 한 달 후 '2024-11-01' 날짜여야 한다", () => {
  const { result } = renderHook(() => useCalendarView());
  const after1month = new Date(
    new Date().setDate(
      result.current.currentDate.getDate() +
        getDaysInMonth(
          result.current.currentDate.getFullYear(), // 연도
          result.current.currentDate.getMonth() // 월
        ) +
        1 // 1일 추가 (다음 달 1일로 이동)
    )
  ); // 한달 후 날짜
  act(() => {
    result.current.setView('month'); // 월간 뷰로 변경
  });
  act(() => {
    result.current.navigate('next'); // 다음 달로 이동
  });
  expect(result.current.currentDate).toStrictEqual(after1month);
});

it("월간 뷰에서 이전으로 navigate시 한 달 전 '2024-09-01' 날짜여야 한다", () => {
  const { result } = renderHook(() => useCalendarView());
  const before1month = new Date(
    new Date().setDate(
      result.current.currentDate.getDate() -
        getDaysInMonth(
          result.current.currentDate.getFullYear(), // 연도
          result.current.currentDate.getMonth() - 1 // 월
        ) +
        1 // 1일 추가 (이전 달 1일로 이동)
    )
  ); // 한달 전 날짜
  act(() => {
    result.current.setView('month'); // 월간 뷰로 변경
  });
  act(() => {
    result.current.navigate('prev'); // 이전 달로 이동
  });
  expect(result.current.currentDate).toStrictEqual(before1month);
});

it("currentDate가 '2024-01-01' 변경되면 1월 휴일 '신정'으로 업데이트되어야 한다", () => {
  const { result } = renderHook(() => useCalendarView());
  const NewYearsDay = new Date('2024-01-01'); // 1월 1일을 Date 객체로 생성
  act(() => {
    result.current.setCurrentDate(NewYearsDay); // currentDate 변경
  });
  expect(result.current.holidays).toEqual({
    '2024-01-01': '신정',
  });
});
