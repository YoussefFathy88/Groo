import { isSetupWorking } from './setup-check';

test('test setup runs', () => {
  expect(isSetupWorking()).toBe(true);
});
