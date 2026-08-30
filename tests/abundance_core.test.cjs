const test = require('node:test');
const assert = require('node:assert/strict');
require('../abundance_core.js');
const core = global.AbundanceCore;

test('完整本地日期标识跨月和跨年保持正确', () => {
  assert.equal(core.localDateKey(new Date(2026, 7, 29)), '2026-08-29');
  assert.equal(core.localDateKey(new Date(2027, 0, 1)), '2027-01-01');
});

test('金额阶段集中配置并覆盖边界次数', () => {
  assert.equal(core.stageForSequence(1).amount, 1000);
  assert.equal(core.stageForSequence(30).amount, 1000);
  assert.equal(core.stageForSequence(31).amount, 3000);
  assert.equal(core.stageForSequence(60).amount, 3000);
  assert.equal(core.stageForSequence(61).amount, 5000);
  assert.equal(core.stageForSequence(91).amount, 10000);
  assert.equal(core.stageForSequence(121).amount, 20000);
});

test('未精确安排完不能封存，超额也不能封存', () => {
  const practice = { amount: 1000, sealedAt: null, items: [{ amount: 720 }] };
  assert.equal(core.canSeal(practice), false);
  practice.items.push({ amount: 400 });
  assert.equal(core.canSeal(practice), false);
  practice.items[1].amount = 280;
  assert.equal(core.canSeal(practice), true);
});

test('跨日但上一轮未完成时不解锁新财富', () => {
  const state = { current: { unlockedDate: '2026-08-28', sealedAt: null }, history: [] };
  assert.equal(core.canUnlockNextPractice(state, '2026-08-29'), false);
  assert.equal(core.nextPractice(state, '2026-08-29', 2), state.current);
});

test('同日已封存仍不能重复领取', () => {
  const state = { current: { unlockedDate: '2026-08-29', sealedAt: 1 }, history: [{}] };
  assert.equal(core.canUnlockNextPractice(state, '2026-08-29'), false);
});

test('跨日且上一轮已封存时解锁下一次，漏天不重置次数', () => {
  const state = {
    modeId: 'steady',
    current: { unlockedDate: '2026-08-28', sealedAt: 1 },
    history: Array.from({ length: 12 }, (_, i) => ({ sequence: i + 1 }))
  };
  const next = core.nextPractice(state, '2026-09-03', 99);
  assert.equal(next.sequence, 13);
  assert.equal(next.unlockedDate, '2026-09-03');
  assert.equal(next.amount, 1000);
});
