const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
    {
        username: 'alesmonde0',
        email: 'nwestnedge0@cbc.ca',
        password: 'password123',
        prof_pic: 'https://picsum.photos/600',
        display_name: 'Ales Monde',
        bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quam accusamus. Saepe aspernatur excepturi in! Reprehenderit repudiandae rerum dolore laboriosam quisquam voluptatibus porro atque, quae inventore tempora, facilis laborum qui!',
        instagram_url: 'https://www.instagram.com/orlandocitysc/?hl=en',
        linkedin_url: 'https://www.linkedin.com/in/ericstanulis/',
        facebook_url: 'www.facebook.com',
        twitter_url: 'https://twitter.com/OrlandoLionsDen'
    },
    {
        username: 'jwilloughway1',
        email: 'rmebes1@sogou.com',
        password: 'password123'
    },
    {
        username: 'iboddam2',
        email: 'cstoneman2@last.fm',
        password: 'password123'
    },
    {
        username: 'dstanmer3',
        email: 'ihellier3@goo.ne.jp',
        password: 'password123'
    },
    {
        username: 'djiri4',
        email: 'gmidgley4@weather.com',
        password: 'password123'
    },
    {
        username: 'msprague5',
        email: 'larnout5@imdb.com',
        password: 'password123'
    },
    {
        username: 'mpergens6',
        email: 'hnapleton6@feedburner.com',
        password: 'password123',
        display_name: 'Morgan Pergens',
        bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quam accusamus. Saepe aspernatur excepturi in! Reprehenderit repudiandae rerum dolore laboriosam quisquam voluptatibus porro atque, quae inventore tempora, facilis laborum qui!',
        instagram_url: 'https://www.instagram.com/orlandocitysc/?hl=en',
        linkedin_url: 'https://www.linkedin.com/in/ericstanulis/',
        facebook_url: 'www.facebook.com',
        twitter_url: 'https://twitter.com/OrlandoLionsDen'
    },
    {
        username: 'tpenniell7',
        email: 'kperigo7@china.com.cn',
        password: 'password123'
    },
    {
        username: 'msabbins8',
        email: 'lmongain8@google.ru',
        password: 'password123'
    },
    {
        username: 'jmacarthur9',
        email: 'bsteen9@epa.gov',
        password: 'password123'
    }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;