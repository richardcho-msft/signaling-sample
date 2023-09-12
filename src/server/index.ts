import Express from "express";
import Path from "path";

const app = Express();

app.use(Express.static("dist"));

app.get("*", (_, res) => {
    res.sendFile(Path.join(__dirname, "../../dist/index.html"));
});

app.listen(3000, () => {
    console.log("hello world.");
});
