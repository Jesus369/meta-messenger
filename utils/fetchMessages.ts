const fetcher = async () => {
  // Handling GET request to the DB.
  const res = await fetch("/api/getMessages").then((res) => res.json());
  const messages: Message[] = res.messages;

  return messages;
};

export default fetcher;
