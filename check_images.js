const https = require('https');
const urls = [
  "https://images.unsplash.com/photo-1628840042765-356cda07504e",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
  "https://images.unsplash.com/photo-1579751626657-72bc17010498",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  "https://images.unsplash.com/photo-1594212691516-018591873130",
  "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
  "https://images.unsplash.com/photo-1606755962773-d324e0a13086",
  "https://images.unsplash.com/photo-1550547660-d9450f859349",
  "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6",
  "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3",
  "https://images.unsplash.com/photo-1622483767028-3f66f32aef97",
  "https://images.unsplash.com/photo-1625624796338-71e8601275eb",
  "https://images.unsplash.com/photo-1548839140-29a749e1bc4e",
  "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
];

urls.forEach(url => {
  https.request(url, { method: 'HEAD' }, (res) => {
    console.log(url, res.statusCode);
  }).end();
});
