import * as Hapi from '@hapi/hapi';
import * as HapiSwagger from 'hapi-swagger';
import * as Inert from "@hapi/inert";
import * as Vision from "@hapi/vision";
import { Server } from "@hapi/hapi";
 
// code omitted for brevity
 
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
    port: process.env.PORT || 3000,
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