import dayjs from 'dayjs';
import { getNow } from './date-utils';

export default function Clock() {
    const date = dayjs(new Date());
    date.locale('ja');

    const date2 = dayjs(getNow());
    date2.locale('ja');

    return (
        <>
            <h2>new Date()のテスト</h2>
            <div data-testid='new-date-element'>newDate: {date.format('YYYY-MM-DD HH:mm:ss')}</div>
            <div data-testid='get-now-element'>getNow: {date2.format('YYYY-MM-DD HH:mm:ss')}</div>
        </>
    );
}
