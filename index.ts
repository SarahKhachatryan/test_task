import app from "./app";

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`App linstening to port ${port}. `)
})

declare global {
    namespace Express {
        interface Request {
            correlationId: () => string;
        }
    }
}

export default app;