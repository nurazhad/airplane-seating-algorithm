describe("function transformInputStringToArray", function() {
  it("transform input string to array", function() {
    expect(controller.transformInputStringToArray('[[2,3 ],  [1,6]]')).toEqual([[2, 3], [1, 6]]);
  });
  it("incorrect input", function() {
    expect(controller.transformInputStringToArray('fkh59403')).toEqual([[NaN]]);
  });
});
