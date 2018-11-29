const baseUrl = "https://api.douban.com/v2/movie/subject";
const rp = require("request-promise-native");
const mongoose = require("mongoose");
const Movie = mongoose.model("Movie");
const Category = mongoose.model("Category");

async function fetchMovie(item) {
  const url = `${baseUrl}/${item.doubanId}`;
  const request = await rp(url);
  return request;
}

(async () => {
  const movies = await Movie.find({
    $or: [
      { summary: { $exists: false } },
      { summary: null },
      { summary: "" },
      { title: "" }
    ]
  });

  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i];
    console.log(movie.doubanId);

    const movieD = await fetchMovie(movie);
    console.log(typeof movieD);

    if (movieD) {
      const {
        aka = [],
        summary,
        alt_title,
        title,
        original_title,
        genres
      } = JSON.parse(movieD);
      console.log("aka", movieD.aka);
      console.log("summary", summary);
      console.log("alt_title", alt_title);
      console.log("title", title);
      console.log("original_title", original_title);
      console.log("genres", genres);
      movie.tags = aka;
      movie.summary = summary || "";
      movie.title = alt_title || title || "";
      movie.rawTitle = original_title || title || "";
      movie.movieTypes = genres || [];
      for (let i = 0; i < movie.movieTypes.length; i++) {
        const item = movie.movieTypes[i];
        let cat = await Category.findOne({
          name: item
        });
        if (!cat) {
          cat = new Category({
            movies: [movie._id],
            name: item
          });
        } else if (!~cat.movies.indexOf(movie._id)) {
          cat.movies.push(movie._id);
        }

        await cat.save();
        if (!movie.categorys) {
          movie.categorys.push(cat._id);
        } else if (!~movie.categorys.indexOf(cat._id)) {
          movie.categorys.push(cat._id);
        }
      }
      await movie.save();
    }
  }
})();
