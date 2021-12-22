import { render, screen } from '@testing-library/react';
import Clock from './clock';
import * as DateUtils from './date-utils';

/*
 * 下記でもgetNowのmock可
 * jest.mock('./date-utils', () => ({
 *     getNow: () => new Date(2021, 2, 3, 3, 3, 3),
 * }));
 */

describe('Clock', () => {
    afterEach(() => {
        jest.useRealTimers();
    });

    test('日付が出力される - useFakeTimers', () => {
        jest.useFakeTimers();
        const mockDate = new Date(2021, 0, 1, 1, 1, 1);
        jest.setSystemTime(mockDate);

        render(<Clock />);

        const newDateElement = screen.getByTestId('new-date-element');
        expect(newDateElement?.textContent).toEqual(expect.stringContaining('2021-01-01 01:01:01'));
    });

    test('日付が出力される - globalのDateをspy', () => {
        const mockDate = new Date(2021, 1, 2, 2, 2, 2);
        const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate as unknown as string);

        render(<Clock />);

        const newDateElement = screen.queryByText('newDate:', { exact: false });
        expect(newDateElement?.textContent).toEqual(expect.stringContaining('2021-02-02 02:02:02'));

        spy.mockClear();
        spy.mockRestore();
    });

    test('日付が出力される - 別途用意した関数をspy', () => {
        const mockDate = new Date(2021, 2, 3, 3, 3, 3);
        const spy = jest.spyOn(DateUtils, 'getNow').mockReturnValue(mockDate);
        render(<Clock />);

        const getNowElement = screen.queryByText('getNow:', { exact: false });
        expect(getNowElement?.textContent).toEqual(expect.stringContaining('2021-03-03 03:03:03'));

        spy.mockClear();
        spy.mockRestore();
    });
});
