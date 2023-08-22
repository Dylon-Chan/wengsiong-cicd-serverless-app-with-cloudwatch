const { format, getHours } = require('date-fns');
const { utcToZonedTime } = require('date-fns-tz');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'serverless-nodejs' },
    transports:[
        new winston.transports.Console({ format: winston.format.simple() })
    ],
})

function getGreeting(currentHour) {
    logger.debug(`Current hour: ${currentHour}`);
    
    if (currentHour < 12) {
        return "Good morning";
    }   else if (currentHour >= 12 && currentHour < 18) {
        return "Good afternoon";
    }   else {
        return "Good evening";
    }

}

lambdaHandler = async(event) => {
    logger.info('Received event:', event);

    const sgTz = 'Asia/Singapore';
    const now = new Date();
    const sgTime = utcToZonedTime(now, sgTz);
    const currentTime = format(sgTime, 'dd-MM-yyyy HH:mm:ssXXX', { timeZone: sgTz });
    const currentHour = getHours(sgTime);

    const greeting = `${getGreeting(currentHour)}! The time now is ${currentTime}`;

    logger.info(`Greeting generated: ${greeting}`);

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: greeting,
            },
            null,
            2
        ),
    }
}

module.exports = { lambdaHandler, getGreeting }