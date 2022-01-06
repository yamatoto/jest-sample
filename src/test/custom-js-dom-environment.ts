// eslint-disable-next-line import/no-extraneous-dependencies,import/no-import-module-exports
import JSDOMEnvironment from 'jest-environment-jsdom';

class CustomJSDOMEnvironment extends JSDOMEnvironment {
    async setup(): Promise<void> {
        await super.setup();

        // テスト中のglobalプロパティの定義
        this.global.hogeProperty = {
            hogeProp: 'hoge',
            hogeFn(arg1 = '', arg2 = '') {
                // eslint-disable-next-line no-console
                console.log(`${arg1}_${arg2}`);
            },
        };

        // NOTE: これしないとテストでクッキー書き換えられない
        Object.defineProperty(this.global.document, 'cookie', {
            writable: true,
        });
    }

    async teardown(): Promise<void> {
        Object.defineProperty(this.global.document, 'cookie', {
            writable: false,
        });
        await super.teardown();
    }
}

module.exports = CustomJSDOMEnvironment;
