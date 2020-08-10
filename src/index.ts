import * as Hapi from '@hapi/hapi';
import * as HapiSwagger from 'hapi-swagger';
import * as Inert from "@hapi/inert";
import * as Vision from "@hapi/vision";
import * as Joi from "@hapi/joi";;
import { Server } from "@hapi/hapi";
import { postEvents } from './controller/events'
import CONFIGS from './util/configs'
 
const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
        title: 'Test API Documentation'
    }
};
 
const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
    {
        plugin: Inert
    },
    {
        plugin: Vision
    },
    {
        plugin: HapiSwagger,
        options: swaggerOptions
    }
];






 
const server: Server = new Server({
    port: CONFIGS.PORT || 3000,
    router: {
      stripTrailingSlash: true,
    },
  });
  
  server.route([{
    method: 'GET',
    path: '/produce',
    options: {
        handler: () => ({produce: 'kale'}),
        description: 'Get all produce',
        notes: 'Returns all produce',
        tags: ['api'], // ADD THIS TAG
    },
},
{
    method: 'POST',
    path: '/addEvent',
    options: {
        handler: postEvents,
        cors: {
            origin: ["*"],
            credentials: true,
          },
        description: 'Add delivery or pick up event',
        notes: 'Sends SMTP email to admins to schedule delivery or pickup',
        tags: ['api'], // ADD THIS TAG
        validate: {
            payload: Joi.object({
                name: Joi.string(),
                returnEmailAddress: Joi.string(),
                date: Joi.date(),
                method: Joi.string().allow('Delivery', 'Pick-up'),
                body: Joi.string()
            }).label("searchRequestPayload"),
          },
    },
}]);
  
  export const init = async () => {
    await server.initialize();
    return server;
  };
  
  export const start = async () => {
    await server.register(plugins);
    await server.start();
  
    console.log(`Server running at: ${server.info.uri}`);
    return server;
  };
  
  process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
  });

  start();