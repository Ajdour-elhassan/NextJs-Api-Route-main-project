import { MongoClient } from "mongodb";

// Adding helper function
function connectWithDb() {
  // Connect Db
  const client = await MongoClient.connect(
    "mongodb+srv://schooltech1996:<matamata>@nextjs-db.xdazd.mongodb.net/events?retryWrites=true&w=majority"
  );

  return client;
}

function inserDocumment(client, document) {
  // access to db
  const db = client.db();

  // Create a table in db for comments
  const createCommentCollection = await db
    .collection("comments")
    .inserOne({ comments: newComment });

  return createCommentCollection;
}

async function handler(req, res) {
  const eventId = req.query.eventId;

  //   POST Request
  if (req.method === "POST") {
    // Add server side validation
    const { email, name, text } = req.body;

    // Connect Db
    await MongoClient.connect(
      "mongodb+srv://schooltech1996:<matamata>@nextjs-db.xdazd.mongodb.net/events?retryWrites=true&w=majority"
    );

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Comment!" });
      return;
    }

    const newComment = {
      // id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    };

    // access to db
    const db = client.db();

    // Create a table in db for comments
    const createCommentCollection = await db
      .collection("comments")
      .inserOne({ comments: newComment });

    console.log(createCommentCollection);
    res
      .status(201)
      .json({ message: "Comment add successfully", comment: newComment });
  }

  //   GET Request  => Get Data From Database
  if (req.method === "GET") {
    const document = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 }) // Sort means get first comment is Collection of Comments
      .toArray();

    // const dummyList = [
    //   {
    //     id: "x1",
    //     email: "hssn@gmail.com",
    //     name: "hassan",
    //     text: "Nice Post",
    //   },
    //   { id: "x2", name: "hanane", text: "Nice Post" },
    //   { id: "x3", name: "mata", text: "Nice Post" },
    // ];

    res.status(200).json({ comments: document });
  }

  client.close();
}

export default handler;
