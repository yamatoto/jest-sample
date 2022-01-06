export default function UseGlobalProperty() {
    const COOKIE_KEY_NAME = 'hogeKey';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { hogeProp, hogeFn } = hogeProperty;

    function clickHandler() {
        hogeFn(hogeProp, 'bar');
    }

    function setCookie(): void {
        // eslint-disable-next-line no-restricted-globals
        const { hostname } = location;
        document.cookie = `${COOKIE_KEY_NAME}=anyValue; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; domain=${hostname}`;
    }

    function removeCookie(): void {
        // NOTE: https://developer.mozilla.org/ja/docs/Web/API/Document/cookie#example_4_reset_the_previous_cookie
        document.cookie = `${COOKIE_KEY_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }

    return (
        <>
            <h2>カスタムglobalオブジェクトのテスト</h2>
            <div>
                <button onClick={clickHandler} type='button'>
                    {hogeProp}ボタン
                </button>
            </div>
            <h2>cookieのテスト</h2>
            <div>
                <button onClick={setCookie} type='button'>
                    setCookie
                </button>
            </div>
            <div style={{ marginTop: '15px' }}>
                <button onClick={removeCookie} type='button'>
                    removeCookie
                </button>
            </div>
        </>
    );
}
