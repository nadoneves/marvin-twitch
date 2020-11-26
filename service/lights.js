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

    color: async () => {
        const data = {
            "rgb_color": `[${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)}]`
        };
        
        await axios.post(`${process.env.HA_NODERED_URL}/light-color`, 
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

