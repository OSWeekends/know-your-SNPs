var project = require('pillars');

project.services.get('http').configure({
    port: process.env.PORT || 3000
}).start();

var staticRoute = new Route({
    id: 'staticRoute',
    path: '/*:path',
    directory: {
        path: './public',
        listing: true
    }
});

project.routes.add(staticRoute);