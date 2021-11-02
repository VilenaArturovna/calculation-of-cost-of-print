module.exports = (statusCode: any, body: any) => {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
};
