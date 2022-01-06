/**
 * @jest-environment ./src/test/custom-js-dom-environment.ts
 */
import { render, screen, fireEvent } from '@testing-library/react';
import GlobalTest from './globalTest';

describe('GlobalTest', () => {
    test('hogeボタンクリック時、hogeFnが実行される', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { hogeProperty } = global;
        const { hogeProp } = hogeProperty;
        const hogeFnSpy = jest.spyOn(hogeProperty, 'hogeFn');

        render(<GlobalTest />);

        fireEvent.click(screen.getByText(`${hogeProp}ボタン`));

        expect(hogeFnSpy).toHaveBeenCalledWith(hogeProp, 'bar');
    });

    describe('cookie', () => {
        // eslint-disable-next-line no-restricted-globals
        const { hostname } = location;
        const COOKIE_KEY_NAME = 'hogeKey';

        afterEach(() => {
            // cookieの値戻しておく
            Object.defineProperty(document, 'cookie', {
                value: undefined,
            });
        });

        test('setCookieボタンクリック時、cookieが設定される', () => {
            render(<GlobalTest />);

            fireEvent.click(screen.getByText('setCookie'));

            const { cookie } = document;
            expect(cookie).toEqual(
                `${COOKIE_KEY_NAME}=anyValue; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; domain=${hostname}`
            );
        });

        test('removeCookieボタンクリック時、指定したキーのcookieが削除される', () => {
            render(<GlobalTest />);

            fireEvent.click(screen.getByText('removeCookie'));

            const { cookie } = document;
            expect(cookie).toEqual('hogeKey=; expires=Thu, 01 Jan 1970 00:00:00 GMT');
        });
    });
});
