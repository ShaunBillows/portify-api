const User = require("./model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// const axios = require('axios')
// const cheerio = require('cheerio');
// const SerpApi = require('google-search-results-nodejs')
// const search = new SerpApi.GoogleSearch("Your Private Key")
// search.json({
//  q: "Coffee", 
//  location: "Austin, TX"
// }, (result) => {
//   console.log(result)
// })



// const searchString = "google";
// const encodedString = encodeURI(searchString);

// const AXIOS_OPTIONS = {
//   headers: {
//     "User-Agent":
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
//   },
// };

// function getOrganicResults() {
//   return axios
//     .get(
//       `https://www.google.com/search?q=${encodedString}&hl=en&gl=us`,
//       AXIOS_OPTIONS
//     )
//     .then(function ({ data }) {
//       let $ = cheerio.load(data);

//       const links = [];
//       const titles = [];
//       const snippets = [];

//       $(".yuRUbf > a").each((i, el) => {
//         links[i] = $(el).attr("href");
//       });
//       $(".yuRUbf > a > h3").each((i, el) => {
//         titles[i] = $(el).text();
//       });
//       $(".IsZvec").each((i, el) => {
//         snippets[i] = $(el).text().trim();
//       });

//       const result = [];
//       for (let i = 0; i < links.length; i++) {
//         result[i] = {
//           link: links[i],
//           title: titles[i],
//           snippet: snippets[i],
//         };
//       }

//       console.log(result);
//     });
// }

// const getBeatportGenre = async () => {
//   try {

    // const queries = ["beatport", "Yan", "Cook", "Drifted", "Islands"]
    // console.log(queries.join("+"));
    // const beatportUrls = [`https://www.google.com/search?q=beatport+Yan+Cook+Drifted+Islands`]
    // console.log(beatportUrls);

    // for (let i=0; i<beatportUrls.length; i++) {
      
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // let response = await axios("https://www.google.com/search?q=yan+cook+drifted+islands&oq=yan+cook+drifted+islands&aqs=chrome..69i57j33i10i160l2.5438j0j4&sourceid=chrome&ie=UTF-8")
      // let html = response.data;
      // let $ = await cheerio.load(html)
      // let result = await $('a').text()
      // console.log(result.text());
      // console.log(result);
      // console.log(html);
      // await getOrganicResults();
    // }


    // const beatportUrls = ["https://www.beatport.com/track/breeze-blowing/16929818", "https://www.beatport.com/release/renegade-remix/2477573", "https://www.beatport.com/track/les-la-bas/7967712"]

    // for (let i=0; i<beatportUrls.length; i++) {
      
    //   await new Promise(resolve => setTimeout(resolve, 1000));
    //   let response = await axios(beatportUrls[i])
    //   let html = response.data;
    //   let $ = await cheerio.load(html)
    //   let result = await $('.interior-track-genre').find("a").text().trim()
    //   // console.log(result.text());
    //   console.log(result);
    //   console.log("\n---------------\n");
    // }
    
//   } catch (error) {
//     console.log(error);
//   }
// }


// exports.getTracks = async (req, res) => {
//   console.log("recieved by getTracks");
  // try {
    // const response = await axios("https://www.beatport.com/track/laserbeam/16476832")
    // const html = response.data;

//     const result = await getBeatportGenre()

//     res.status(200).send({result: result});
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ err: `Error at getTracks: ${error}` });
//   }
// }

//   try {
//     const response = await axios("https://www.theguardian.com/uk")
//     const html = response.data;
//     console.log(html);

//     const $ = cheerio.load(html)
//     const articles = []

//     $('.fc-item__title', html).each(() => { //<-- cannot be a function expression
//         const title = $(this).text()
//         const url = $(this).find('a').attr('href')
//         articles.push({
//             title,
//             url
//         })
//     })

//     res.status(200).send({result: articles});
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ err: `Error at CreateUser: ${error}` });
//   }
// }
    // axios("https://www.theguardian.com/uk")
    //     .then(response => {
    //         const html = response.data
    //         console.log(html);
    //         const $ = cheerio.load(html)
    //         const articles = []

    //         $('.fc-item__title', html).each(function () { //<-- cannot be a function expression
    //             const title = $(this).text()
    //             const url = $(this).find('a').attr('href')
    //             articles.push({
    //                 title,
    //                 url
    //             })
    //         })
    //         res.json(articles)
    //     }).catch(err => console.log(err))}


exports.createUser = async (req, res) => {
  try {
    console.log("recieved create user");
    console.log(req.body);
    const newUser = await User.create({ "username": req.body.username, "pass": req.body.pass });
    const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET);
    if (!token || !newUser) {
      throw new Error("An error occured when creating a new user.");
    }
    res.status(200).send({
      msg: `new user created: ${newUser.username}.`,
      user: {
        username: newUser.username,
        playlists: []
      },
      token: token,
    });
  } catch (error) {
    res.status(500).send({ err: `Error at CreateUser: ${error}` });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    const token = await jwt.sign({ _id: user._id }, process.env.SECRET);
    if (!user || !token) {
      throw new Error("No user found.");
    }
    res.status(200).send({
      msg: `You have logged in successfully. Welcome, ${user.username}.`,
      user: {
        username: user.username,
        playlists: []
      },
      token: token,
    });
  } catch (error) {
    res.status(500).send({ err: `Error at login: ${error.message}` });
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (req.body.newPassword) {
      req.body.newPassword = await bcrypt.hash(req.body.newPassword, 8);
      req.result = await User.updateOne(
        { username: req.user.username },
        { password: req.body.newPassword }
      );
    } else if (req.body.newUsername) {
      req.result = await User.updateOne(
        { username: req.user.username },
        { username: req.body.newUsername }
      );
    }
    if (!req.result) {
      throw new Error("Incorrect credentials.");
    }
    res.status(200).send({ msg: "Request processed.", result: req.result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({ username: req.user.username });
    if (!result) {
      throw new Error("Incorrect credentials.");
    }
    res
      .status(200)
      .send({ msg: `Delete successful: ${req.user.username}`, deleted: true });
  } catch (error) {
    res.status(500).send({ err: `Error at deleteUser: ${error.message}` });
  }
};

