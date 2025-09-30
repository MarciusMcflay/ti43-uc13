import prisma from '../prisma.js'

export const HabitController = {
    async store(req, res, next) {
        try {
            const { name, description, urlImage, isActive, userId } = req.body;
            
            if(description.length > 244){
                res.status(401).json({'erro':"Quantidade de caracteres da descrição ultrapassa 244."})
                return
            }

            let u = await prisma.user.findFirst({
                where: {id: Number(userId)}
            });

            if(!u){
                res.status(301).json({
                    'error':"Usuario informado não existe"
                });
                return
            }

            const created = await prisma.habit.create({
                data: {
                    name,
                    description,
                    urlImage,
                    isActive: Boolean(isActive),
                    userId: Number(userId)
                }
            });
            res.status(201).json(created);
        } catch (err) { 
            next(err); 
        }
    },

    async index(req, res, next) {
        try {
            let where = {}

            if(req.query.name) where.name = {contains: req.query.name};
            if(req.query.isActive) where.isActive = Boolean(req.query.isActive);

            const created = await prisma.habit.findMany({
                where: where
            });
            res.status(201).json(created);
        } catch (err) { 
            next(err); 
        }
    },

    async show(req, res, next) {
        try {
            const id = Number(req.params.id);

            const created = await prisma.habit.findFirstOrThrow({
                where: {id: id}
            });

            if(!created){
                res.status(404).json({'error':"Não encontrado"});    
            }

            res.status(201).json(created);
        } catch (err) { 
            next(err); 
        }
    },

    async put(req, res, next) {
        try {
            const id = Number(req.params.id);

            let body = {}

            if(req.body.name) body.name = req.body.name;
            if(req.body.description) body.description = req.body.description;
            if(req.body.urlImage) body.urlImage =req.body.urlImage;
            if(req.body.isActive) body.isActive = req.body.isActive;

            const created = await prisma.habit.update({
                where: {id: id},
                data: body
            });

            if(!created){
                res.status(404).json({'error':"Não encontrado"});    
            }

            res.status(201).json(created);
        } catch (err) { 
            next(err); 
        }
    },


    async del(req, res, next) {
        try {
            const id = Number(req.params.id);

            const created = await prisma.habit.delete({
                where: id
            });

            if(!created){
                res.status(404).json({'error':"Não encontrado"});    
            }

            res.status(201).json(created);
        } catch (err) { 
            next(err); 
        }
    },
}
