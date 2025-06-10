# Comments on Playwright tests

- **Tests should be focused and simple**
e.g., there is only one case in `after-response-script-features.test.ts`, but the case has `130+` lines, which is hard to read and understand.
Each test should verify one specific behavior. It would be better to split this entire test flow into smaller, step-by-step test cases. This will make it easier to locate and debug issues.

- **The description of the test case needs to be clear.**
e.g., the description of [this test](https://github.com/Kong/insomnia/blob/develop/packages/insomnia-smoke-test/tests/smoke/after-response-script-features.test.ts#L8) is `all`. It's too generic. It should clearly state what functionality is being tested to make it easier to maintain later.

- **Extract duplicated logic for reuse**
e.g., [Line 9-15](https://github.com/Kong/insomnia/blob/develop/packages/insomnia-smoke-test/tests/smoke/after-response-script-features.test.ts#L9-L15) and [Line 18-23](https://github.com/Kong/insomnia/blob/develop/packages/insomnia-smoke-test/tests/smoke/after-response-script-features.test.ts#L18-L23) are almost identical, can be extracted into a separate method that can be reused.

- **Avoid using hard waits**
e.g., [page.waitForTimeout(5000)](https://github.com/Kong/insomnia/blob/develop/packages/insomnia-smoke-test/tests/critical/backup.test.ts#L24)
It is recommended to avoid hardcoded waiting mechanisms, as they can lead to flaky or inefficient tests. Maybe use explicit wait instead.

- **Comments will be helpful**
e.g., [130+ lines](https://github.com/Kong/insomnia/blob/develop/packages/insomnia-smoke-test/tests/smoke/app.test.ts) without comments.
It would be helpful to add a few comments to improve code readability and maintainability.

- **Fix Eslint warnings**
e.g., [Unexpected use of page.waitForSelector()](https://github.com/Kong/insomnia/blob/develop/packages/insomnia-smoke-test/tests/smoke/pre-request-script-features.test.ts#L216)
It's better to refactor the codes to fix eslint warnings.
