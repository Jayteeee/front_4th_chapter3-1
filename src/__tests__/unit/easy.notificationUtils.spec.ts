import { Event } from '../../types';
import { createNotificationMessage, getUpcomingEvents } from '../../utils/notificationUtils';

describe('getUpcomingEvents', () => {
  it('알림 시간이 정확히 도래한 이벤트를 반환한다', () => {
    const events: Event[] = [
      {
        title: '회의',
        date: '2024-07-01',
        startTime: '14:30',
        endTime: '15:30',
        id: '1',
        description: '',
        location: '',
        category: '',
        repeat: undefined,
        notificationTime: 0,
      },
    ];
    const upcomingEvents = getUpcomingEvents(events, new Date('2024-07-01T14:30'), []);
    expect(upcomingEvents).toEqual([
      {
        title: '회의',
        date: '2024-07-01',
        startTime: '14:30',
        endTime: '15:30',
        id: '1',
        description: '',
        location: '',
        category: '',
        repeat: undefined,
        notificationTime: 0,
      },
    ]);
  });

  it('이미 알림이 간 이벤트는 제외한다', () => {
    const events: Event[] = [
      {
        title: '회의',
        date: '2024-07-01',
        startTime: '14:30',
        endTime: '15:30',
        id: '1',
        description: '',
        location: '',
        category: '',
        repeat: undefined,
        notificationTime: 0,
      },
    ];
    const upcomingEvents = getUpcomingEvents(events, new Date('2024-07-01T14:30'), ['1']);
    expect(upcomingEvents).toEqual([]);
  });

  it('알림 시간이 아직 도래하지 않은 이벤트는 반환하지 않는다', () => {
    const events: Event[] = [
      {
        title: '회의',
        date: '2024-07-01',
        startTime: '14:30',
        endTime: '15:30',
        id: '1',
        description: '',
        location: '',
        category: '',
        repeat: undefined,
        notificationTime: 10,
      },
    ];
    const upcomingEvents = getUpcomingEvents(events, new Date('2024-07-01T14:20'), []);
    expect(upcomingEvents).toEqual([]);
  });

  it('알림 시간이 지난 이벤트는 반환하지 않는다', () => {
    const events: Event[] = [
      {
        title: '회의',
        date: '2024-07-01',
        startTime: '14:30',
        endTime: '15:30',
        id: '1',
        description: '',
        location: '',
        category: '',
        repeat: undefined,
        notificationTime: 10,
      },
    ];
    const upcomingEvents = getUpcomingEvents(events, new Date('2024-07-01T14:40'), []);
    expect(upcomingEvents).toEqual([]);
  });
});

describe('createNotificationMessage', () => {
  it('올바른 알림 메시지를 생성해야 한다', () => {
    const event: Event = {
      title: '회의',
      date: '2024-07-01',
      startTime: '14:30',
      endTime: '15:30',
      id: '1',
      description: '',
      location: '',
      category: '',
      repeat: undefined,
      notificationTime: 10,
    };
    const notificationMessage = createNotificationMessage(event);
    expect(notificationMessage).toBe('10분 후 회의 일정이 시작됩니다.');
  });
});
