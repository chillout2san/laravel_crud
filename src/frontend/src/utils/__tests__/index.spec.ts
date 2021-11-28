import { createURLSearchParams } from '..'

test('createURLSearchParams のテスト', () => {
  interface TestType {
    hoge: string
    status: string
    id: string
  }
  const params = createURLSearchParams<TestType>([
    ['hoge', 'ほげ'],
    ['status', 'ステータス'],
  ])
  expect(params.getAll('hoge')).toEqual(['ほげ'])
  expect(params.getAll('status')).toEqual(['ステータス'])
  expect(params.getAll('id').length).toBe(0)
})
