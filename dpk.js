const crypto = require("crypto");

const createHashFromInput = (valueIn) => {
  const valueParsed =
    typeof valueIn === "string" ? valueIn : JSON.stringify(valueIn);
  return crypto.createHash("sha3-512").update(valueParsed).digest("hex");
};

const deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate = event?.partitionKey ?? TRIVIAL_PARTITION_KEY;
  if (
    candidate.length > MAX_PARTITION_KEY_LENGTH ||
    (event && !event.partitionKey)
  ) {
    candidate = createHashFromInput(event);
  }
  return candidate;
};

module.exports = { deterministicPartitionKey };
