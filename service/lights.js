const axios = require('axios');

module.exports = {

    on:  async () => {
        await axios.get(`${process.env.HA_NODERED_URL}/light-on`, {
            headers: {
                Authorization: process.env.HA_NODERED_AUTH
            }
        });
    },

    off: async () => {
        const result = await axios.get(`${process.env.HA_NODERED_URL}/light-off`, {
            headers: {
                Authorization: process.env.HA_NODERED_AUTH
            }
        });
    },

    color: async (color = 'random') => {
        let data = {};
        let path = "light-color-rgb";

        if(color.split('')[0] == '#') {
            data.rgb_color = hexToRgb(color);
        } else if (color == 'random') {
            data.rgb_color = `[${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)}]`;
        } else {
            data.color_name = color;
            path = 'light-color-name';
        }
        
        await axios.post(`${process.env.HA_NODERED_URL}/${path}`, 
            data,
            {
                headers: {
                    Authorization: process.env.HA_NODERED_AUTH
                }
            }
        );
    },

};

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `[${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}]`;
}

