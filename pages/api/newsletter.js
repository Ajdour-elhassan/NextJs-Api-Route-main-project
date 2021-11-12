import { MongoClient } from "mongodb";

// Adding helper function
async function connectWithDb() {
  // Connect Db
  const client = await MongoClient.connect(
    "mongodb+srv://schooltech1996:<matamata>@nextjs-db.xdazd.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}

async function inserDocumment(client, document) {
  const db = client.db();
  // Inserting one Document in database
  await db.collection("emails").insertOne(document);
}

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.include("@")) {
      res.status(422).json({ message: "invalid Email" });
      return;
    }
  }

  let client;

  try {
    // Conenct Db
    client = await connectWithDb();
  } catch (error) {
    res.status(500).json({ message: "Connecting to databse failed" });
    return; // Stop
  }

  try {
    // Inserting one Document in database
    await inserDocumment(client, { email: userEmail });
    client.close();
  } catch (err) {
    res.status(500).json({ message: "Inserting data failed" });
    return; // Stop
  }

  console.log(userEmail);
  res.status(202).json({ message: "Email entered successfully" });
}

export default handler;
