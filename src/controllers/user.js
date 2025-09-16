import prisma from '../prisma.js';

//C - CREATE, INSERT, POST, SET, STORE

//asincrona nome_da_função(recebendo, responder, proximo)
export const UserController = {
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
    async index(req, res, next){
        
        let query = {}

        if (req.query.name) query = {name: req.query.name}
        if (req.query.email) query = {email: req.query.email}

        const users = await prisma.user.findMany({
            where: query
        })

        res.status(200).json(users)
    }
}








