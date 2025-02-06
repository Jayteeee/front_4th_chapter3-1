import { act, renderHook, waitFor } from '@testing-library/react';

import { useNotifications } from '../../hooks/useNotifications.ts';
import { Event } from '../../types.ts';
import { formatDate } from '../../utils/dateUtils.ts';
import { parseHM } from '../utils.ts';

vi.useFakeTimers();

const now = new Date();
const MockEvents: Event[] = [
  {
    id: '1',
    title: 'Test Event',
    date: formatDate(now),
    startTime: parseHM(now),
    endTime: parseHM(new Date(now.getTime() + 60 * 60 * 1000)),
    location: 'Test Location',
    description: 'Test Description',
    category: 'Test Category',
  },
];

it('초기 상태에서는 알림이 없어야 한다', () => {
  const { result } = renderHook(() => useNotifications([]));

  expect(result.current.notifications).toHaveLength(0);
});

it('지정된 시간이 된 경우 알림이 새롭게 생성되어 추가된다', async () => {
  const { result } = renderHook(() => useNotifications(MockEvents));

  act(() => {
    vi.advanceTimersByTime(1000); // 1초가 지난 후
  });

  await act(async () => {
    vi.runOnlyPendingTimers();
  });

  expect(result.current.notifications).toHaveLength(1);
  expect(result.current.notifications[0].message).toMatch('Test Event');
});

it('index를 기준으로 알림을 적절하게 제거할 수 있다', () => {
  const { result } = renderHook(() => useNotifications(MockEvents));

  act(() => {
    result.current.removeNotification(0);
  });

  expect(result.current.notifications).toHaveLength(0);
});

it('이미 알림이 발생한 이벤트에 대해서는 중복 알림이 발생하지 않아야 한다', async () => {
  const { result } = renderHook(() => useNotifications(MockEvents));

  act(() => {
    vi.advanceTimersByTime(1000);
  });

  await act(async () => {
    vi.runOnlyPendingTimers();
  });

  expect(result.current.notifications).toHaveLength(1);

  act(() => {
    vi.advanceTimersByTime(1000);
  });

  await act(async () => {
    vi.runOnlyPendingTimers();
  });

  expect(result.current.notifications).toHaveLength(1);
});
