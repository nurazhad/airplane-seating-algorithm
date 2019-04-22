describe("function transformInputStringToArray", function() {
  it("transform input string to array", function() {
    expect(controller.transformInputStringToArray('[[2,3 ],  [1,6]]')).toEqual([[2, 3], [1, 6]]);
    expect(controller.transformInputStringToArray('[[1, 2], [1, 2]]')).toEqual([[1, 2], [1, 2]]);
    expect(controller.transformInputStringToArray('[[1, 2], [2, 1]]')).toEqual([[1, 2], [2, 1]]);
    expect(controller.transformInputStringToArray('[[0, 0]]')).toEqual([[0, 0]]);
    expect(controller.transformInputStringToArray('[[a, b]]')).toEqual([[NaN, NaN]]);
    expect(controller.transformInputStringToArray('[[-5, 123]]')).toEqual([[-5, 123]]);
    expect(controller.transformInputStringToArray('fkh59403')).toEqual([[NaN]]);
  });
});

describe("function checkInput", function() {
  it("check correct input", function() {
    expect(controller.checkInput([[2,3], [1,6]], 3)).not.toBe(false);
  });
  it("check incorrect string to array", function() {
    expect(controller.checkInput([[NaN, 3]], 34)).toBe(false);
  });
  it("check too long string to array", function() {
    expect(controller.checkInput([[2,3], [1,6], [2,3], [1,6], [2,3], [1,6], [2,3], [1,6], [2,3], [1,6]], 34)).toBe(false);
  });
  it("check incorrect string to array", function() {
    expect(controller.checkInput([[-5, 2], [1, 6]], 34)).toBe(false);
  });
  it("check incorrect queue", function() {
    expect(controller.checkInput([[3, 2], [1, 6]], -34)).toBe(false);
  });
  it("check incorrect queue", function() {
    expect(controller.checkInput([[3, 2], [1, 6]], 1.5)).toBe(false);
  });
});
