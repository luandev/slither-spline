import Matter from 'matter-js';

// // module aliases
// var Engine = Matter.Engine,
//     Render = Matter.Render,
//     Runner = Matter.Runner,
//     Bodies = Matter.Bodies,
//     Composite = Matter.Composite;
// // Events = Matter.Events;

// // create an engine
// var engine = Engine.create();

// export default (element: HTMLElement) => {

//     // create a renderer
//     var render = Render.create({
//         element,
//         engine,
//         options: {
//             showDebug: true,
//             showStats: true,
//         }
//     });

//     // create two boxes and a ground
//     var boxA = Bodies.circle(400, 200, 10, { mass: 10, inertia: 2 });
//     var boxB = Bodies.circle(450, 50, 50);
//     var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

//     // add all of the bodies to the world
//     Composite.add(engine.world, [boxA, boxB, ground]);

//     // run the renderer
//     Render.run(render);

//     // create runner
//     var runner = Runner.create();

//     // Attach events to runner
//     // Events.on(runner, "beforeUpdate", callback)

//     // run the engine
//     Runner.run(runner, engine);

// }

export default (element: HTMLDivElement) => {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Events = Matter.Events,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(element, {
        gravity: {
            x: 0,
            y: 0,
        }
    }),
        world = engine.world;

    // create renderer
    var render = Render.create({
        engine: engine,
        element,
        options: {
            width: 800,
            height: 600,
            showAngleIndicator: true,
            showDebug: true,
            showStats: true,
        },
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);
    engine.gravity.y = 0;

    // // add soft global constraint
    // var body = Bodies.polygon(280, 100, 3, 30);

    // var constraint = Constraint.create({
    //     pointA: { x: 280, y: 120 },
    //     bodyB: body,
    //     pointB: { x: -10, y: -7 },
    //     stiffness: 0.001
    // });

    // Composite.add(world, [body, constraint]);

    // // add damped soft global constraint
    // var body = Bodies.polygon(400, 100, 4, 30);

    // var constraint = Constraint.create({
    //     pointA: { x: 400, y: 120 },
    //     bodyB: body,
    //     pointB: { x: -10, y: -10 },
    //     stiffness: 0.001,
    //     damping: 0.05
    // });

    // Composite.add(world, [body, constraint]);

    // // add revolute constraint
    // var body = Bodies.rectangle(600, 200, 200, 20);
    // var ball = Bodies.circle(550, 150, 20);

    // var constraint = Constraint.create({
    //     pointA: { x: 600, y: 200 },
    //     bodyB: body,
    //     length: 0
    // });

    // Composite.add(world, [body, ball, constraint]);

    // // add revolute multi-body constraint
    // var body = Bodies.rectangle(500, 400, 100, 20, { collisionFilter: { group: -1 } });
    // var ball = Bodies.circle(600, 400, 20, { collisionFilter: { group: -1 } });

    // var constraint = Constraint.create({
    //     bodyA: body,
    //     bodyB: ball
    // });

    // Composite.add(world, [body, ball, constraint]);

    // // add stiff multi-body constraint
    // var bodyA = Bodies.polygon(100, 400, 6, 20);
    // var bodyB = Bodies.polygon(200, 400, 1, 50);

    // var constraint = Constraint.create({
    //     bodyA: bodyA,
    //     pointA: { x: -10, y: -10 },
    //     bodyB: bodyB,
    //     pointB: { x: -10, y: -10 }
    // });

    // Composite.add(world, [bodyA, bodyB, constraint]);

    // // add soft global constraint
    // var bodyA = Bodies.polygon(300, 400, 4, 20);
    // var bodyB = Bodies.polygon(400, 400, 3, 30);

    // var constraint = Constraint.create({
    //     bodyA: bodyA,
    //     pointA: { x: -10, y: -10 },
    //     bodyB: bodyB,
    //     pointB: { x: -10, y: -7 },
    //     stiffness: 0.001
    // });

    // Composite.add(world, [bodyA, bodyB, constraint]);

    // // add damped soft global constraint
    // var bodyA = Bodies.polygon(500, 400, 6, 30);
    // var bodyB = Bodies.polygon(600, 400, 7, 60);

    // var constraint = Constraint.create({
    //     bodyA: bodyA,
    //     pointA: { x: -10, y: -10 },
    //     bodyB: bodyB,
    //     pointB: { x: -10, y: -10 },
    //     stiffness: 0.001,
    //     damping: 0.1
    // });

    // Composite.add(world, [bodyA, bodyB, constraint]);

    // Composite.add(world, [
    //     // walls
    //     Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
    //     Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
    //     Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
    //     Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    // ]);

    
    // add stiff global constraint
    var bodyA = Bodies.polygon(100, 0, 6, 30);
    var bodyB = Bodies.polygon(600, 400, 7, 60);
    var body = Bodies.circle(0, 0, 5, { isStatic: true, render: {
        opacity: 1,
        lineWidth: 2,
        strokeStyle: "backgroundColor: red"
    }});

    var constraint = Constraint.create({
        bodyB: body,
        bodyA: bodyA,

    });

    Composite.add(world, [bodyA, bodyB, body, constraint]);

    var mouse = Mouse.create(render.canvas);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                // allow bodies on mouse to rotate
                // angularStiffness: 0,
                stiffness: 0.001,
                damping: 0.1,
                render: {
                    visible: true
                }
            }
        });

    Composite.add(world, mouseConstraint);

    // an example of using mouse events on a mouse
    Events.on(mouseConstraint, 'mousemove', (event) => {
        Matter.Body.setPosition(body, event.mouse.absolute);
    });


    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

};