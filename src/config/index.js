import express from "express";
import mongoose from "mongoose";

const PORT = 3000
const app = express()
app.use(express.json())

const Login = mongoose.model('Login', {
    name: String,
    cpf: String,
    password: String
});

app.post("/", async (req, res) => {
    const login = new Login({
        name: req.body.name,
        cpf: req.body.cpf,
        password: req.body.password
    })
    await login.save()
    res.send(login)
})

app.listen(PORT, () => {
mongoose.connect('mongodb+srv://<user>:<password>@form-login.cyvoiha.mongodb.net/?retryWrites=true&w=majority&appName=form-login');
    console.log(`Server running on port ${PORT}`)
})