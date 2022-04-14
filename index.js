const express = require("express");
const movies = require("./data");

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/movies", (req, res) => {
    res.status(200).json(movies);
});

app.get("/api/movies/:id", (req, res) => {
    const movie = movies.find((e) => e.id === Number(req.params.id));
    res.status(200).json(movie);
});

app.post("/api/movies", (req, res) => {
    // Destructuring
    const { movieTitle, genre, release } = req.body;

    // Dapatkan ID dari item terakhir
    const lastId = movies[movies.length - 1].id;
    const newId = lastId + 1;

    const movie = {
        id: newId,
        movieTitle,
        genre,
        release,
    };

    movies.push(movie);
    
    res.status(201).json(movie);
});

app.put("/api/movies/:id", (req, res) => {
    // Destructuring
    const { movieTitle, genre, release } = req.body;

    const indexMovie = movies.findIndex(
        (e) => e.id === Number(req.params.id)
        );

    movies[indexMovie] = {
        id: Number(req.params.id),
        movieTitle,
        genre,
        release,
    };

    res.status(200).json(movies[indexMovie]);
});

app.delete("/api/movies/:id", (req, res) => {
    const indexMovie = movies.findIndex(
        (e) => e.id === Number(req.params.id)
        );
    
    movies.splice(indexMovie, 1);

    res.status(200).json({ 
        message: `Movie with ID ${req.params.id} is deleted`,
    });
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});