import prisma from '../prisma.js';



//asincrona nome_da_função(recebendo, responder, proximo)
export const UserController = {
    //C - CREATE, INSERT, POST, SET, STORE
    async store(req, res, next){
        try{
            const { name, cpf, email, pass, phone, signature } = req.body;

            const u = await prisma.user.create({
                data: { 
                    name, 
                    cpf, 
                    email, 
                    pass, 
                    phone, 
                    signature
                }
            });

            //respondendo 201-criado encapsulando_no_formato_json(u)
            res.status(201).json(u);
        }catch(err){
            next(err);
        }
    },

    //R - READ, SELECT, GET, findMany
    async index(req, res, next){
        
        let query = {}

        if (req.query.name) query = {name: req.query.name}
        if (req.query.email) query = {email: req.query.email}
        if (req.query.cpf) query = {cpf: req.query.email}

        const users = await prisma.user.findMany({
            where: query
        })

        res.status(200).json(users)
    },

    // R - READ, SELECT, GET
    async show(req, res, _next) {
        try {
            const id = Number(req.params.id);

            const u = await prisma.user.findUniqueOrThrow({
                where: { id }
            });

            res.status(200).json(u);
        } catch (err) {
            res.status(404).json({ error: "Usuário não encontrado" });
        }
    },

    async del(req, res, _next){
        try {
            const id = Number(req.params.id);

            const u = await prisma.user.delete({
                where: { id }
            });

            res.status(200).json(u);
        } catch (err) {
            res.status(404).json({ error: "Usuário não encontrado" });
        }
    }
}








