import { createClient } from "contentful";

const client = createClient({
  space: "5qd8uxunnv69",
  environment: "master",
  accessToken: "gkmni5rbKRJ2hnLNnxDlBMwgX9S2fsQP9WlmhIgyblI"
});

// Just test the raw entry fetch
client.getEntry("34BCvu9WbAX6AzKG3RX7AS")
  .then((entry) => console.log(entry))
  .catch(console.error);
