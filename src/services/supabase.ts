export async function saveDateRequest(payload: {
  name: string;
  activity: string;
  date: string;
  time: string;
}) {

  const response = await fetch(
    `/api/date-request`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    }
  );


  if (!response.ok) {
    throw new Error(
      `Failed to save date request: ${response.status}`
    );
  }

}