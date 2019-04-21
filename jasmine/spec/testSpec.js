describe("function transformInputStringToArray", function() {
  it("transform input string to array", function() {
    expect(transformInputStringToArray('[[2,3 ],  [1,6]]')).toEqual([[2, 3], [1, 6]]);
  });
  it("incorrect input", function() {
    expect(transformInputStringToArray('fkh59403')).toEqual([[NaN]]);
  });
});
