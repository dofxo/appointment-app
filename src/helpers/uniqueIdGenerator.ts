const uniqueIdGenerator = () => {
  const uuid = crypto.randomUUID().replace(/\D/g, "");
  return parseInt(uuid.slice(0, 9), 10);
};

export default uniqueIdGenerator;
