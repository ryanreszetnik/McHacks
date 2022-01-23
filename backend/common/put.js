const updateItem = async (table, item) => {
  const params = {
    Item: item,
    TableName: table,
    ReturnValues: "ALL_OLD",
  };
  return (await documentClient.put(params).promise()).Attributes;
};

exports.putSingle = updateItem;
