import prisma from '../prisma'

export const HabitController = {
    async store(req, res, next) {
        try {
            const { name, description, urlImage, isActive, userId } = req.body;
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
    }
}
