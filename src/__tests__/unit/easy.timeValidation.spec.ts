import { getTimeErrorMessage } from '../../utils/timeValidation';

describe('getTimeErrorMessage >', () => {
  it('시작 시간이 종료 시간보다 늦을 때 에러 메시지를 반환한다', () => {
    const startTime = '14:30';
    const endTime = '13:30';
    const errorMessage = getTimeErrorMessage(startTime, endTime);
    expect(errorMessage.startTimeError).toBe('시작 시간은 종료 시간보다 빨라야 합니다.');
  });

  it('시작 시간과 종료 시간이 같을 때 에러 메시지를 반환한다', () => {
    const startTime = '14:30';
    const endTime = '14:30';
    const errorMessage = getTimeErrorMessage(startTime, endTime);
    expect(errorMessage.startTimeError).toBe('시작 시간은 종료 시간보다 빨라야 합니다.');
  });

  it('시작 시간이 종료 시간보다 빠를 때 null을 반환한다', () => {
    const startTime = '13:30';
    const endTime = '14:30';
    const errorMessage = getTimeErrorMessage(startTime, endTime);
    expect(errorMessage.startTimeError).toBeNull();
  });

  it('시작 시간이 비어있을 때 null을 반환한다', () => {
    const startTime = '';
    const endTime = '14:30';
    const errorMessage = getTimeErrorMessage(startTime, endTime);
    expect(errorMessage.startTimeError).toBeNull();
  });

  it('종료 시간이 비어있을 때 null을 반환한다', () => {
    const startTime = '14:30';
    const endTime = '';
    const errorMessage = getTimeErrorMessage(startTime, endTime);
    expect(errorMessage.endTimeError).toBeNull();
  });

  it('시작 시간과 종료 시간이 모두 비어있을 때 null을 반환한다', () => {
    const startTime = '';
    const endTime = '';
    const errorMessage = getTimeErrorMessage(startTime, endTime);
    expect(errorMessage.startTimeError).toBeNull();
    expect(errorMessage.endTimeError).toBeNull();
  });
});
