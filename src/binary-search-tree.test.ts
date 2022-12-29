import {getKthValue, bst} from "./binary-search-tree";

describe('二叉搜索树', function () {
  it('正常情况', function () {
    const res = getKthValue(bst, 3)
    expect(res).toEqual(4)
  });
  it('k 不在正常范围之内', function () {
    const res1 = getKthValue(bst, 0)
    expect(res1).toBeNull()

    const res2 = getKthValue(bst, 1000)
    expect(res2).toBeNull()
  });
});
