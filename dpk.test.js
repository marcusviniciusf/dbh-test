const { deterministicPartitionKey } = require("./dpk");
const { fakeArray, fakeNum, fakeObj, fakeStr } = require("./mockData");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns a hash when given a partitionKey with less then 256 length", () => {
    const input = { partitionKey: "a".repeat(20) };
    const trivialKey = deterministicPartitionKey(input);
    expect(trivialKey).toHaveLength(20);
  });
  it("Returns a hash when given a partitionKey with higher then 256 length", () => {
    const input = { partitionKey: "a".repeat(300) };
    const trivialKey = deterministicPartitionKey(input);
    expect(trivialKey).not.toHaveLength(0);
  });
  it("Returns a hash when given any kind of value", () => {
    const trivialKeyFromLorem = deterministicPartitionKey(fakeStr);
    const trivialKeyFromNumber = deterministicPartitionKey(fakeNum);
    const trivialKeyFromObj = deterministicPartitionKey(fakeObj);
    const trivialKeyFromArr = deterministicPartitionKey(fakeArray);
    expect(trivialKeyFromLorem).not.toHaveLength(0);
    expect(trivialKeyFromNumber).not.toHaveLength(0);
    expect(trivialKeyFromObj).not.toHaveLength(0);
    expect(trivialKeyFromArr).not.toHaveLength(0);
  });
});
